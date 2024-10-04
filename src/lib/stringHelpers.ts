import type { SingleAttemptResult } from '@/models/CenturionGame/AttemptResult'

export function secondsToString(seconds: number): string {
  const secondsInDay = 24 * 60 * 60
  const secondsInHour = 60 * 60
  const secondsInMinute = 60

  const result = [] as string[]

  let time = seconds
  const resultDays = Math.floor(time / secondsInDay)

  if (resultDays > 0) result.push(resultDays.toString().padStart(2, '0') + ':')

  time = time - resultDays * secondsInDay
  const resultHours = Math.floor(time / secondsInHour)

  if (resultDays > 0 || resultHours > 0) result.push(resultHours.toString().padStart(2, '0') + ':')

  time = time - resultHours * secondsInHour
  const resultMinutes = Math.floor(time / secondsInMinute)

  if (resultDays > 0 || resultHours > 0 || resultMinutes > 0)
    result.push(resultMinutes.toString().padStart(2, '0') + ':')

  const resultSeconds = time - resultMinutes * secondsInMinute

  result.push(resultSeconds.toString().padStart(2, '0'))

  return result.join('')
}

export function millisecondsToSecondsString(milliseconds: number) {
  const stringUpToSeconds = secondsToString(Math.floor(milliseconds / 1000))
  return stringUpToSeconds
}

export function millisecondsToString(milliseconds: number): string {
  const stringUpToSeconds = secondsToString(Math.floor(milliseconds / 1000))
  const result = [stringUpToSeconds]

  const resultMilliseconds = Math.round(milliseconds % 1000)
  const millisecondsString = resultMilliseconds.toString().padStart(3, '0').slice(0, -1)

  result.push(`.${millisecondsString}`)

  return result.join('')
}

export function formatStat(stat: SingleAttemptResult): string {
  if (!stat) return 'N/A'
  if (stat === 'DNF') return 'DNF'
  else if (stat === 'DNS') return 'DNS'
  else return millisecondsToString(stat as number)
}
