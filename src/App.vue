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
      <div class="text-center flex justify-between place-self-end">
        <a class="text-center" href="https://github.com/Niksson/333centurion">
          <FontAwesomeIcon icon="fa-brands fa-github" /> Github
        </a>
        <a
          class="text-center"
          href="https://docs.google.com/document/d/1E0HR36tRbCK6hXiwavSnsNiJxXqOYpcEqVpdWdf8cXU/edit?usp=sharing"
        >
          Regulations
        </a>
        <a class="text-center" href="https://github.com/Niksson/333centurion#alpha-status">
          Alpha status
        </a>
      </div>
    </footer>
  </div>
</template>
