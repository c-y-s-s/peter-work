<script setup lang="ts">
import { postCheckOutApi } from '~/server/apis/order'
import { useRouter } from 'vue-router'

const router = useRouter()

definePageMeta({
  middleware: 'auth',
})

const shoppingCartData = ref([])
const totalPrice = ref(0)

// 結帳
const handleCheckOut = async () => {
  const userData: any = localStorage.getItem('cake-customer-data')

  if (userData) {
    const userObj = JSON.parse(userData)

    const productResult = shoppingCartData.value.map((item: any) => {
      return {
        amount: item.amount,
        product_id: item.product_id,
      }
    })

    const postCheckoutData = {
      created_date: new Date().getTime(),
      user_id: userObj.id,
      product_data: productResult,
    }

    try {
      await postCheckOutApi(postCheckoutData)
      localStorage.removeItem('orders')
      navigateTo('/')
      ElMessage({
        message: '訂單新增成功',
        type: 'success',
      })
    } catch (error) {
      console.log('error', error)
    }
  }
}

// 刪除購物車商品
const handleDeleteCartProduct = (row: any) => {
  const newOrderData = shoppingCartData.value.filter((item: any) => {
    return item.product_id !== row.product_id
  })
  shoppingCartData.value = newOrderData
  localStorage.setItem('orders', JSON.stringify(newOrderData))
}

// 一開始先撈 localStorage 的資料
onMounted(async () => {
  const productData = localStorage.getItem('orders')

  if (productData) {
    const myDataObject = JSON.parse(productData)

    totalPrice.value = myDataObject.reduce((acc, cur) => {
      return acc + cur.amount * cur.price
    }, 0)

    shoppingCartData.value = myDataObject
  } else {
    console.log('沒有找到 myData')
  }
})
</script>
<template>
  <el-card class="w-[960px] m-auto mt-5">
    <el-table :data="shoppingCartData" style="width: 100%">
      <el-table-column fixed label="商品圖片">
        <template #default="{ row }">
          <img
            :src="`http://localhost:3002/${row.productImgUrl}`"
            alt="商品圖片"
            style="width: 100px; height: 100px"
          />
        </template>
      </el-table-column>

      <el-table-column prop="name" label="商品名稱" width="180" />
      <el-table-column prop="amount" label="商品數量" />
      <el-table-column prop="price" label="商品價格" />

      <el-table-column prop="price" label="">
        <template #default="{ row }">
          <el-button type="danger" @click="handleDeleteCartProduct(row)"
            >刪除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <div class="flex justify-between px-3 py-5">
      <el-text>金額總計 $ {{ totalPrice }}</el-text>
      <el-button v-if="shoppingCartData.length !== 0" @click="handleCheckOut"
        >結帳</el-button
      >
    </div>
  </el-card>
</template>
<style lang="scss"></style>
