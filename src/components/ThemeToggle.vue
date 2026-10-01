<script setup lang="ts">
import { computed } from 'vue'
import { storageService } from '@/services/storage'
import IconBase from '@/components/IconBase.vue'

const isDark = computed(() => storageService.theme.value === 'dark')
</script>

<template>
  <button
    type="button"
    class="inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-ink-200 bg-white text-ink-600 transition-colors hover:bg-ink-100 dark:border-ink-700 dark:bg-ink-800 dark:text-ink-200 dark:hover:bg-ink-700"
    :aria-label="isDark ? 'Włącz jasny motyw' : 'Włącz ciemny motyw'"
    :aria-pressed="isDark"
    @click="storageService.toggleTheme()"
  >
    <IconBase :name="isDark ? 'sun' : 'moon'" size="5" />
  </button>
</template>
