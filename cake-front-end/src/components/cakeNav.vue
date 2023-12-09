<script setup lang="ts">
import { memberRegisterApi } from '~/server/apis/login'
import { useAuthStore } from '~/store/login'
import { useRouter } from 'vue-router'

const router = useRouter()

const registerSwitch = ref(false)
const loginSwitch = ref(false)
const localePath = useLocalePath()
const formLabelAlign = ref({
  name: '',
  account: '',
  password: '',
})
const useAuth = useAuthStore()

const handleSelect = (key: string, keyPath: string[]) => {
  //   console.log(key, keyPath)
}

// TODO: 註冊
const handleRegister = async () => {
  try {
    await memberRegisterApi(formLabelAlign.value)

    formLabelAlign.value = {
      name: '',
      account: '',
      password: '',
    }

    ElMessage({
      message: '註冊成功',
      type: 'success',
    })
    registerSwitch.value = false
  } catch (error) {
    console.log('error', error)
  }
}

//TODO: 登入
const handleLogin = async () => {
  try {
    await useAuth.login(formLabelAlign.value)
    loginSwitch.value = false
    console.log('a')
    formLabelAlign.value = {
      name: '',
      account: '',
      password: '',
    }
  } catch (error) {
    console.error('login error ==>', error)
  }
}

// TODO: 登出
const handleLogOut = async () => {
  useAuth.logout()
  router.push('/')
}
</script>
<template>
  <div>
    <el-menu
      class="el-menu-demo justify-end"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      @select="handleSelect"
    >
      <div class="flex">
        <NuxtLink :to="localePath('/')">
          <el-menu-item index="4">首頁</el-menu-item>
        </NuxtLink>

        <div class="flex" v-if="!useAuth.authenticated">
          <el-menu-item index="1" @click="registerSwitch = true"
            >註冊</el-menu-item
          >
          <el-menu-item index="4" @click="loginSwitch = true"
            >登入</el-menu-item
          >
        </div>
        <div class="flex items-center" v-else="useAuth.authenticated">
          <NuxtLink :to="localePath('/shopping-cart')">
            <el-menu-item index="4">購物車</el-menu-item>
          </NuxtLink>
          <NuxtLink :to="localePath('/member-order')">
            <el-menu-item index="4">查看訂單</el-menu-item>
          </NuxtLink>
          <el-menu-item index="4" @click="handleLogOut">登出</el-menu-item>
        </div>
      </div>
    </el-menu>

    <!-- register -->
    <el-dialog
      v-if="registerSwitch"
      v-model="registerSwitch"
      width="35%"
      center
      class="form-container"
    >
      <div class="login-page">
        <div class="form">
          <form class="login-form">
            <input
              type="text"
              placeholder="name"
              v-model="formLabelAlign.name"
            />
            <input
              type="text"
              placeholder="username"
              v-model="formLabelAlign.account"
            />
            <input
              type="password"
              placeholder="password"
              v-model="formLabelAlign.password"
            />
            <el-button @click="handleRegister">註冊</el-button>
          </form>
        </div>
      </div>
    </el-dialog>

    <el-dialog
      v-if="loginSwitch"
      v-model="loginSwitch"
      title=""
      width="35%"
      center
      class="form-container"
    >
      <div class="login-page">
        <div class="form">
          <form class="login-form">
            <input
              type="text"
              placeholder="username"
              v-model="formLabelAlign.account"
            />
            <input
              type="password"
              placeholder="password"
              v-model="formLabelAlign.password"
            />
            <el-button @click="handleLogin">登入</el-button>
          </form>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<style lang="scss">
.form-container {
  background: #ffffff;
  max-width: 360px;
  box-shadow:
    0 0 20px 0 rgba(0, 0, 0, 0.2),
    0 5px 5px 0 rgba(0, 0, 0, 0.24);

  padding: 45px;
  text-align: center;
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
