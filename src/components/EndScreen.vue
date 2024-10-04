<template>
  <div class="flex flex-col text-center justify-center items-center">
    <div v-if="missedRoundsCount === 0 && missedDrinkingRoundsCount === 0">
      <div class="beer-gradient-text text-4xl mb-5">Completed!</div>
    </div>
    <div v-else>
      <div class="beer-gradient-text text-4xl mb-5">Better luck next time!</div>
      <div class="mb-2" v-if="missedRoundsCount > 0">
        You had {{ missedRoundsCount }} rounds left
      </div>
      <div class="mb-2" v-if="missedDrinkingRoundsCount > 0">
        You missed {{ missedDrinkingRoundsCount }} drinking rounds
      </div>
    </div>
    <div class="flex justify-center items-start gap-7">
      <div class="basis-1/2">
        <GameStats initial-toggle="best" />
      </div>
      <div class="divider divider-horizontal"></div>
      <div class="basis-1/2 flex flex-col items-start">
        <span class="text-xl text-left beer-gradient-text">Rounds</span>
        <RoundList />
      </div>
    </div>
    <button
      class="btn btn-accent text-lg mx-auto mt-10 beer-gradient-background"
      @click="emit('backToMain')"
    >
      Back to main
    </button>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import GameStats from './GameStats.vue'
import RoundList from './RoundList.vue'
import { computed } from 'vue'

const gameStore = useGameStore()

const missedRoundsCount = computed(() => gameStore.options.totalAttempts - gameStore.roundsCount)
const missedDrinkingRoundsCount = computed(() => gameStore.incompletedRounds.length)

const emit = defineEmits(['backToMain'])
</script>
