import type { GamePhase } from '@/models/CenturionGame/GamePhase'
import { defineStore } from 'pinia'

export const useGamePhaseStore = defineStore('gamePhase', {
  state: (): { current: GamePhase } => {
    return {
      current: 'main-menu'
    }
  },
  actions: {
    startGame() {
      this.current = 'in-progress'
    },
    endGame() {
      this.current = 'game-end'
    },
    toMainMenu() {
      this.current = 'main-menu'
    }
  }
})
