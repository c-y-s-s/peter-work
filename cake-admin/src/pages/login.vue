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
    <!-- <div
      class="border-solid border-2 border-amber-400 w-[400px] h-[400px] flex flex-col items-center justify-center rounded-md"
    >
      <el-form
        class="p-5"
        label-position="right"
        label-width="100px"
        :model="loginForm"
        style="max-width: 460px"
      >
        帳號
        <el-input v-model="loginForm.account" />
        密碼
        <el-input type="password" v-model="loginForm.password" />
      </el-form>

      <span class="dialog-footer">
        <el-button type="warning" @click="handleLogin"> 登入 </el-button>
      </span>
    </div> -->

    <div class="login-page">
      <div class="form">
        <form class="login-form">
          <input
            type="text"
            placeholder="username"
            v-model="loginForm.account"
          />
          <input
            type="password"
            placeholder="password"
            v-model="loginForm.password"
          />
          <el-button @click="handleLogin">login</el-button>
        </form>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.form {
  background: #ffffff;
  max-width: 360px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  box-shadow:
    0 0 20px 0 rgba(0, 0, 0, 0.2),
    0 5px 5px 0 rgba(0, 0, 0, 0.24);
}
.form input {
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
}
.form button {
  text-transform: uppercase;
  outline: 0;
  background: #4caf50;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #ffffff;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
}
.form button:hover,
.form button:active,
.form button:focus {
  background: #43a047;
}
.form .message {
  margin: 15px 0 0;
  color: #b3b3b3;
  font-size: 12px;
}
.form .message a {
  color: #4caf50;
  text-decoration: none;
}
.form .register-form {
  display: none;
}
</style>
