<script setup lang="ts">
import { validateTokenApi } from '~/server/apis/validate'
import { useRouter } from 'vue-router'
definePageMeta({
  middleware: 'auth',
})

const router = useRouter()

onMounted(async () => {})
</script>

<template>首頁</template>
