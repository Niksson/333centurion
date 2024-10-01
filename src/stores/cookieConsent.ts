import { defineStore } from 'pinia'
import type { CookieConsentStatus } from '@/models/CookieConsentStatus'

export const useCookieConsentStore = defineStore('cookieConsent', {
  state: (): { consentStatus: CookieConsentStatus } => {
    const stateString = localStorage.getItem('cookieConsent')
    if (!stateString) return { consentStatus: null }
    else return JSON.parse(stateString)
  }
})
