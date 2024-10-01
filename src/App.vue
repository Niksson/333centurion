<script setup lang="ts">
import StartScreen from './components/StartScreen.vue'
import CenturionGame from './components/CenturionGame.vue'
import EndScreen from './components/EndScreen.vue'
import { useGameStore } from './stores/game'
import { computed } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useGamePhaseStore } from './stores/gamePhase'

const gameStore = useGameStore()
const gamePhaseStore = useGamePhaseStore()

const phase = computed(() => gamePhaseStore.current)

const onGameCreated = () => {
  gamePhaseStore.startGame()
}

const onGameOver = () => {
  gamePhaseStore.endGame()
}

const onReturnToMain = () => {
  gameStore.$reset()
  gamePhaseStore.toMainMenu()
}
</script>

<template>
  <div class="flex flex-col h-screen">
    <main class="flex-grow flex justify-center items-center" v-if="phase === 'main-menu'">
      <StartScreen @game-created="onGameCreated" />
    </main>
    <main class="flex-grow" v-if="phase === 'in-progress'">
      <CenturionGame @game-over="onGameOver"></CenturionGame>
    </main>
    <main class="flex-grow flex flex-col justify-center items-center" v-if="phase === 'game-end'">
      <EndScreen @back-to-main="onReturnToMain"></EndScreen>
    </main>
    <footer class="footer bg-base-300 p-4">
      <p class="inline">Made with ❤️ by <b>Nikolai Masson</b></p>
      <span class="text-center place-self-end">
        <a class="text-center" href="https://gitlab.com/Niksson/centuriontimer">
          <FontAwesomeIcon icon="fa-brands fa-gitlab" /> Gitlab
        </a>
      </span>
    </footer>
  </div>
</template>
