<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import type { GeoLocation } from '@/types/weather'
import { useWeather } from '@/composables/useWeather'
import IconBase from '@/components/IconBase.vue'

const props = withDefaults(defineProps<{ placeholder?: string }>(), {
  placeholder: 'Szukaj miasta',
})
const emit = defineEmits<{ selected: [city: GeoLocation] }>()

const query = ref('')
const results = ref<GeoLocation[]>([])
const open = ref(false)
const highlighted = ref(-1)
let timer: number | undefined
const weather = useWeather()
const listId = `city-results-${Math.random().toString(36).slice(2, 10)}`
const canSearch = computed(() => query.value.trim().length >= 2)

watch(query, (value) => {
  window.clearTimeout(timer)
  highlighted.value = -1
  if (value.trim().length < 2) {
    results.value = []
    open.value = false
    return
  }
  open.value = true
  timer = window.setTimeout(async () => {
    results.value = await weather.search(value)
  }, 300)
})

onBeforeUnmount(() => window.clearTimeout(timer))

function selectCity(city: GeoLocation): void {
  query.value = city.name
  open.value = false
  emit('selected', city)
}

function clear(): void {
  query.value = ''
  results.value = []
  open.value = false
}

function onKeydown(event: KeyboardEvent): void {
  if (event.key === 'Escape') {
    open.value = false
    return
  }
  if (event.key === 'ArrowDown' && results.value.length) {
    event.preventDefault()
    highlighted.value = (highlighted.value + 1) % results.value.length
  }
  if (event.key === 'ArrowUp' && results.value.length) {
    event.preventDefault()
    highlighted.value = highlighted.value <= 0 ? results.value.length - 1 : highlighted.value - 1
  }
  if (event.key === 'Enter' && highlighted.value >= 0 && results.value[highlighted.value]) {
    event.preventDefault()
    selectCity(results.value[highlighted.value])
  }
}

function closeSoon(): void {
  window.setTimeout(() => { open.value = false }, 150)
}
</script>

<template>
  <div class="relative w-full">
    <label :for="listId" class="sr-only">{{ props.placeholder }}</label>
    <IconBase name="search" size="5" class="pointer-events-none absolute left-3 top-3 text-ink-400" />
    <input
      :id="listId"
      v-model="query"
      type="search"
      class="control w-full pl-10 pr-11"
      :placeholder="props.placeholder"
      autocomplete="off"
      role="combobox"
      :aria-expanded="open"
      :aria-controls="open ? `${listId}-options` : undefined"
      aria-autocomplete="list"
      @focus="open = canSearch"
      @blur="closeSoon"
      @keydown="onKeydown"
    />
    <button
      v-if="query"
      type="button"
      class="absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-lg text-ink-400 hover:bg-ink-100 hover:text-ink-700 dark:hover:bg-ink-700 dark:hover:text-white"
      aria-label="Wyczyść wyszukiwanie"
      @mousedown.prevent
      @click="clear"
    >
      <IconBase name="x" size="4" />
    </button>
    <div v-if="open" class="absolute inset-x-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-ink-200 bg-white shadow-soft dark:border-ink-700 dark:bg-ink-800">
      <div v-if="weather.searchLoading.value" class="px-4 py-3 text-sm text-ink-500" role="status">Wyszukiwanie…</div>
      <ul v-else-if="results.length" :id="`${listId}-options`" role="listbox" class="max-h-64 overflow-y-auto p-1">
        <li v-for="(result, index) in results" :key="`${result.lat}:${result.lon}`" role="option" :aria-selected="highlighted === index">
          <button
            type="button"
            class="flex min-h-12 w-full items-center gap-3 rounded-lg px-3 py-2 text-left hover:bg-ink-50 dark:hover:bg-ink-700"
            :class="highlighted === index ? 'bg-ink-50 dark:bg-ink-700' : ''"
            @mousedown.prevent
            @click="selectCity(result)"
          >
            <IconBase name="pin" size="4" class="text-ink-400" />
            <span class="min-w-0">
              <span class="block truncate text-sm font-semibold text-ink-800 dark:text-white">{{ result.name }}</span>
              <span class="block truncate text-xs text-ink-500">{{ result.state ? `${result.state}, ` : '' }}{{ result.country }}</span>
            </span>
          </button>
        </li>
      </ul>
      <p v-else-if="canSearch" class="px-4 py-3 text-sm text-ink-500">Nie znaleziono miejsc.</p>
    </div>
  </div>
</template>
