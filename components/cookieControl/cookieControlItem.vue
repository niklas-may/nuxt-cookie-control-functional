<template>
  <li
    class="cookie-control__item"
    :class="[necessary && 'cookie-control__item--necessary']"
  >
    <input
      class="checkbox"
      type="checkbox"
      :id="cookie.name"
      :checked="necessary || $cookies.checkCookieStatus(cookie.name)"
      :disabled="necessary"
      @change="$cookies.toggleCookie(cookie)"
    />
    <div class="cookie-control__item__description article">
      <h3>{{ cookie.name }}</h3>
      <div v-html="cookie.description" class="article" />
      <h4>Verwendete Cookies</h4>
      <ul>
        <li v-for="c in cookie.cookies" :key="c">{{ c }}</li>
      </ul>
    </div>
  </li>
</template>
<script>
export default {
  name: 'CookieControlItem',
  props: {
    cookie: {
      type: Object,
      default: () => ({
        name: '',
        description: [],
        cookies: [],
      }),
    },
    necessary: {
      type: Boolean,
      default: () => false,
    },
  },
  mounted() {
    this.necessary && this.$cookies.toggleCookie(this.$props.cookie)
  },
}
</script>
<style lang="scss">
.cookie-control__item {
  margin: 0;
  padding: 0;
  text-indent: 0;
  list-style-type: 0;

  input[type=checkbox] {
    min-width: 1rem;
    height: 1rem;
    border: 2px solid pink;
    // -webkit-appearance: none;
  }

  display: flex;
  &--necessary {
    opacity: 0.5;
  }
  padding-bottom: 2em;

  &__description {
   padding-left: 1rem;
  }
}
</style>
