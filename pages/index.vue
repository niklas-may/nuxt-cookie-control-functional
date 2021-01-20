<template>
    <div class="page-content">
      <h1 class="title">
       <a href="https://github.com/niklas-may/nuxt-cookie-control-functional"> Cookie Control Functional</a>
      </h1>
      <div class="links">
        <br>
        <p>Change settings afterwards from anywhere.</p>
        <a
          href="javascript:$nuxt.$cookies.showModal()"
        >Show modal
        </a>
        <br>
        <a
          href="javascript:$nuxt.$cookies.showBar()"
        >or show only bar
        </a>
      </div>
    </div>
</template>

<script>
export default {
}
</script>
<style >
.page-content {
  padding: 1rem;
  height: 125vh;
}

</style>
