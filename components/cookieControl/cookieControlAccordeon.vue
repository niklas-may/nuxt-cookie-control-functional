<template>
  <div
    class="cookie-control-accordeon container"
    :class="[expand && 'cookie-control-accordeon--expand']"
  >
    <template v-for="type in ['necessary', 'optional']">
      <ul
        v-for="c in cookies[type]"
        :key="c.name"
        class="cookie-control-accordeon__section row"
      >
        <cookie-control-item :cookie="c" :necessary="type == 'necessary'" />
      </ul>
    </template>
  </div>
</template>
<script>
import CookieControlItem from './cookieControlItem'

export default {
  name: 'CookieControlAccordeon',
  components: { CookieControlItem },
  props: {
    cookies: {
      type: Object,
      default: () => ({
        necessary: [],
        optional: [],
      }),
    },
    expand: {
      type: Boolean,
      default: () => false,
    },
  },
}
</script>
<style lang="scss">
.cookie-control-accordeon {
  padding: 0 1rem;
  pointer-events: all;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  background-color: #181818;
  max-height: 0;
  transition: max-height 400ms cubic-bezier(0.36, 1, 0.22, 1);

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  &--expand {
    max-height: 100%;
    height:auto;
  }

  &__section {
    width: 80%;
    margin-top: 0;
    margin-block-start: 0;
  }
}
</style>
