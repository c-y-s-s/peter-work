<script lang="ts" setup>
import { InitApp } from '~/utils/initApp'
import { useAuthStore } from '~/store/login'

InitApp()

const authStore = useAuthStore()

const locale = useState<string>('locale.i18n')

onMounted(() => {
  authStore.initialize()
})
</script>

<template>
  <Html :lang="locale">
    <!-- <Body
      class="bg-white text-gray-800 antialiased transition-colors duration-300 dark:bg-gray-900 dark:text-gray-200"
    > -->
    <Body>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>

<style lang="postcss"></style>
