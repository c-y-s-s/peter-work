<script setup lang="ts">
import { postOrderListApi } from '~/server/apis/order'
import { useDayjs } from '#dayjs' // not need if you are using auto import
const dayjs = useDayjs()

definePageMeta({
  middleware: 'auth',
})

const orderList = ref<any>([])

onMounted(async () => {
  try {
    await nextTick(async () => {
      const userData: any = localStorage.getItem('cake-customer-data')

      if (userData) {
        const userObj = JSON.parse(userData)

        const data: any = await postOrderListApi({ user_id: userObj.id })

        orderList.value = data.data.value.data.map((item: any) => {
          return {
            id: item._id,
            userName: item.user_details.name,
            product_data: item.product_data,
            created_date: dayjs(item.created_date).format(
              'YYYY/MM/DD HH:mm:ss',
            ),
            status: item.status === '0' ? false : true, //0準備中 1 出貨
          }
        })
      }
    })
  } catch (error) {
    console.error('error', error)
  }
})
</script>
<template>
  <el-card class="w-[960px] m-auto mt-5">
    <el-table :data="orderList" style="width: 100%">
      <el-table-column fixed label="訂單明細">
        <template #default="{ row }">
          <div>訂購時間:{{ row.created_date }}</div>
          <div
            v-for="productItem in row.product_data"
            class="flex items-center my-4"
          >
            <img
              :src="`http://localhost:3002/${productItem.product_details.productImg}`"
              alt="商品圖片"
              style="width: 100px; height: 100px"
            />
            <div class="px-4">
              商品名稱:{{ productItem.product_details.name }}
            </div>
            <div class="px-4">數量:{{ productItem.amount }}</div>
            <div class="px-4">
              總金額:{{
                productItem.amount * productItem.product_details.price
              }}
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="" width="100px">
        <template #default="{ row }">
          <div>
            <span v-if="row.status">已出貨</span>
            <span v-else="row.status">準備中</span>
          </div>
        </template>
      </el-table-column>
    </el-table></el-card
  >
</template>
<style lang="scss"></style>
