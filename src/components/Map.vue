<template>
<main>
    <div>
        <div class="map-holder">
            <div id="map"></div>
        </div>
    </div>
</main>
</template>

<script>

import mapboxgl from "mapbox-gl"

export default {
  data() {
    return {
      loading: false,
      location: "",
      access_token: "pk.eyJ1IjoiY291bnRuaWNrIiwiYSI6ImNrbHV6dTVpZDJibXgyd3FtenRtcThwYjYifQ.W_GWvRe3kX14Ef4oT50bSw",
      center: [-11.842459871932249, 8.300982115201037],
      map: {},
    };
  },

  mounted() {
      this.createMap()
      this.plotVillages()
  },

  methods: {
      async createMap() {
          try {
              mapboxgl.accessToken = this.access_token;
              this.map = new mapboxgl.Map({
                  container: "map",
                  style: "mapbox://styles/mapbox/dark-v10",
                  center: this.center,
                  zoom: 6
              });
          } catch(err) {
              console.log("an error occured: ", err);
          }
      },
      async plotVillages() {

            this.map.on('load', () => {

                const json = require("../assets/data.json")

                this.map.addSource('villages', {
                    type: "geojson",
                    data: json
                });
            
                this.map.addLayer({
                    id: "villages-layer",
                    type: "circle",
                    source: "villages",
                    // paint: {
                    //     "fill-color": "rgba(200, 100, 240, 0.4)",
                    //     "fill-outline-color" : "rgba(200, 100, 240, 1)"
                    // }
                });
                
                

                this.map.on("click", "villages-layer", (e) => {
                    console.log(e)
                    
                })
            })
      }
  }
};
</script>

<style lang="less">

    body {
        margin: 0;
        padding: 0;
    }

    #map {

        height: 100vh;
        width: 100%;
    }

</style>