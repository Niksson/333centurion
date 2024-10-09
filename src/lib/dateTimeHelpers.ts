import { differenceInMilliseconds } from 'date-fns'

export const now = (): Date => new Date()

export const differenceWithNow = (date: Date): number => {
  return differenceInMilliseconds(now(), date)
}
