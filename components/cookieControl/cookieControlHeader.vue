<template>
  <div class="cookie-control__header container">
    <div class="row">
      <div v-html="barDescription" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'CookieControlHeader',
  props: {
    barDescription: {
      type: String,
      default: () => '',
    },
  },
}
</script>
<style lang="scss">
.cookie-control__header {
  position: relative;
  background-color: #181818;
  pointer-events: all;

  &::after {
    content: '';
    position: absolute;
    top: -1px;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: #181818;
    z-index: -1;
  }

  padding: 1rem 1rem 0.5rem 1rem; 
}
</style>
