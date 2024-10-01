<template>
  <div>
    Time left:
    <span :class="timeLeftClass">
      {{ millisecondsToSecondsString(currentRound.remainingTimeMilliseconds) }}</span
    >
  </div>
</template>

<script setup lang="ts">
import { millisecondsToSecondsString } from '@/lib/stringHelpers'
import { useGameStore } from '@/stores/game'
import { computed, onMounted, ref } from 'vue'

const gameStore = useGameStore()

const currentRound = ref(gameStore.currentRound!)
const timeLeftUpdateInterval = ref<NodeJS.Timeout>()

const emit = defineEmits<{
  (e: 'timeOver'): void
}>()

const timeLeftClass = computed(() => {
  const secondsLeft = currentRound.value.remainingTimeMilliseconds / 1000
  if (secondsLeft <= 10) {
    return 'text-error'
  } else if (secondsLeft <= 30) {
    return 'text-warning'
  }
  return ''
})

onMounted(() => {
  const millisecondsLeft = currentRound.value.remainingTimeMilliseconds
  if (millisecondsLeft <= 0) {
    emit('timeOver')
    return
  }
  timeLeftUpdateInterval.value = setInterval(
    () => (currentRound.value.remainingTimeMilliseconds -= 100),
    100
  )
  setTimeout(() => {
    clearInterval(timeLeftUpdateInterval.value)
    emit('timeOver')
  }, millisecondsLeft)
})
</script>
