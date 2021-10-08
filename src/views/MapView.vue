<template>
  <div class="map-view">
    <Map />
  </div>
</template>

<script>
// @ is an alias to /src

import Map from '@/components/Map.vue'

export default {
  name: 'Map-View',
  components: {
    Map
  }
}
</script>

<style scoped lang="less">
.home {
    height: 100vh;
}
</style>