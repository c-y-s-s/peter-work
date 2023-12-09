<script setup lang="ts">
import cakeImage from '~/assets/css/img/cake.jpg'
import { getProductListApi } from '~/server/apis/product'
import { useAuthStore } from '~/store/login'

const authStore = useAuthStore()
const cakeList = ref<any>([])

//TODO: 加入訂單
const handleAddOrder = (listItem: any) => {
  if (!authStore.isCurrentLogin) {
    ElMessage({
      message: `尚未登入`,
      type: 'error',
    })
    return
  }
  if (!listItem.selectedNumber) {
    ElMessage({
      message: `未選擇數量`,
      type: 'error',
    })
    return
  }
  const clickTimestamp = new Date().getTime()

  const data = {
    amount: listItem.selectedNumber || 1,
    name: listItem.name,
    created_date: clickTimestamp,
    price: Number(listItem.price),
    product_id: listItem._id,

    productImgUrl: listItem.productImg,
  }

  // 從 localStorage 獲取訂單數據
  const orders: any = JSON.parse(localStorage.getItem('orders')) || []

  // 檢查是否已存在該 product_id 的訂單
  const existingOrderIndex = orders.findIndex(
    (order: any) => order.product_id === data.product_id,
  )

  if (existingOrderIndex !== -1) {
    // 如果存在，更新數量
    orders[existingOrderIndex].amount += data.amount
  } else {
    // 如果不存在，添加新訂單
    orders.push(data)
  }

  // 將更新後的訂單數據保存到 localStorage
  localStorage.setItem('orders', JSON.stringify(orders))

  ElMessage({
    message: `${listItem.name} 數量: ${listItem.selectedNumber} 加入訂單成功`,
    type: 'success',
  })
}

// 撈 product list data
onMounted(async () => {
  try {
    await nextTick(async () => {
      const data = await getProductListApi()

      cakeList.value = data
    })
  } catch (error) {
    console.error('error', error)
  }
})
</script>
<template>
  <!--  list -->
  <div class="flex justify-center mt-3">
    <el-row class="w-[1440px] items-center my-5" :gutter="0">
      <el-col
        class="my-4"
        :span="6"
        :md="6"
        :sm="12"
        :xs="24"
        v-for="item in cakeList"
        :key="item._id"
      >
        <div class="flex items-center justify-center">
          <div class="w-[300px]">
            <el-card :body-style="{ padding: '0px' }">
              <img
                :src="`http://localhost:3002/${item.productImg}`"
                class="w-[300px] h-[300px] object-cover"
              />
              <div style="padding: 14px">
                <div class="text-xl tracking-wider">{{ item.name }}</div>
                <div class="text-lg">$ {{ item.price }}</div>
                <p>{{ item.introduce }}</p>
                <div class="mt-5 bottom flex justify-between">
                  <el-select
                    class="w-[120px]"
                    v-model="item.selectedNumber"
                    placeholder="請選擇"
                  >
                    <el-option
                      v-for="number in item.amount"
                      v-model="item.amount"
                      :key="number"
                      :label="number"
                      :value="number"
                    >
                    </el-option>
                  </el-select>

                  <el-button
                    type="warning"
                    class="button"
                    @click="handleAddOrder(item)"
                    >預購</el-button
                  >
                </div>
              </div>
            </el-card>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss">
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
  margin: 12px 0px;
}
</style>
