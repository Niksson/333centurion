<script setup lang="ts">
import { millisecondsToString } from '@/lib/stringHelpers'
import type { Round } from '@/models/CenturionGame/Round'
import { getAttemptResult, type Attempt } from '@/models/CenturionGame/Attempt'
import { useGameStore } from '@/stores/game'
import { computed } from 'vue'

const gameStore = useGameStore()

const rounds = computed(() => {
  const r = gameStore.rounds.slice()
  return r.reverse()
})

function getStatusIcon(round: Round): string {
  if (round.shotDrunk) return '✅'
  return '❌'
}

function getAttemptTime(attempt: Attempt): string {
  const result = getAttemptResult(attempt)
  if (result === 'DNF') return 'DNF'
  else if (result === 'DNS') return 'DNS'
  else return millisecondsToString(result)
}
</script>

<template>
  <div class="shadow-xl bg-base-200 rounded-md max-h-[30rem] overflow-scroll">
    <table class="table table-zebra">
      <thead>
        <tr>
          <th></th>
          <th>Result</th>
          <th>Shot drunk?</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="round in rounds" :key="round.roundId">
          <td>{{ round.roundId }}</td>
          <td>{{ getAttemptTime(round.attempt!) }}</td>
          <td>{{ getStatusIcon(round) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
