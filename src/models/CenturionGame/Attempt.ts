import { millisecondsToString } from '@/lib/stringHelpers'
import type { Penalty } from './Penalty'
import type { SingleAttemptResult } from './AttemptResult'

export type Attempt = {
  timeMilliseconds: number
  penalty: Penalty
}

export const createAttempt = (): Attempt => {
  return {
    timeMilliseconds: 0,
    penalty: 'DNS'
  }
}

export const isSuccessfulAttempt = (attempt: Attempt): boolean => {
  return attempt.penalty !== 'DNF' && attempt.penalty !== 'DNS'
}

export const isSuccessfulResult = (result: SingleAttemptResult): boolean => {
  return result !== 'DNF' && result !== 'DNS'
}

export const updateAttemptPenalty = (attempt: Attempt, penalty: Penalty): void => {
  attempt.penalty = penalty
}

export const getAttemptResult = (attempt: Attempt): SingleAttemptResult => {
  if (attempt.penalty === 'DNF') return 'DNF'
  else if (attempt.penalty === 'DNS') return 'DNS'
  else if (attempt.penalty === '+2') return attempt.timeMilliseconds + 2000

  return attempt.timeMilliseconds
}

export const attemptToString = (attempt: Attempt): string => {
  const result = getAttemptResult(attempt)

  if (result === 'DNF') return 'DNF'
  else if (result === 'DNS') return 'DNS'

  const resultString = millisecondsToString(result)
  return attempt.penalty === '+2' ? resultString + '+' : resultString
}
