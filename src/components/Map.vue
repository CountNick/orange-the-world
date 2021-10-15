<template v-if="loading == false">
<main>
    <Locator/>
    <transition name="page-fade">
        <div class="map-holder" v-show="mapLoaded">
            <div id="map"></div>
        </div>
    </transition>
    <transition name="page-fade">
    <RouterView/>
    </transition>
</main>
</template>

<script>

import mapboxgl from 'mapbox-gl'
import Locator from '@/components/Locator.vue';



export default {
    
    name: 'Map',
    components: {
        Locator,

    },

  data() {
    return {
      access_token: 'pk.eyJ1IjoiY291bnRuaWNrIiwiYSI6ImNrbHV6dTVpZDJibXgyd3FtenRtcThwYjYifQ.W_GWvRe3kX14Ef4oT50bSw',
      center: [-11.842459871932249, 8.300982115201037],
      map: {},
      mapLoaded: false,
      isModalVisible: false,
      loading: true,
      place_data: {
          place_name: "place name",
          index: 100,
          information: "sample info"
      },
    //   showMarker: 4
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
                this.mapLoaded = true
                if(this.mapLoaded === true) {
                    setTimeout(() => {
                        console.log('resize now man')
                        this.map.resize()
                    }, 1);
                }
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

                this.map.getSource('villages')._options.data.features.map(village => {
                    console.log(village)

                    const diffLong = village.geometry.coordinates[0] + 0.00014974447299209714;
                    const diffLat = village.geometry.coordinates[1] + 0.2928258217985239753;

                    const label = document.createElement('div')
                    label.textContent = `You just entered ${village.properties.place_name}`
                    label.id = village.properties.index
                    label.className = 'village-marker'

                    new mapboxgl.Marker(label)
                        .setLngLat([diffLong, diffLat])
                        .addTo(this.map);
                })
                
                // const currentVillage = Array.prototype.slice.call(document.querySelectorAll('.village-marker')).find(marker => marker.id == this.$showMarker)

                // if(currentVillage.id == this.$showMarker) {
                //     currentVillage.style.visibility = 'visible'
                // } else {
                //     currentVillage.style.visibility = 'hidden'
                // }

                

            })
      },
      async showModal() {
            this.isModalVisible = true;
      },
      async closeModal() {
            this.isModalVisible = false;
      },
      renderLabels() {
            return this.$createElement('div', 'Marker')
      }
  }
};
</script>

<style lang="less">

    .map-view, main, .map-holder, #map {
        height: 100%;
    }

    // #map {

    //     height: 100%;
    //     // width: 100%;
    // }

    .village-marker {
        background: white;
        padding: 0.3em;
        visibility: hidden;
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);
        // transform: scale(1);
        // animation: pulse 2s infinite;
        background: #ea5705;
        color: #fff;
        border-radius: 5px;
    }

    .village-marker::after {
        content: "";
        position: absolute;
        left: 43%;
        top: 100%;
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-top: 10px solid #ea5705;
        clear: both;
    }



    @keyframes pulse {
	0% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
	}

	70% {
		transform: scale(1);
		box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
	}

	100% {
		transform: scale(0.95);
		box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
	}
    }

</style>