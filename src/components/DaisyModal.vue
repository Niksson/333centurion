<template>
  <dialog
    class="modal modal-middle"
    :class="extraClasses"
    :id="id"
    ref="modal"
    @close="visible = false"
  >
    <div class="modal-box max-w-5xl">
      <slot name="content"></slot>
    </div>
    <div class="modal-action">
      <form v-if="visible" method="dialog">
        <slot name="form"></slot>
      </form>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ id: string; extraClasses: any }>()

const modal = ref<HTMLDialogElement>()
const visible = ref(false)

const showModal = () => {
  modal.value?.showModal()
  visible.value = true
}

const show = () => {
  modal.value?.show()
}

defineExpose({ show, showModal })
</script>
