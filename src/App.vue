<template>
  <div id="app">
    <!--Navbar Here -->
    <div>
      <nav>
        <div class="header">
          <router-link to="/" @click.native="hideLabels()">
          <h3 class="header__title">Orange Challenge</h3>
          <span>
            <img class="header__img" src="../public/img/icons/OTW_logo.png" alt="">
          </span>
          </router-link>
          <language-switch/>
        </div>
      </nav>
    </div>
    
    
    <transition name="page-fade">
      <router-view/>
    </transition>

  </div>
</template>

<script>

import  LanguageSwitch from '@/components/LanguageSwitch'
import { eventBus } from './main'

export default {
  name: "App",
  components: {
    LanguageSwitch
  },
  methods: {
    hideLabels() {
      eventBus.$emit('hide-labels', 'hide')
    }
  }
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
  display: flex;
  justify-content: center;
  position: fixed;
  z-index: 2;
  width: 100%;
  background: rgba(1, 1, 1, 0.5);

}
.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 90%;
  justify-content: space-between;
  height: 4rem;
}
.header h3 {
    font-size: .8em;
    color: #fff;
    text-shadow: 2px 2px 8px #ea5705;
    font-weight: 600;
    letter-spacing: 8px;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    text-align: center;
}

.header a {
  display: flex;
  flex-direction: row;
  text-decoration: none;
}

.header__img {
  width: 3rem;
}

@media only screen and (min-width: 750px) {

  .header h3 {
    font-size: 1em;
}



}


</style>