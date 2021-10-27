<template>
  <div id="app">
    <!--Navbar Here -->
    <div>
      <nav>
        <div class="header">
          <h3 class="header__title">Orange the world</h3>
          <router-link to="/">
          <img class="header__img" src="../public/img/icons/OTW_logo.png" alt="">
          </router-link>
        </div>
      </nav>
    </div>
    <!--Index Page Here -->
    <transition name="page-fade">
      <router-view/>
    </transition>

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
  height: 100vh;
}
html,
body {
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
  padding: 0px 3em;
  background: rgba(1, 1, 1, 0.5);
  position: fixed;
  z-index: 2;
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

.header a {
  width: 30%;
}

.header__img {
  width: 100%;
}

@media only screen and (min-width: 750px) {

  .header__img {
  width: 5%;
}

}


</style>