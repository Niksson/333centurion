import { getAttemptResult, type Attempt } from './Attempt'
import type { SingleAttemptResult } from './AttemptResult'
import type { GameMode } from './GameMode'
import type { RoundPhase } from './RoundPhase'

export type Round = {
  roundId: number
  attempt: Attempt | null
  scramble: string
  isHardModeRound: boolean
  shotDrunk: boolean
  remainingTimeMilliseconds: number
  phase: RoundPhase
}

export const createRound = (
  id: number,
  isHardModeRound: boolean,
  scramble: string,
  roundDurationSeconds: number
): Round => {
  const round: Round = {
    roundId: id,
    isHardModeRound: isHardModeRound,
    attempt: null,
    scramble: scramble,
    shotDrunk: false,
    remainingTimeMilliseconds: roundDurationSeconds * 1000,
    phase: 'solving'
  }

  return round
}

export const isNextRoundHardMode = (roundsCount: number, gameMode: GameMode) => {
  if (gameMode === 'normal') return false

  if (gameMode === 'hard') return roundsCount % 10 === 0
  else return false
}
export const markRoundDrunk = (round: Round) => {
  round.shotDrunk = true
}

export const updateRoundAttempt = (round: Round, attempt: Attempt) => {
  round.attempt = attempt
}

export const getAttempts = (rounds: Round[]): Attempt[] => {
  return rounds.filter((r) => r.attempt !== null).map((r) => r.attempt!)
}

export const getAttemptsResults = (rounds: Round[]): SingleAttemptResult[] => {
  const attempts = getAttempts(rounds)
  return attempts.map((a) => getAttemptResult(a))
}
