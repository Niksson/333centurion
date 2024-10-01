import { defineStore } from 'pinia'
import { createDefaultGame, createGame, type Game } from '@/models/CenturionGame/Game'
import {
  type Round,
  createRound,
  isNextRoundDrinkingRound,
  markRoundDrunk
} from '@/models/CenturionGame/Round'
import type { GameMode } from '@/models/CenturionGame/GameMode'
import { randomScrambleForEvent } from 'cubing/scramble'
import type { GameOptions } from '@/models/CenturionGame/GameOptions'
import { recalculateStats } from '@/models/CenturionGame/GameStats'

async function createNewRound(
  roundCount: number,
  gameMode: GameMode,
  attemptTimeSeconds: number
): Promise<Round> {
  const drinkingRound = isNextRoundDrinkingRound(roundCount, gameMode)
  const scramble = await randomScrambleForEvent('333')
  const round = createRound(roundCount + 1, drinkingRound, scramble.toString(), attemptTimeSeconds)
  return round
}

function getSavedGame(): Game | null {
  const gameString = localStorage.getItem('currentGame')
  if (!gameString) return null
  try {
    const game = JSON.parse(gameString) as Game
    return game
  } catch (err) {
    console.error(err)
    return null
  }
}

export const useGameStore = defineStore('game', {
  state: (): Game => {
    const savedGame = getSavedGame()
    if (!savedGame) return createDefaultGame()
    return savedGame
  },
  getters: {
    savedGame(): Game | null {
      return getSavedGame()
    },
    roundsCount(): number {
      return this.allRounds.length
    },
    gameActive(): boolean {
      return this.roundsCount > 0 || !!this.currentRound
    },
    gameOver(): boolean {
      return this.roundsCount === this.options.totalAttempts
    },
    roundsWithMissedDrinks(): Round[] {
      return this.incompletedRounds.sort((a, b) => a.roundId - b.roundId)
    },
    rounds(): Round[] {
      return this.allRounds.sort((a, b) => a.roundId - b.roundId)
    }
  },
  actions: {
    async createNewGame(options: GameOptions) {
      const newGame = createGame(options)
      this.$state = newGame
      // We await the first round to ensure that the game is properly started
      // but we don't need to wait for the second round to be created, because we want to cache it
      const round = await createNewRound(0, options.gameMode, options.attemptTimeSeconds)
      createNewRound(1, options.gameMode, options.attemptTimeSeconds)
        .then((r) => {
          console.log('Next round created and cached')
          this.nextRound = r
        })
        .catch((err) => console.error(err))
      this.currentRound = round
    },
    restoreGame() {
      const game = getSavedGame()
      if (!game) return
      this.$state = game
    },
    async setNextRound() {
      let round: Round
      if (!this.nextRound) {
        round = await createNewRound(
          this.roundsCount,
          this.options.gameMode,
          this.options.attemptTimeSeconds
        )
      } else {
        round = this.nextRound
      }

      this.currentRound = round

      createNewRound(this.roundsCount + 1, this.options.gameMode, this.options.attemptTimeSeconds)
        .then((r) => {
          console.log('Next round created and cached')
          this.nextRound = r
        })
        .catch((err) => console.error(err))
    },
    markCurrentRoundDrunk() {
      if (!this.currentRound) return
      markRoundDrunk(this.currentRound)
    },
    endRound() {
      if (!this.currentRound) return

      this.allRounds.push(this.currentRound)
      this.incompletedRounds = this.incompletedRounds.filter((r) => !r.shotDrunk)

      if (!this.currentRound.shotDrunk) {
        this.incompletedRounds.push(this.currentRound)
      }

      recalculateStats(this.stats, this.rounds)
    },
    completePreviouslyIncompleteRound(roundId: number) {
      const roundIndex = this.incompletedRounds.findIndex((r) => r.roundId === roundId)
      if (roundIndex === -1) {
        console.error(`Couldn't find round with id ${roundId}`)
        return
      }
      const round = this.incompletedRounds[roundIndex]

      if (round.shotDrunk) return

      markRoundDrunk(round)
    },
    $reset() {
      localStorage.removeItem('currentGame')
      const newGame: Game = createDefaultGame()
      this.$state = newGame
    }
  }
})
