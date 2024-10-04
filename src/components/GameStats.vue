<template>
  <div class="flex flex-col items-end">
    <p class="text-xl beer-gradient-text mb-1 inline-block">Stats</p>
    <div class="flex">
      <!-- Overall -->
      <div class="stats stats-vertical shadow bg-base-200 w-full">
        <div class="stat">
          <div class="stat-title">
            <FontAwesomeIcon icon="fa-solid fa-award" size="lg" class="text-yellow-500 pr-2" />
            Best
          </div>
          <div class="stat-value">{{ formatStat(stats.best ?? 'DNS') }}</div>
        </div>
        <div class="stat">
          <div class="stat-title">
            <FontAwesomeIcon icon="fa-solid fa-thumbs-down" size="lg" class="text-red-500 pr-2" />
            Worst
          </div>
          <div class="stat-value">{{ formatStat(stats.worst ?? 'DNS') }}</div>
        </div>
        <div class="stat">
          <div class="stat-title">
            <FontAwesomeIcon icon="fa-solid fa-stopwatch" size="lg" class="text-blue-500 pr-2" />
            Mean
          </div>
          <div class="stat-value">{{ formatStat(stats.mean ?? 'DNF') }}</div>
        </div>
      </div>
      <div class="divider divider-horizontal"></div>
      <!-- Averages -->
      <div>
        <div class="join mb-5">
          <input
            class="join-item btn"
            type="radio"
            name="dipslayedStats"
            id="current"
            value="current"
            aria-label="Current"
            v-model="displayedStats"
          />
          <input
            class="join-item btn"
            type="radio"
            name="displayedStats"
            id="best"
            value="best"
            aria-label="Best"
            v-model="displayedStats"
          />
        </div>
        <div class="stats stats-vertical shadow bg-base-200 w-full">
          <div class="stat">
            <div class="stat-title">ao5</div>
            <div class="stat-value">{{ formatStat(stats[`${displayedStats}Averages`].ao5) }}</div>
          </div>
          <div class="stat">
            <div class="stat-title">ao12</div>
            <div class="stat-value">{{ formatStat(stats[`${displayedStats}Averages`].ao12) }}</div>
          </div>
          <div class="stat">
            <div class="stat-title">ao50</div>
            <div class="stat-value">{{ formatStat(stats[`${displayedStats}Averages`].ao50) }}</div>
          </div>
          <div class="stat">
            <div class="stat-title">ao100</div>
            <div class="stat-value">{{ formatStat(stats[`${displayedStats}Averages`].ao100) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatStat } from '@/lib/stringHelpers'
import { useGameStore } from '@/stores/game'
import { computed, ref } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import type { DisplayedStatsType } from '@/models/DisplayedStatsType'

const { initialToggle } = defineProps<{
  initialToggle: DisplayedStatsType
}>()
const displayedStats = ref<DisplayedStatsType>(initialToggle)

const gameStore = useGameStore()

const stats = computed(() => gameStore.stats)
</script>
