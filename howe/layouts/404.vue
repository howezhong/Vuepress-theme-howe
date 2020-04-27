<template>
  <main class="not-found-container">
    <img class="not-found-404" :src="pathImg">
    <div class="not-found-content">
      <p>{{ getMsg() }}</p>
      <router-link to="/">Take me home</router-link>
    </div>
  </main>
</template>

<script>
const msgs = [
  `There's nothing here.`,
  `How did we get here?`,
  `That's a Four-Oh-Four.`,
  `Looks like we've got some broken links.`
]
export default {
  methods: {
    getMsg() {
      return msgs[Math.floor(Math.random() * msgs.length)]
    }
  },
  computed: {
    pathImg() {
      return require('@/assets/404.svg')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variable';
.not-found-container {
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 960px;
  text-align: center;
}
.not-found-404 {
  margin-top: 10%;
  width: 77.724%;
  vertical-align: middle;
}
.not-found-content {
  p {
    font-size: 1.5rem;
    line-height: 3rem;
    color: #fff;
  }
  a {
    height: 3rem;
    line-height: 3rem;
    display: inline-block;
    margin: auto;
    padding: 0 1rem;
    font-size: 1.5rem;
    color: #fff;
    background-color: $not-found-bj-color;
    border-radius: 5px;
  }
}
</style>
