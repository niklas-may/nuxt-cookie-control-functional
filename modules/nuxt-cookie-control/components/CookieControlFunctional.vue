<template>
  <client-only>
    <div
      class="cookie-control"
      :class="[cookies.modal && show && 'modal-open']"
    >
      <slot
        :isReady="isReady"
        :show="show"
        :modal="cookies.modal"
        :cookies="cookies"
      />
    </div>
  </client-only>
</template>

<script>
export default {
  name: 'CookieControlFunctional',
  props: {
    locale: {
      type: String,
      default: 'en',
    },
    overrideOptionalCookies: {
      type: Array,
      default: undefined,
    },
    overrideNecessaryCookies: {
      type: Array,
      default: undefined,
    },
    overridExpirationDate: {
      type: Number,
      default: undefined,
    },
    reloadDelay: {
      type: Number,
      default: 250,
    },
  },
  data() {
    return {
      saved: true,
      colorsSet: false,
      cookies: this.$cookies,
      show: false,
      isReady: false,
    }
  },
  computed: {
    expirationDate() {
      const today = new Date()

      const date = new Date(
        today.setMonth(today.getMonth() + this.cookies.expirationDate || 12)
      )

      return date.toUTCString()
    },

    optionalCookies() {
      return this.cookies.optional
    },
  },

  watch: {
    async locale() {
      await this.setTexts(true)
    },
  },
  created() {
    this.handleOverrides()
  },

  async beforeMount() {
    await this.setTexts()
    if (
      !this.cookies.get('cookie_control_consent') ||
      this.cookies.get('cookie_control_consent').length === 0
    ) {
      this.show = true

      this.optionalCookies.forEach((c) => {
        if (c.initialState === true) {
          this.cookies.enabledList.push(
            c.identifier ||
              this.cookies.slugify(this.getCookieFirstName(c.name))
          )
        }
      })
    } else {
      this.$cookies.setConsent(true)
    }
    this.isReady = true
    this.$cookies.checkCookieStatus = this.checkCookieStatus
    this.$cookies.toggleModal = this.toggleModal
    this.$cookies.showModal = this.showModal
    this.$cookies.showBar = this.showBar
    this.$cookies.toggleCookie = this.toogleCookie
    this.$cookies.setConsentModal = this.setConsent
    this.$cookies.getCookieFirstName = this.getCookieFirstName
  },

  methods: {
    checkCookieStatus(cookieName) {
      return this.cookies.enabledList.includes(
        this.cookies.slugify(this.getCookieFirstName(cookieName))
      )
    },
    showModal() {
      this.show = true
      this.cookies.modal = true
    },
    showBar() {
      this.show = true
      this.cookies.modal = false
    },
    toggleModal() {
      this.cookies.modal = !this.cookies.modal
    },
    toogleCookie(cookie) {
      const cookieName =
        cookie.identifier ||
        this.cookies.slugify(this.getCookieFirstName(cookie.name))
      if (this.saved) this.saved = false
      if (!this.cookies.enabledList.includes(cookieName))
        this.cookies.enabledList.push(cookieName)
      else
        this.cookies.enabledList.splice(
          this.cookies.enabledList.indexOf(cookieName),
          1
        )
    },

    setConsent({ type, consent = true, reload = true }) {
      this.cookies.set({
        name: 'cookie_control_consent',
        value: consent,
        expires: this.expirationDate,
      })
      const enabledCookies =
        type === 'partial' && consent
          ? this.cookies.enabledList
          : [
              ...this.optionalCookies.map((c) => {
                return (
                  c.identifier ||
                  this.cookies.slugify(this.getCookieFirstName(c.name))
                )
              }),
            ]
      this.cookies.set({
        name: 'cookie_control_enabled_cookies',
        value: consent ? enabledCookies.join(',') : '',
        expires: this.expirationDate,
      })
      if (!reload) {
        this.cookies.setConsent()
        this.$cookies.modal = false
      } else {
        setTimeout(() => {
          window.location.reload(true)
        }, this.$props.reloadDelay)
      }

      this.toggleModal()
      this.show = false
    },

    getDescription(description) {
      if (typeof description === 'string')
        return ` ${
          this.cookies.dashInDescription !== false ? '-' : ''
        } ${description}`
      else if (description[this.locale])
        return ` ${this.cookies.dashInDescription !== false ? '-' : ''} ${
          description[this.locale]
        }`
      return ''
    },

    getName(name) {
      return name === 'functional'
        ? this.cookies.text.functional
        : typeof name === 'string'
        ? name
        : name[this.locale]
        ? name[this.locale]
        : name[Object.keys(name)[0]]
    },

    getCookieFirstName(name) {
      if (!name) return
      return typeof name === 'string' ? name : name[Object.keys(name)[0]]
    },
    // eslint-disable-next-line require-await
    async setTexts(isChanged = false) {
      let text = null
      let module = null
      try {
        module = require(`../locale/${this.locale}`)
      } catch (e) {
        module = require(`../locale/en`)
      }
      text = module.default
      if (this.cookies.text && Object.keys(this.cookies.text).length > 0) {
        if (this.cookies.text.locale) {
          Object.assign(text, this.cookies.text.locale[this.locale])
        }
        if (!isChanged) Object.assign(text, this.cookies.text)
      }
      this.$set(this.$cookies, 'text', text)
    },
    handleOverrides() {
      const {
        overrideOptionalCookies,
        overrideNecessaryCookies,
        overridExpirationDate,
      } = this.$props
      if (overrideOptionalCookies)
        this.$cookies.optional = overrideOptionalCookies
      if (overrideNecessaryCookies)
        this.$cookies.necessary = overrideNecessaryCookies
      if (overridExpirationDate)
        this.$cookies.expirationDate = overridExpirationDate
    },
  },
}
</script>
