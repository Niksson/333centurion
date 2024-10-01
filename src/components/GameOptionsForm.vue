<template>
  <dialog id="game-options-form" class="modal modal-middle" ref="htmlDialogRef">
    <div class="modal-box min-w-fit mx-8">
      <!-- Total attempts -->
      <div class="mt-1">
        <div class="label">
          <span class="label-text">Total attempts</span>
        </div>
        <input
          type="number"
          placeholder="100"
          name="totalAttempts"
          class="input input-bordered w-full"
          v-model.number="gameOptions.totalAttempts"
        />
        <!-- Buttons to assist selecting the total number of attempts -->
        <div class="join w-full mt-3">
          <button class="flex-1 join-item btn" @click="gameOptions.totalAttempts = 100">
            Classic
          </button>
          <button class="flex-1 join-item btn" @click="gameOptions.totalAttempts = 20">Mini</button>
          <button class="flex-1 join-item btn" @click="gameOptions.totalAttempts = 50">Half</button>
          <button class="flex-1 join-item btn" @click="gameOptions.totalAttempts = 1000">
            Ultra
          </button>
        </div>
      </div>
      <!-- Time for a single attempt -->
      <div class="mt-5">
        <div class="label">
          <span class="label-text">Time for a single attempt (sec)</span>
        </div>
        <input
          type="number"
          placeholder="60"
          id="attemptTime"
          class="input input-bordered w-full"
          v-model.number="gameOptions.attemptTimeSeconds"
        />
      </div>
      <!-- Alcohol volume -->
      <div class="mt-5">
        <div class="label">
          <span class="label-text">Alcohol volume (ml)</span>
        </div>
        <input
          type="number"
          placeholder="25"
          id="alcoholVolume"
          class="input input-bordered w-full"
          v-model.number="gameOptions.alcoholVolumeMilliliters"
        />
      </div>
      <!-- Game mode  -->
      <div class="mt-5">
        <div class="label">
          <span class="label-text">Game mode</span>
        </div>
        <div class="join w-full">
          <input
            class="join-item flex-1 btn"
            type="radio"
            name="mode"
            id="beer-mode"
            value="beer"
            aria-label="🍺 Beer - drink each attempt"
            v-model="gameOptions.gameMode"
          />
          <input
            class="join-item flex-1 btn"
            type="radio"
            name="mode"
            id="liquor-mode"
            value="liquor"
            aria-label="🍸 Liquor - drink every 10 attempts"
            v-model="gameOptions.gameMode"
          />
        </div>
      </div>
      <div class="modal-action">
        <form method="dialog">
          <button class="btn btn-primary" @click="emit('cancel')">Cancel</button>
          <button class="btn ml-5 btn-primary" @click="emit('confirm', gameOptions)">
            Confirm
          </button>
        </form>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { createDefaultOptions, type GameOptions } from '@/models/CenturionGame/GameOptions'

const emit = defineEmits<{
  cancel: []
  confirm: [gameOptions: GameOptions]
}>()

const gameOptions = ref(createDefaultOptions())

const htmlDialogRef = ref<HTMLDialogElement>()

const showModal = () => {
  htmlDialogRef.value?.showModal()
}

defineExpose({ showModal })
</script>
