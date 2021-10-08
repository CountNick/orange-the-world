<template>
<main>
    <div>
        <div class="map-holder">
            <div id="map"></div>
        </div>
    </div>

    <RouterView/>

</main>
</template>

<script>

import mapboxgl from 'mapbox-gl'


export default {
    
    name: 'Map',
    components: {

    },

  data() {
    return {
      access_token: 'pk.eyJ1IjoiY291bnRuaWNrIiwiYSI6ImNrbHV6dTVpZDJibXgyd3FtenRtcThwYjYifQ.W_GWvRe3kX14Ef4oT50bSw',
      center: [-11.842459871932249, 8.300982115201037],
      map: {},
      isModalVisible: false,
      loading: false,
      place_data: {
          place_name: "place name",
          index: 100
      },
    }
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
                  container: 'map',
                  style: 'mapbox://styles/mapbox/dark-v10',
                  center: this.center,
                  zoom: 6
              });
          } catch(err) {
              console.log('an error occured: ', err);
          }
      },
      async plotVillages() {

            this.map.on('load', () => {

                const json = require('../assets/data.json')

                this.map.addSource('villages', {
                    type: 'geojson',
                    data: json
                });
            
                this.map.addLayer({
                    id: 'villages-layer',
                    type: 'circle',
                    source: 'villages',
                    paint: {
                        'circle-color': 'rgba(234, 87, 5, 0.6)',
                        'circle-stroke-color' : 'rgba(253, 154, 240, 1)',
                        'circle-stroke-width': 1,

                    }
                });
                // console.log("place data: ", this.place_data)
                

                this.map.on('click', 'villages-layer', (e) => {
                    
                    // store features in variable
                    const clickedPlaceData = e.features[0].properties
                    // replace data with clicked point data
                    this.place_data = clickedPlaceData
                    

                    this.$router.push({
                        path: `/village/${this.place_data.index}`,
                        query: { 
                            place_name: this.place_data.place_name,
                            information: this.place_data.information
                            }
                    })
                    // show the popup
                    // this.showModal()
                })
            })
      },
      async showModal() {
          this.isModalVisible = true;
      },
      async closeModal() {
          this.isModalVisible = false;
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