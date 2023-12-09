<script setup lang="ts">
import { getStaffInfoByPage, updateStaffInfo } from '~/server/apis/login'

import { useAuthStore } from '~/store/login'
import { useRouter } from 'vue-router'

definePageMeta({
  middleware: 'auth',
})

const router = useRouter()
const useAuth = useAuthStore()

const loginForm = ref({
  account: '',
  password: '',
})

const handleLogin = async () => {
  try {
    await useAuth.login(loginForm.value)
    router.push('/')
  } catch (error) {
    console.error('login error', error)
    ElMessage({
      message: '帳號或密碼錯誤',
      type: 'error',
    })
  }
}

onMounted(async () => {})
</script>
<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <el-form
      label-position="right"
      label-width="100px"
      :model="loginForm"
      style="max-width: 460px"
    >
      <el-form-item label="帳號">
        <el-input v-model="loginForm.account" />
      </el-form-item>
      <el-form-item label="密碼" type="password">
        <el-input v-model="loginForm.password" />
      </el-form-item>
    </el-form>

    <span class="dialog-footer">
      <el-button type="warning" @click="handleLogin"> 登入 </el-button>
    </span>
  </div>
</template>
<style lang="scss"></style>
