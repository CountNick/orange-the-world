<template>
  <!-- <transition @leave="transitionLeave"> -->
  <div class="home">
    <Introduction/>
  </div>
  <!-- </transition> -->
</template>

<script>
// @ is an alias to /src

import Introduction from '@/components/Introduction.vue'

export default {
  name: 'Home',
  components: {
    Introduction
  },
  methods: {
        transitionLeave(el, done) {
      console.log('transitionLeave');
      done();
    },
  }
}
</script>

<style scoped lang="less">
.home {
    height: 100vh;
    background: #000;
}

    .page-fade-enter,
  .page-fade-leave-to {
    opacity: 0;
  }

  .page-fade-enter-active,
  .page-fade-leave-active {
    transition: opacity .5s ease;
  }

</style>