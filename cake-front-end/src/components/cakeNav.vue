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

    formLabelAlign.value = {
      name: '',
      account: '',
      password: '',
    }
  } catch (error) {
    console.error('login error', error)

    ElMessage({
      message: '帳號或密碼錯誤',
      type: 'error',
    })
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
      title="註冊"
      width="35%"
      center
    >
      <el-form
        label-position="right"
        label-width="100px"
        :model="formLabelAlign"
        style="max-width: 460px"
      >
        <el-form-item label="暱稱">
          <el-input v-model="formLabelAlign.name" />
        </el-form-item>
        <el-form-item label="帳號">
          <el-input v-model="formLabelAlign.account" />
        </el-form-item>
        <el-form-item label="密碼">
          <el-input v-model="formLabelAlign.password" type="password" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="registerSwitch = false">取消</el-button>
          <el-button type="warning" @click="handleRegister"> 註冊 </el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog
      v-if="loginSwitch"
      v-model="loginSwitch"
      title="登入"
      width="35%"
      center
    >
      <el-form
        label-position="right"
        label-width="100px"
        :model="formLabelAlign"
        style="max-width: 460px"
      >
        <el-form-item label="帳號">
          <el-input v-model="formLabelAlign.account" />
        </el-form-item>
        <el-form-item label="密碼">
          <el-input v-model="formLabelAlign.password" type="password" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="registerSwitch = false">取消</el-button>
          <el-button type="warning" @click="handleLogin"> 登入 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<style lang="scss"></style>
