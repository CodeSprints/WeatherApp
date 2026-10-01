<template>
  <div class="space-y-4" aria-busy="true" aria-label="Wczytywanie prognozy">
    <div class="surface p-6">
      <div class="flex flex-col gap-6 sm:flex-row sm:justify-between">
        <div class="space-y-4">
          <div class="skeleton h-8 w-44 rounded-lg"></div>
          <div class="skeleton h-4 w-28 rounded"></div>
          <div class="flex items-center gap-4"><div class="skeleton h-24 w-24 rounded-full"></div><div class="skeleton h-16 w-28 rounded-lg"></div></div>
        </div>
        <div class="grid grid-cols-2 gap-2 sm:w-64"><div v-for="item in 4" :key="item" class="skeleton h-16 rounded-xl"></div></div>
      </div>
    </div>
    <div class="surface h-44 p-6"><div class="skeleton h-5 w-44 rounded"></div><div class="mt-8 flex gap-5"><div v-for="item in 7" :key="item" class="skeleton h-20 w-12 shrink-0 rounded-xl"></div></div></div>
    <div class="surface p-6"><div class="skeleton h-5 w-44 rounded"></div><div class="mt-6 space-y-4"><div v-for="item in 5" :key="item" class="skeleton h-8 rounded"></div></div></div>
  </div>
</template>
