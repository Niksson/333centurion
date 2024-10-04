import { expect, test } from 'vitest'
import { millisecondsToString } from '@/lib/stringHelpers'

test.each([
  [693.3333333333334, '00.69'],
  [0, '00.00'],
  [1, '00.00'],
  [10, '00.01'],
  [100, '00.10'],
  [1000, '01.00'],
  [10000, '10.00'],
  [60000, '01:00.00'],
  [62300, '01:02.30'],
  [3600000, '01:00:00.00'],
  [86400000, '01:00:00:00.00'],
  [8640000000, '100:00:00:00.00']
])('%i milliseconds should be converted to %s', (milliseconds, expectedString) => {
  const result = millisecondsToString(milliseconds)
  expect(result).toBe(expectedString)
})
