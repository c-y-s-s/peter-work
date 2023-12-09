<script lang="ts" setup>
import { InitApp } from '~/utils/initApp'
import { useAuthStore } from '~/store/login'
import { validateTokenApi } from '~/server/apis/validate'
InitApp()

definePageMeta({
  middleware: 'auth',
})

const authStore = useAuthStore()
const router = useRouter()
const locale = useState<string>('locale.i18n')

onMounted(async () => {})
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
