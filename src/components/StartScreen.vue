<script setup lang="ts">
import { ref } from 'vue'
import { useGameStore } from '@/stores/game'
import type { GameOptions } from '@/models/CenturionGame/GameOptions'
import GameOptionsForm from './GameOptionsForm.vue'

const gameStore = useGameStore()

const gameOptionsForm = ref<InstanceType<typeof GameOptionsForm>>()
const emit = defineEmits(['gameCreated'])

async function onOptionsConfirmed(gameOptions: GameOptions) {
  await gameStore.createNewGame(gameOptions)
  emit('gameCreated')
}

function onContinue() {
  gameStore.restoreGame()
  emit('gameCreated')
}
</script>

<template>
  <div class="flex flex-col text-center justify-start align-middle">
    <h1 class="text-4xl leading-10 md:text-5xl">
      <span class="beer-gradient-text cubing-icon event-333 inline-block pb-2 pr-2" />
      <strong class="beer-gradient-text">Centurion </strong
      ><sup class="text-orange-300 text-3xl">alpha</sup><br />
      The Speedcubing Drinking Game
    </h1>
    <div v-if="!gameStore.savedGame">
      <button
        class="btn btn-accent text-lg mx-auto mt-10 beer-gradient-background"
        @click="gameOptionsForm?.showModal()"
      >
        New game
      </button>
    </div>
    <div v-else class="flex gap-5 mt-10 justify-center">
      <button
        class="btn btn-accent text-lg beer-gradient-text beer-gradient-border"
        @click="gameOptionsForm?.showModal()"
      >
        New game
      </button>
      <button class="btn btn-accent text-lg beer-gradient-background" @click="onContinue">
        Continue
      </button>
    </div>
    <GameOptionsForm ref="gameOptionsForm" @confirm="onOptionsConfirmed" />
  </div>
</template>
