<template>
  <div class="flex justify-between items-center mb-4">
    <div class="text-3xl beer-gradient-text">Round {{ currentRound.roundId }}</div>
    <RoundCountdown @time-over="onTimeOver" />
  </div>

  <div v-if="phase === 'solving' || phase === 'penalties'">
    <SpeedsolvingTimer ref="timer" @attempt-confirmed="handleAttemptConfimed" />
  </div>
  <div v-if="phase === 'drinking'" class="flex flex-col items-center">
    <div v-if="currentRound.isHardModeRound" class="text-5xl mb-7">Hard Mode Round 🍸</div>
    <div v-else class="text-5xl mb-7">Now, drink some 🍺</div>
    <div class="mb-1">This is a placeholder for some dfinking-related GIF</div>
    <div class="skeleton w-96 h-56 mb-7" />
    <button
      class="text-xl btn btn-success inline-block mb-7"
      @click="(e: Event) => handleDrinking(e, null)"
    >
      Bottoms up!
    </button>
    <div v-if="missedRounds.length !== 0" class="flex flex-col items-center">
      <div class="text-l mb-3">Drink for missed rounds</div>
      <div class="join mb-5">
        <button
          class="join-item btn"
          @click="(e: Event) => handleDrinking(e, missedRound.roundId)"
          v-for="missedRound in missedRounds"
          :key="missedRound.roundId"
        >
          {{ missedRound.shotDrunk ? '✅' : missedRound.roundId }}
          {{ missedRound.isHardModeRound ? '🍸' : '' }}
        </button>
      </div>
    </div>
  </div>
  <div class="text-center mb-7 text-2xl" v-if="phase === 'finished'">
    Waiting for the next round...
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import SpeedsolvingTimer from './SpeedsolvingTimer.vue'
import { useGameStore } from '@/stores/game'
import RoundCountdown from './RoundCountdown.vue'

const gameStore = useGameStore()
const currentRound = computed(() => gameStore.currentRound!)
const missedRounds = ref(gameStore.incompletedRounds)

const emit = defineEmits<{
  (e: 'roundOver'): void
  (e: 'bottomsUp', roundId: number | null): void
}>()

const phase = computed(() => currentRound.value.phase)

function switchToDrinking() {
  currentRound.value.phase = 'drinking'
}

function switchToFinished() {
  currentRound.value.phase = 'finished'
}

function handleAttemptConfimed() {
  switchToDrinking()
}

function handleDrinking(e: Event, roundId: number | null) {
  if (phase.value !== 'drinking') return
  const target = e.target as HTMLButtonElement
  target.disabled = true
  emit('bottomsUp', roundId)
  if (currentRound.value.shotDrunk && missedRounds.value.every((r) => r.shotDrunk))
    switchToFinished()
}

const timer = ref<InstanceType<typeof SpeedsolvingTimer> | null>(null)

const onTimeOver = () => {
  if (timer.value && timer.value.timerPhase === 'running') timer.value?.stopTimer(false)
  emit('roundOver')
}
</script>
