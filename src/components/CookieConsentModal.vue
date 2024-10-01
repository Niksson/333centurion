<template>
  <DaisyModal extra-classes="modal-bottom" id="cookieConsent" ref="cookieConsentModal">
    <template v-slot:content>
      <h3>🍪 Cookies!</h3>
      <p>This site uses cookies and local storage to:
      <ul>
        <li><b>Essential:</b> Save the game state so you are able to continue from where you left</li>
        <li><b>Non-essential:</b>
          <ul>
            <li>Save your game options</li>
            <li>Not show you some of the modal windows if you so wish</li>
          </ul>
        </li>
      </ul>
      </p>
    </template>
    <template v-slot:form>
     <button class="beer-gradient-text">Decline non-essential</button> 
     <button class="beer-gradient-background">Accept non-essential</button> 
    </template>
  </DaisyModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import DaisyModal from './DaisyModal.vue'

defineProps<{ id: string }>()

const cookieConsentModal = ref<InstanceType<typeof DaisyModal>>()

defineExpose({cookieConsent: cookieConsentModal})
</script>
