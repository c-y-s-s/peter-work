<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useDayjs } from '#dayjs' // not need if you are using auto import
const dayjs = useDayjs()

import {
  getOrderListApi,
  putOrderDataApi,
  deleteOrderDataApi,
} from '~/server/apis/order'

definePageMeta({
  middleware: 'auth',
})

const router = useRouter()

const orderList = ref<any>([])

const firstLoading = ref(true)
const handleDelete = async (row: any) => {
  try {
    await deleteOrderDataApi(row.id)
    const { data } = await getOrderListApi()

    orderList.value = data.map((item: any) => {
      return {
        id: item._id,
        userName: item.user_details.name,
        product_data: item.product_data,
        created_date: dayjs(item.created_date).format('YYYY/MM/DD HH:mm:ss'),
        status: item.status === '0' ? false : true, //0準備中 1 出貨
      }
    })
  } catch (error) {
    console.error('delete error', error)
  }
}
const handleClick = async (row: any) => {
  const resultStatus = row.status ? '1' : '0'
  await putOrderDataApi(row.id, resultStatus)
}
onMounted(async () => {
  try {
    await nextTick(async () => {
      const { data } = await getOrderListApi()

      orderList.value = data.map((item: any) => {
        return {
          id: item._id,
          userName: item.user_details.name,
          product_data: item.product_data,
          created_date: dayjs(item.created_date).format('YYYY/MM/DD HH:mm:ss'),
          status: item.status === '0' ? false : true, //0準備中 1 出貨
        }
      })
    })
  } catch (error) {
    console.error('error', error)
  } finally {
    firstLoading.value = false
  }
})
</script>
<template>
  <el-card class="w-[1260px] m-auto mt-5">
    <div v-if="firstLoading">loading</div>
    <div v-else>
      訂單管理
      <el-table :data="orderList" style="width: 100%">
        <el-table-column fixed label="訂單明細">
          <template #default="{ row }">
            <div>訂購人:{{ row.userName }}</div>
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
        <el-table-column fixed="right" label="操作" width="100px">
          <template #default="{ row }">
            <el-switch
              @click="handleClick(row)"
              v-model="row.status"
              inline-prompt
              active-text="已出貨"
              inactive-text="準備中"
            />

            <el-button
              link
              type="primary"
              size="small"
              @click="handleDelete(row)"
              >刪除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div></el-card
  >
</template>
<style lang="scss"></style>
