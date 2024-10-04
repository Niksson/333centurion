<script setup lang="ts">
import { useGameStore } from '@/stores/game'
import CurrentRound from './CurrentRound.vue'
import RoundList from './RoundList.vue'
import GameStats from './GameStats.vue'
import { ref } from 'vue'
const gameStore = useGameStore()
const changingRounds = ref(false)

async function endRound() {
  gameStore.endRound()

  if (gameStore.gameOver) {
    emit('gameOver')
    return
  }

  await nextRound()
}

async function nextRound() {
  changingRounds.value = true
  await gameStore.setNextRound()
  changingRounds.value = false
}

function onBottomsUp(roundId: number | null) {
  if (!roundId) gameStore.markCurrentRoundDrunk()
  else gameStore.completePreviouslyIncompleteRound(roundId)
}

const emit = defineEmits(['gameOver'])
</script>

<template>
  <header>
    <div class="text-3xl p-9">
      <span class="beer-gradient-text cubing-icon event-333 inline-block pb-2 pr-2" />
      <strong class="beer-gradient-text">Centurion</strong
      ><sup class="text-orange-300 text-lg">alpha</sup><br />
    </div>
  </header>
  <div class="pt-10 px-20">
    <div class="flex items-start gap-7">
      <aside class="basis-[22%] p-3">
        <GameStats initial-toggle="current" />
      </aside>
      <section class="basis-[56%] bg-base-300 rounded-md p-3">
        <CurrentRound v-if="!changingRounds" @round-over="endRound" @bottoms-up="onBottomsUp" />
        <div v-if="changingRounds">Starting next round...</div>
      </section>
      <aside class="basis-[22%]">
        <div class="flex justify-between items-center mb-2">
          <p class="text-m beer-gradient-text inline-block">Rounds</p>
          <button class="inline-block btn btn-error" @click="$emit('gameOver')">Give up</button>
        </div>
        <RoundList />
      </aside>
    </div>
  </div>
</template>
