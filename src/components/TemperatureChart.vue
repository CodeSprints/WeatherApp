<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { Chart, Filler, LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip } from 'chart.js'
import type { HourlyForecast } from '@/types/weather'
import { hour } from '@/services/formatters'

Chart.register(Filler, LineController, LineElement, PointElement, LinearScale, CategoryScale, Tooltip)

const props = defineProps<{ hourly: HourlyForecast[] }>()
const canvas = ref<HTMLCanvasElement | null>(null)
let chart: Chart<'line'> | null = null

function draw(): void {
  if (!canvas.value) return
  chart?.destroy()
  const dark = document.documentElement.classList.contains('dark')
  const context = canvas.value.getContext('2d')
  if (!context) return
  const gradient = context.createLinearGradient(0, 0, 0, 220)
  gradient.addColorStop(0, 'rgba(37, 99, 235, 0.26)')
  gradient.addColorStop(1, 'rgba(37, 99, 235, 0.01)')
  chart = new Chart(context, {
    type: 'line',
    data: {
      labels: props.hourly.map((item) => hour(item.dt)),
      datasets: [{
        data: props.hourly.map((item) => Math.round(item.temp)),
        borderColor: '#2563eb',
        backgroundColor: gradient,
        fill: true,
        tension: 0.38,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 4,
        pointBackgroundColor: '#2563eb',
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { intersect: false, mode: 'index' },
      plugins: {
        legend: { display: false },
        tooltip: {
          displayColors: false,
          callbacks: { label: (context) => `${context.parsed.y ?? 0}°C` },
        },
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: { color: dark ? '#94a3b8' : '#64748b', maxTicksLimit: 8, font: { size: 10 } },
          border: { display: false },
        },
        y: {
          grid: { color: dark ? 'rgba(148,163,184,.12)' : 'rgba(148,163,184,.2)' },
          ticks: { color: dark ? '#94a3b8' : '#64748b', callback: (value) => `${value}°`, font: { size: 10 } },
          border: { display: false },
        },
      },
    },
  })
}

onMounted(async () => {
  await nextTick()
  draw()
})
watch(() => props.hourly, draw, { deep: true })
onUnmounted(() => chart?.destroy())
</script>

<template>
  <section class="surface p-5 sm:p-6" aria-labelledby="chart-heading">
    <div class="flex items-center justify-between gap-4">
      <h2 id="chart-heading" class="text-base font-bold text-ink-800 dark:text-white">Trend temperatury</h2>
      <span class="text-xs text-ink-500">Godzinowo</span>
    </div>
    <div class="mt-4 h-52">
      <canvas ref="canvas" aria-label="Wykres temperatury w kolejnych godzinach"></canvas>
    </div>
  </section>
</template>
