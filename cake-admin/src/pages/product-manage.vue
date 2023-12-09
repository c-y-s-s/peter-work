<script setup lang="ts">
import {
  productListApi,
  putProductDataApi,
  deleteProductApi,
} from '~/server/apis/login'
import { useRouter } from 'vue-router'
import { useProductStore } from '~/store/product'

definePageMeta({
  middleware: 'auth',
})
const router = useRouter()

const productList = ref([])
const productStore = useProductStore()
const upsertSwitch = ref(false)
const currentId = ref()
const isEdit = ref(false)
const productFormRef = ref()
const productForm = ref<any>({
  imgFile: '',
  name: '',
  introduce: '',
  amount: '',
  price: '',
  status: '',
})

const handleFileUpload = (event: any) => {
  productForm.value.imgFile = event.target.files[0]
}

const handleUpsertEvent = async () => {
  if (!isEdit.value) {
    productFormRef.value.validate(async (valid: any) => {
      if (valid) {
        const formData = new FormData()
        for (let i in productForm.value) {
          formData.append(i, productForm.value[i])
        }
        await productStore.usePostCreateProductQuery(formData)
        const { data } = await productListApi()
        productList.value = data
      }
    })
  } else {
    await putProductDataApi(currentId.value, productForm.value)
    const { data } = await productListApi()
    productList.value = data
  }
  upsertSwitch.value = false
}

const handleEdit = (row: any) => {
  currentId.value = row._id
  isEdit.value = true
  upsertSwitch.value = true

  productForm.value = {
    name: row.name,
    introduce: row.introduce,
    amount: row.amount,
    price: row.price,
    status: row.status,
  }
}

const handleDelete = async (row: any) => {
  try {
    await deleteProductApi(row._id)
    const { data } = await productListApi()
    productList.value = data
  } catch (error) {
    console.error('delete error', error)
  }
}
const handleStatusSwitch = async (row: any) => {
  await putProductDataApi(row._id, row)
  const { data } = await productListApi()
  productList.value = data
}

watch(upsertSwitch, (newVal, oldVal) => {
  if (!newVal) {
    productForm.value = {
      imgFile: '',
      name: '',
      introduce: '',
      amount: 0,
      price: '',
      status: '',
    }
  }
})

onMounted(async () => {
  try {
    await nextTick(async () => {
      const { data } = await productListApi()

      productList.value = data
    })
  } catch (error) {
    console.error('error', error)
    router.push('/')
  }
})
</script>
<template>
  <el-card class="w-[1260px] m-auto mt-5">
    <div class="flex items-center justify-between px-6 py-3">
      <h2>商品管理</h2>
      <el-button @click="upsertSwitch = true">新增商品</el-button>
    </div>

    <el-table :data="productList" style="width: 100%" class="px-6">
      <el-table-column fixed prop="date" label="商品圖片">
        <template #default="{ row }">
          <img
            :src="`http://localhost:3002/${row.productImg}`"
            alt="商品圖片"
            style="width: 100px; height: 100px"
          />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="商品名稱" />
      <el-table-column prop="amount" label="商品剩餘數量" />
      <el-table-column prop="price" label="商品價格" />
      <el-table-column prop="introduce" label="商品介紹" />
      <el-table-column fixed="right" label="操作">
        <template #default="{ row }">
          <el-switch
            v-model="row.status"
            inline-prompt
            active-text="上架中"
            inactive-text="下架中"
            @click="handleStatusSwitch(row)"
          />
          <el-button link type="primary" size="small" @click="handleEdit(row)"
            >編輯</el-button
          >
          <el-button link type="primary" size="small" @click="handleDelete(row)"
            >刪除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      class="upsert-dialog"
      v-if="upsertSwitch"
      v-model="upsertSwitch"
      :multiple="false"
      title="新增商品"
      align-center
    >
      <el-form ref="productFormRef" :model="productForm" label-width="120px">
        <el-form-item v-if="!isEdit" label="商品圖片">
          <input type="file" @change="handleFileUpload" />
        </el-form-item>
        <el-form-item label="商品名稱">
          <input v-model="productForm.name" />
        </el-form-item>
        <el-form-item label="商品數量">
          <el-input v-model="productForm.amount" />
        </el-form-item>
        <el-form-item label="商品價格">
          <el-input v-model="productForm.price" />
        </el-form-item>
        <el-form-item label="商品介紹">
          <el-input v-model="productForm.introduce" type="textarea" rows="10" />
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="upsertSwitch = false">取消</el-button>
          <el-button type="primary" @click="handleUpsertEvent()">
            送出
          </el-button>
        </span>
      </template>
    </el-dialog></el-card
  >
</template>
<style lang="scss">
.upsert-dialog:focus {
  border: none;
  box-shadow: none;
}
</style>
