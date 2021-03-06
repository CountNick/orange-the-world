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
import { eventBus } from '../main'



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
                  draggable: false,
                  interactive: false,
                  scrollZoom: false,
                  zoom: 6
              });
        } catch(err) {
              console.log('an error occured: ', err);
        }
      },
      async plotVillages() {
            this.map.on('load', () => {
                // this.mapLoaded = true
                // if(this.mapLoaded === true) {
                    setTimeout(() => {
                        this.map.resize()
                        this.$map.loaded = true
                    }, 1);
                // }

                this.mapLoaded = true
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
                

                this.map.on('click', 'villages-layer', (e) => {
                    
                    // store features in variable
                    const clickedPlaceData = e.features[0].properties
                    // replace data with clicked point data
                    this.place_data = clickedPlaceData
                    
                    
                    this.$router.push({
                        path: `/village/${this.place_data.index}`,
                        query: { 
                            place_name: this.place_data.place_name,
                            }
                    })
                    // show the popup
                    // this.showModal()
                })

                this.map.getSource('villages')._options.data.features.map(village => {
                    
                    if(village.properties.index === 0) {
                        this.createCustomMarker(
                            village.geometry.coordinates,
                            'div',
                            [
                                `We're starting the walk in ${village.properties.place_name}`,
                                `We beginnen de wandeling in ${village.properties.place_name}`
                            ],
                            village.properties.index,
                            'village-marker'
                        )
                    } else if(village.properties.index === 9) {
                        this.createCustomMarker(
                            village.geometry.coordinates,
                            'div',
                            [
                                `You reached the final destination: ${village.properties.place_name}`,
                                `Je hebt de eindbestemming bereikt: ${village.properties.place_name}`
                            ],
                            village.properties.index,
                            'village-marker'
                        )
                    } 
                    
                    
                    else {

                        this.createCustomMarker(
                            village.geometry.coordinates,
                            'div',
                            [
                                `You just entered ${village.properties.place_name}`,
                                `Je bent aangekomen in ${village.properties.place_name}`
                            ],
                            village.properties.index,
                            'village-marker'
                        )
                    }

                    
                })
        
                const pairedData = json.features.reduce((result, value, index, array) => {
                    if (index % 1 === 0) result.push(array.slice(index, index + 2));
                    return result;
                }, []);

                
                
                pairedData.forEach(async (pair, index) => {
                    
                    if(pair.length === 2) {
                        const routeData = await this.fetchRoutes(pair[0].geometry.coordinates, pair[1].geometry.coordinates)

                                            this.map.addSource(`route-${index}`, {
                        // Add a new source to the map style: https://docs.mapbox.com/mapbox-gl-js/api/#map#addsource
                        type: "geojson",
                        data: {
                            type: "FeatureCollection",
                            features: [],
                        },
                    });
                    
                    this.map.addSource(`route-outline-${index}`, {
                        // Add a new source to the map style: https://docs.mapbox.com/mapbox-gl-js/api/#map#addsource
                        type: "geojson",
                        data: {
                            type: "FeatureCollection",
                            features: [],
                        },
                    });

                    this.map.addLayer({
                        id: `route-${index}-layer`,
                        type: "line",
                        source: `route-${index}`,
                        layout: {
                        "line-join": "round",
                        "line-cap": "round",
                        },
                        paint: {
                        "line-color": "#ea5705",
                        "line-width": 4,
                        "line-opacity": 0,
                        },
                    }, 'villages-layer');

                    this.map.addLayer({
                        id: `route-outline-${index}-layer`,
                        type: "line",
                        source: `route-outline-${index}`,
                        layout: {
                        "line-join": "round",
                        "line-cap": "round",
                        },
                        paint: {
                        "line-color": "#ffffff",
                        "line-width": 5,
                        "line-opacity": 0,
                        },
                    }, `route-${index}-layer`);

                    this.map.getSource(`route-${index}`).setData(routeData.routes[0].geometry)
                    
                    this.map.getSource(`route-outline-${index}`).setData(routeData.routes[0].geometry)

                    eventBus.$on('showRoute', (opacity) => {
                        this.map.setPaintProperty(
                            `route-${index}-layer`,
                            'line-opacity',
                            opacity
                        )

                        this.map.setPaintProperty(
                            `route-outline-${index}-layer`,
                            'line-opacity',
                            opacity
                        )
                    })
                    
                    }

                })
                
                eventBus.$on('checkpointReached', (index) => this.map.setPaintProperty(
                    `route-${index}-layer`,
                    'line-opacity',
                    0
                ))

                const villageMarkers = document.querySelectorAll('.village-marker')
                
                eventBus.$on('change language', (lang) => {
                    
                    
                    
                    Array.from(villageMarkers).filter(marker => {
                        const chosenTexts = Array.from(marker.children).filter(text => text.id === lang)
                        const otherTexts = Array.from(marker.children).filter(text => text.id !== lang)
                        
                        chosenTexts.forEach(text => text.classList.add('custom-marker--active'))
                        otherTexts.forEach(text => text.classList.remove('custom-marker--active'))
                        
                    })
                })

                eventBus.$on('hide-labels', () => {
                    
                    
                    villageMarkers.forEach(marker => marker.style.visibility = 'hidden')
                })
                

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
      },
      async fetchRoutes(startCoords, endCoords) {
          // fetch and wait for esponse
          const response = await fetch(`https://api.mapbox.com/directions/v5/mapbox/walking/${startCoords[0]},${startCoords[1]};${endCoords[0]},${endCoords[1]}?geometries=geojson&access_token=${this.access_token}`)
          // return data in json format
          return await response.json()
      },
      createCustomMarker(coordinates, elementType, text, id, className) {

        const diffLong = coordinates[0] + 0.06944974447299209714;
        const diffLat = coordinates[1] + 0.3998258217985239753;

        const element = document.createElement(elementType)
        
        if(text){
            text.forEach((line, i) => {
                const paragraph = document.createElement('p')
                paragraph.textContent = line
                
                if(i=== 0) {
                    paragraph.id = "en"
                    paragraph.classList.add('custom-marker--active')
                } else {
                    paragraph.id = "nl"
                }

                paragraph.insertAdjacentHTML('beforeend', `<span class="material-icons">touch_app</span>`)

                element.appendChild(paragraph)
            })
            // element.textContent = text
        }
        
        element.id = id
        element.className = className

        return new mapboxgl.Marker(element)
                        .setLngLat([diffLong, diffLat])
                        .addTo(this.map);

      }
  }
};
</script>

<style lang="less">

    .map-view, main, .map-holder, #map {
        height: 100%;
    }

    .mapboxgl-control-container {
        display: none;
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
        animation: glow 2s infinite alternate;

        #en, #nl {
            display: none;
        }
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

    .active {
        display: block !important;
    }
    
    .custom-marker--active {
        display: flex !important;
        align-items: end;
    }



@keyframes glow {
  from {
    box-shadow: 0 0 10px -10px #ea5705;
  }
  to {
    box-shadow: 0 0 10px 10px #ea5705;
  }
}

</style>