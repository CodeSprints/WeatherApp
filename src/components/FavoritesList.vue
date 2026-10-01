<script setup lang="ts">
import type { FavoriteCity } from '@/types/weather'
import { storageService } from '@/services/storage'
import IconBase from '@/components/IconBase.vue'

const emit = defineEmits<{ selected: [city: FavoriteCity] }>()
</script>

<template>
  <section aria-labelledby="favorites-heading">
    <div class="flex items-center justify-between gap-3">
      <h2 id="favorites-heading" class="text-sm font-bold text-ink-800 dark:text-white">Ulubione</h2>
      <span v-if="storageService.favorites.value.length" class="rounded-full bg-ink-100 px-2 py-0.5 text-xs font-semibold text-ink-500 dark:bg-ink-700">{{ storageService.favorites.value.length }}</span>
    </div>
    <div v-if="!storageService.hasFavorites.value" class="py-7 text-center">
      <IconBase name="star" size="8" class="mx-auto text-ink-300 dark:text-ink-600" />
      <p class="mt-2 text-xs text-ink-500">Dodaj miejsce gwiazdką, aby mieć je pod ręką.</p>
    </div>
    <ul v-else class="mt-3 space-y-1">
      <li v-for="city in storageService.favorites.value" :key="city.id" class="group flex items-center gap-1">
        <button type="button" class="flex min-h-12 min-w-0 flex-1 items-center gap-2 rounded-lg px-2 text-left hover:bg-ink-50 dark:hover:bg-ink-700" @click="emit('selected', city)">
          <IconBase name="pin" size="4" class="text-ink-400" />
          <span class="min-w-0">
            <span class="block truncate text-sm font-semibold text-ink-700 dark:text-ink-200">{{ city.name }}</span>
            <span class="block text-xs text-ink-500">{{ city.country }}</span>
          </span>
        </button>
        <button type="button" class="inline-flex min-h-10 min-w-10 items-center justify-center rounded-lg text-ink-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-950/40" :aria-label="`Usuń ${city.name} z ulubionych`" @click="storageService.removeFavorite(city.id)">
          <IconBase name="x" size="4" />
        </button>
      </li>
    </ul>
  </section>
</template>
