<script setup lang="ts">
import { useAuthStore } from '~/store/login'
import { useRouter } from 'vue-router'
import { useNavigationStore } from '~/store/navigation'

const router = useRouter()
const useAuth = useAuthStore()
const navigationStore = useNavigationStore()

const localePath = useLocalePath()

const navigateToPage = () => {
  navigationStore.setNavigatedInApp(true)
}

const handleLogOut = () => {
  useAuth.logout()
  navigateTo('/login')
}
</script>
<template>
  <div v-if="router.currentRoute.value.path !== '/login'">
    <el-menu
      class="el-menu-demo justify-between items-center"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <div class="flex">
        <NuxtLink :to="localePath('/')" @click="navigateToPage">
          <el-menu-item index="4">首頁</el-menu-item>
        </NuxtLink>
        <NuxtLink :to="localePath('product-manage')" @click="navigateToPage">
          <el-menu-item index="4">商品管理</el-menu-item>
        </NuxtLink>
        <NuxtLink :to="localePath('order-manage')" @click="navigateToPage">
          <el-menu-item index="4">訂單管理</el-menu-item>
        </NuxtLink>
      </div>
      <div class="flex item">
        <div class="text-white">
          <!-- Hello {{ useAuth.currentLoginUserData.name }} -->
        </div>
        <el-menu-item index="4" @click="handleLogOut">登出</el-menu-item>
      </div>
    </el-menu>
  </div>
</template>
<style lang="scss"></style>
