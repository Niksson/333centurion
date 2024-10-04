import type { GameMode } from './GameMode'

export type GameOptions = {
  totalAttempts: number
  attemptTimeSeconds: number
  alcoholVolumeMilliliters: number
  gameMode: GameMode
}

export const createDefaultOptions = (): GameOptions => {
  return {
    totalAttempts: 100,
    attemptTimeSeconds: 60,
    alcoholVolumeMilliliters: 25,
    gameMode: 'normal'
  }
}
