import type { Attempt } from './Attempt'
import type { MultipleAttemptResult, SingleAttemptResult } from './AttemptResult'
import { getAttemptResult, isSuccessfulAttempt, isSuccessfulResult } from './Attempt'
import { getAttempts, type Round } from './Round'

const getMeanOfAttempts = (attempts: Attempt[]): MultipleAttemptResult => {
  const failedAttempt = attempts.find((a) => !isSuccessfulAttempt(a))

  if (failedAttempt) return 'DNF'

  const timeSum = attempts.reduce((acc, a) => acc + (getAttemptResult(a) as number), 0)

  return timeSum / attempts.length
}

const getAverageOfAttempts = (attempts: Attempt[]): MultipleAttemptResult => {
  const attemptsCount = attempts.length

  const toRemove = Math.ceil(attemptsCount * 0.05)

  const failedAttempts = attempts.filter((a) => !isSuccessfulAttempt(a))
  if (failedAttempts.length > toRemove) return 'DNF'

  const sorted = [...attempts].sort((a, b) => {
    if (!isSuccessfulAttempt(a) && !isSuccessfulAttempt(b)) return 0
    if (!isSuccessfulAttempt(a) && isSuccessfulAttempt(b)) return 1
    if (isSuccessfulAttempt(a) && !isSuccessfulAttempt(b)) return -1
    else return a.timeMilliseconds - b.timeMilliseconds
  })

  const middle = sorted.slice(toRemove, -toRemove)

  const timeSum = middle.reduce((acc, a) => acc + (getAttemptResult(a) as number), 0)

  return timeSum / middle.length
}

const recalculateAverageOfN = (rounds: Round[], n: number): MultipleAttemptResult => {
  if (rounds.length < n) return 'DNF'
  const slice = rounds.slice(-n)
  const attempts = slice.map((r) => r.attempt!)
  return getAverageOfAttempts(attempts)
}

export type GameStats = {
  best: SingleAttemptResult | null
  worst: SingleAttemptResult | null
  currentAverages: Averages
  bestAverages: Averages
  mean: SingleAttemptResult
}

export type Averages = {
  ao5: MultipleAttemptResult
  ao12: MultipleAttemptResult
  ao50: MultipleAttemptResult
  ao100: MultipleAttemptResult
}

export const createGameStats = (): GameStats => {
  return {
    best: null,
    worst: null,
    mean: 'DNF',
    currentAverages: {
      ao5: 'DNF',
      ao12: 'DNF',
      ao50: 'DNF',
      ao100: 'DNF'
    },
    bestAverages: {
      ao5: 'DNF',
      ao12: 'DNF',
      ao50: 'DNF',
      ao100: 'DNF'
    }
  }
}

export const recalculateStats = (stats: GameStats, rounds: Round[]): GameStats => {
  const [newRound] = rounds.slice(-1)
  stats.best = getNewBest(stats, newRound)
  stats.worst = getNewWorst(stats, newRound)
  stats.mean = getNewMean(rounds)
  updateAverages(stats, rounds)
  return stats
}

const getNewBest = (stats: GameStats, newRound: Round): SingleAttemptResult => {
  const newResult = getAttemptResult(newRound.attempt!)
  if (stats.best === null) return newResult
  if (isSuccessfulResult(stats.best) && !isSuccessfulResult(newResult)) return stats.best
  else if (!isSuccessfulResult(stats.best) && isSuccessfulResult(newResult)) return newResult
  else if (stats.best > newResult) return newResult

  return stats.best
}

const getNewWorst = (stats: GameStats, newRound: Round): SingleAttemptResult => {
  const newResult = getAttemptResult(newRound.attempt!)
  if (stats.worst === null) return newResult
  if (isSuccessfulResult(stats.worst) && !isSuccessfulResult(newResult)) return newResult
  else if (!isSuccessfulResult(stats.worst) && isSuccessfulResult(newResult)) return stats.worst
  else if (stats.worst < newResult) return newResult
  return stats.worst
}

const getNewMean = (rounds: Round[]) => {
  return getMeanOfAttempts(getAttempts(rounds))
}

const updateAverages = (stats: GameStats, rounds: Round[]): GameStats => {
  const averages = [5, 12, 50, 100]

  for (const n of averages) {
    const key = `ao${n}` as keyof Averages
    const average = recalculateAverageOfN(rounds, n)
    stats.currentAverages[key] = average
    if (
      stats.bestAverages[key] === 'DNF' ||
      (average !== 'DNF' && (stats.bestAverages[key] as number) > average)
    )
      stats.bestAverages[key] = average
  }

  return stats
}
