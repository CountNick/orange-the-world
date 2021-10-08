<template>
  <div id="app">
    <!--Navbar Here -->
    <div>
      <nav>
        <div class="header">
          <h3>Orange the world</h3>
        </div>
      </nav>
    </div>
    <!--Index Page Here -->
    <router-view/>
  </div>
</template>
<script>



export default {
  name: "App",
  components: {

  },
};
</script>

<style lang="less" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
html,
body {
  background: #fafcfd;
  margin: 0;
}
nav {
  background: #ffffff;
  box-shadow: 0px 2px 5px rgba(0, 58, 78, 0.15);
}
.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 50px;
}
.header h3 {
    text-align: center;
    color: #fff;
    /* font-size: 40px; */
    text-shadow: 2px 2px 8px #ea5705;
    font-weight: 600;
    letter-spacing: 8px;
    text-transform: uppercase;
}
</style>