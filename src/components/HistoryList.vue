<script setup lang="ts">
import type { SearchHistoryItem } from '@/types/weather'
import { storageService } from '@/services/storage'
import { relativeTime } from '@/services/formatters'
import IconBase from '@/components/IconBase.vue'

const emit = defineEmits<{ selected: [city: SearchHistoryItem] }>()
</script>

<template>
  <section aria-labelledby="history-heading">
    <div class="flex items-center justify-between gap-3">
      <h2 id="history-heading" class="text-sm font-bold text-ink-800 dark:text-white">Ostatnio wyszukiwane</h2>
      <button v-if="storageService.hasHistory.value" type="button" class="text-xs font-semibold text-ink-500 underline underline-offset-2 hover:text-red-500" @click="storageService.clearHistory">Wyczyść</button>
    </div>
    <div v-if="!storageService.hasHistory.value" class="py-7 text-center">
      <IconBase name="clock" size="8" class="mx-auto text-ink-300 dark:text-ink-600" />
      <p class="mt-2 text-xs text-ink-500">Historia wyszukiwania jest pusta.</p>
    </div>
    <ul v-else class="mt-3 space-y-1">
      <li v-for="item in storageService.history.value" :key="`${item.name}:${item.timestamp}`" class="group flex items-center gap-1">
        <button type="button" class="flex min-h-12 min-w-0 flex-1 items-center gap-2 rounded-lg px-2 text-left hover:bg-ink-50 dark:hover:bg-ink-700" @click="emit('selected', item)">
          <IconBase name="clock" size="4" class="text-ink-400" />
          <span class="min-w-0">
            <span class="block truncate text-sm font-semibold text-ink-700 dark:text-ink-200">{{ item.name }}</span>
            <span class="block text-xs text-ink-500">{{ item.country }} · {{ relativeTime(item.timestamp) }}</span>
          </span>
        </button>
        <button type="button" class="inline-flex min-h-10 min-w-10 items-center justify-center rounded-lg text-ink-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/40" :aria-label="`Usuń ${item.name} z historii`" @click="storageService.removeHistory(item.name)">
          <IconBase name="x" size="4" />
        </button>
      </li>
    </ul>
  </section>
</template>
