<template>
  <client-only>
    <iframe v-if="iframeEnabled" />
    <div v-else class="cookieControl__BlockedIframe">
      <p>
        {{ iframeText }}
        <a
          v-if="cookies && cookies.text"
          href="#"
          @click.prevent="cookies.modal = true"
          v-text="cookies.text.here"
        />
      </p>
    </div>
  </client-only>
</template>

<script>
export default {
  name: 'CookieIframe',
  data() {
    return {
      cookies: this.$cookies,
    }
  },

  computed: {
    iframeEnabled() {
      return (
        this.cookies.enabled.filter((c) => {
          return c.name === 'functional'
        }).length > 0
      )
    },

    iframeText() {
      return this.cookies && this.cookies.text
        ? this.cookies.text.blockedIframe
        : ''
    },
  },
}
</script>
