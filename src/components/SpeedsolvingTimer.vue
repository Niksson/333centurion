<template>
  <div class="flex flex-col items-center">
    <div class="text-xl mb-7">{{ scramble }}</div>
    <div :class="timerClass" class="text-6xl mb-8">
      {{ attemptTime }}
    </div>
    <scramble-display
      event="333"
      :scramble="scramble"
      visualization="2D"
      class="mb-8"
    ></scramble-display>
    <div v-if="currentRound.phase === 'penalties'" class="flex flex-col items-center">
      <div>Penalty</div>
      <div class="join mb-5">
        <input
          class="join-item btn"
          type="radio"
          name="penalty"
          aria-label="None"
          checked
          :value="null"
          @change="updatePenalty(null)"
        />
        <input
          class="join-item btn"
          type="radio"
          name="penalty"
          id="plus-two"
          aria-label="+2"
          @change="updatePenalty('+2')"
        />
        <input
          class="join-item btn"
          type="radio"
          name="penalty"
          id="dnf"
          aria-label="DNF"
          @change="updatePenalty('DNF')"
        />
      </div>
      <button class="btn btn-success inline-block" @click="emit('attemptConfirmed')">
        Confirm
      </button>
    </div>
  </div>
</template>

<style scoped>
.timer-waiting {
  color: red;
}

.timer-ready {
  color: green;
}
</style>

<script setup lang="ts">
import 'scramble-display'
import type { Penalty } from '@/models/CenturionGame/Penalty'
import type { TimerPhase } from '@/models/CenturionGame/TimerPhase'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { attemptToString, createAttempt, getAttemptResult } from '@/models/CenturionGame/Attempt'
import { useGameStore } from '@/stores/game'
import { updateRoundAttempt } from '@/models/CenturionGame/Round'

let timerWaitingTimeout = ref<NodeJS.Timeout>()
let timerInterval = ref<NodeJS.Timeout>()

const gameStore = useGameStore()
const currentRound = ref(gameStore.currentRound!)
const scramble = computed(() => currentRound.value.scramble)

const emit = defineEmits(['attemptConfirmed'])
const attempt = ref(currentRound.value.attempt || createAttempt())
currentRound.value.attempt = attempt.value
const timerPhase = ref<TimerPhase>('idle')
const timerClass = computed(() => ({
  'timer-waiting': timerPhase.value === 'waiting',
  'timer-ready': timerPhase.value === 'ready'
}))

const attemptTime = computed(() => {
  const result = getAttemptResult(attempt.value)
  if (result === 'DNS') return '00.00'
  else return attemptToString(attempt.value)
})

function prepareTimer() {
  if (timerPhase.value === 'waiting' || timerPhase.value === 'ready') return
  timerPhase.value = 'waiting'
  timerWaitingTimeout.value = setTimeout(() => (timerPhase.value = 'ready'), 500)
}

function startTimer() {
  // The moment we start the timer, it cannot be DNS anymore
  attempt.value.penalty = null
  // Unfortunately, JS doesn't allow for timers running faster than 10ms
  timerInterval.value = setInterval(() => (attempt.value.timeMilliseconds += 10), 10)
  timerPhase.value = 'running'
}

function stopTimer(stopedByUser: boolean) {
  timerPhase.value = 'stopped'
  clearInterval(timerInterval.value)
  if (!stopedByUser) attempt.value.penalty = 'DNF'
  else currentRound.value.phase = 'penalties'
  updateRoundAttempt(currentRound.value, attempt.value)
}

function updatePenalty(penalty: Penalty | null) {
  attempt.value.penalty = penalty
  updateRoundAttempt(currentRound.value, attempt.value)
}

function handleTouchEvent(e: TouchEvent) {
  if (timerPhase.value === 'running') {
    stopTimer(true)
    return
  }

  if (e.type === 'touchstart') {
    prepareTimer()
    return
  }

  if (e.type === 'touchend') {
    if (timerPhase.value === 'waiting') {
      clearTimeout(timerWaitingTimeout.value)
      timerPhase.value = 'idle'
      return
    }
    if (timerPhase.value === 'ready') startTimer()
    return
  }
}

function handleKeyEvent(e: KeyboardEvent) {
  if (timerPhase.value === 'stopped') {
    if (e.key === 'Enter') emit('attemptConfirmed')
    return
  }

  if (timerPhase.value === 'running') {
    stopTimer(true)
    return
  }

  if (e.key === ' ') {
    if (e.type === 'keydown') {
      prepareTimer()
      return
    }
    if (e.type === 'keyup') {
      if (timerPhase.value === 'waiting') {
        clearTimeout(timerWaitingTimeout.value)
        timerPhase.value = 'idle'
        return
      }
      if (timerPhase.value === 'ready') startTimer()
      return
    }
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyEvent)
  window.addEventListener('keyup', handleKeyEvent)
  window.addEventListener('touchstart', handleTouchEvent)
  window.addEventListener('touchend', handleTouchEvent)
})
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyEvent)
  window.removeEventListener('keyup', handleKeyEvent)
  window.removeEventListener('touchstart', handleTouchEvent)
  window.removeEventListener('touchend', handleTouchEvent)
})

defineExpose({ stopTimer, timerPhase: timerPhase })
</script>
