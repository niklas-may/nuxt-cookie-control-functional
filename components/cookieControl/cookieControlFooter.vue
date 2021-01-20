<template>
  <div class="cookie-control__footer">
    <div class="cookie-control__footer__wrapper">
      <template v-if="modal">
        <button @click="$cookies.toggleModal">
          {{ cookies.text.closeCookies }}
        </button>
        <button @click="$cookies.setConsentModal({ type: 'partial' })"
        >
          {{ cookies.text.save }}
        </button>
      </template>
      <template v-else>
        <button @click="cookies.modal = true">{{
          cookies.text.manageCookies
        }}</button>
        <button @click="$cookies.setConsentModal">{{
          cookies.text.acceptAll
        }}</button>
      </template>
    </div>
  </div>
</template>
<script>

export default {
  name: 'CookieControlFooter',
  props: {
    description: {
      type: Array,
      default: () => [],
    },
    cookies: {
      type: Object,
      default: () => ({}),
    },
    modal: {
      type: Boolean,
      default: () => false,
    },
  },
}
</script>

<style lang="scss">
.cookie-control__footer {
  background-color: #181818;
  pointer-events: all;

  padding: 0.5rem 1rem 1rem 1rem;
  

  &__wrapper {
    width: 100%;

    .btn {
      width: 100%;

      &:first-child {
          padding: 1rem;
      }
    }

    .btn .btn__wrapper {
      display: block;
    }

    @media screen and (min-width: 768px) {
      display: flex;
      justify-content: flex-end;

      .btn {
        width: auto;
        &:first-child {
          padding-bottom: 0;
          margin-right: 1rem
        }
      }
    }
  }
}
</style>
