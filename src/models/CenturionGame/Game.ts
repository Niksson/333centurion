import { createGameStats, type GameStats } from './GameStats'
import { createDefaultOptions, type GameOptions } from './GameOptions'
import type { Round } from './Round'

export type Game = {
  options: GameOptions
  incompletedRounds: Round[]
  allRounds: Round[]
  currentRound: Round | null
  nextRound: Round | null
  stats: GameStats
}

export const createGame = (options: GameOptions): Game => {
  return {
    ...createDefaultGame(),
    options: options
  }
}

export const createDefaultGame = (): Game => {
  return {
    options: createDefaultOptions(),
    incompletedRounds: [],
    allRounds: [],
    currentRound: null,
    nextRound: null,
    stats: createGameStats()
  }
}
