<template>

    <div id="locator" v-cloak>
  
  <div v-if="errorStr">
    Sorry, but the following error
    occurred: {{errorStr}}
  </div>
  
  <div class="getting__location" v-if="gettingLocation">
    <i>Getting location...</i>
  </div>
  
  <div v-if="startLocation">
    Your start location data is {{ startLocation.coords.latitude }}, {{ startLocation.coords.longitude}}
  </div>
  
  <div v-if="location">
    Your location data is {{ location.coords.latitude }}, {{ location.coords.longitude}}
  </div>
  <transition name="page-fade">
  <div v-if="location">
    <div class="distance__container">
      <span class="material-icons">
        directions_walk
      </span>
      <div>
        {{ traveledDistance }} KM
      </div>
    </div>
  </div>
  </transition>
  <transition name="page-fade">
    <div v-if="$map.loaded" class="btn__container">

    <button v-if="location === null" class="locator-start__btn"
      v-on:click="startLocator"
    > 
        Start challenge
    </button>

      <button v-if="location" class="locator-start__btn"
      v-on:click="functionIsRunning = false; stopRoute()"
    >
        Stop challenge
    </button>

    <router-link class="locator-help__btn" to="/explanation" tag="button">
      <span class="material-icons">
        help
      </span>
    </router-link>

    </div>
  </transition>


  
</div>

</template>

<script>
import { eventBus } from '../main'

  export default {
    name: 'Locator',
    data() {
        return {
            location: null,
            gettingLocation: false,
            accumulatedDistance: 0,
            errorStr: null,
            startLocation: null,
            traveledDistance: 0.00,
            // stopWatching: false
            functionIsRunning: false,
            passedLocations: [],
            watchId: null,
            currentVillage: null,
            passedVillage: null,
            startedWatching: false,
        }
    },
    created() {
        

        /** Converts numeric degrees to radians */
        if (typeof(Number.prototype.toRad) === "undefined") {
        Number.prototype.toRad = function() {
            return this * Math.PI / 180;
        }
        }
        // do we support geolocation
        if(!('geolocation' in navigator)) {
            this.errorStr = 'Geolocation is not available.';
        }

    },
    methods: {
        async startLocator() {
    
        if(!this.functionIsRunning) {
            this.functionIsRunning = true
        }
   
        this.gettingLocation = true;
        // get position
        navigator.geolocation.getCurrentPosition(pos => {
            this.gettingLocation = false;
            this.startLocation = pos;
            this.location = pos;
            eventBus.$emit('showRoute', 1)
        }, err => {
            this.gettingLocation = false
            this.errorStr = err.message
        })

        this.updateLocation()

        this.watchId = setInterval(() => {
          this.updateLocation()
        }, 2000);


        if(!this.functionIsRunning) return
            
        },
        calculateDistance(lat1, long1, lat2, long2) {
            const R = 6371;
            const dLat = (lat2 - lat1).toRad();
            const dLon = (long2 - long1).toRad();
            const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                    Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) * 
                    Math.sin(dLon / 2) * Math.sin(dLon / 2); 
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
            const d = R * c;

            return d

        },
        stopRoute() {
            eventBus.$emit('showRoute', 0)
            this.passedLocations = []
            this.startedWatching = false
            this.startLocation = null
            this.location = null
            this.traveledDistance = 0
            // this.stopWatching = true
            this.$showMarker = 0
            console.log('current village in stopoute: ', this.currentVillage)
            this.currentVillage.style.visibility = 'hidden'
            if(typeof this.passedVillage !== 'undefined') {
              this.passedVillage = null
            }
            
            this.currentVillage = null

            clearInterval(this.watchId)
            
        },
        updateLocation() {
            navigator.geolocation.getCurrentPosition(pos => {
              
              this.location = pos

              this.passedLocations.push([this.location.coords.latitude, this.location.coords.longitude])
              // const lastPassedLocation = this.passedLocations[this.passedLocations.length - 1]

              const arraysAreEqual = this.arrayEquals(this.passedLocations[this.passedLocations.length-1], this.passedLocations[this.passedLocations.length-2])

              console.log('array: ', this.passedLocations[this.passedLocations.length-2])


              if(!arraysAreEqual && this.passedLocations.length > 1) {
                // window.localStorage.setItem('coordinates', JSON.stringify(this.passedLocations))
                console.log('traveld Distance init: ', this.traveledDistance)
                console.log('passedLocations: ', this.passedLocations)
                // const unformattedDistance = this.traveledDistance + this.calculateDistance(this.startLocation.coords.latitude, this.startLocation.coords.longitude, this.location.coords.latitude, this.location.coords.longitude)

                // const unformattedDistance = this.traveledDistance + this.calculateDistance(this.passedLocations[this.passedLocations.length-2][0], this.passedLocations[this.passedLocations.length-2][1], this.location.coords.latitude, this.location.coords.longitude)

                const delta = this.calculateDelta(this.passedLocations)
                this.accumulatedDistance += delta

                console.log('accumulated distance: ', this.accumulatedDistance)
          
                // this.traveledDistance = Math.round(unformattedDistance *100) / 100;
                this.traveledDistance = (this.round(this.accumulatedDistance, 3)).toLocaleString('en-US', { minimumFractionDigits: 3 })

                console.log(this.traveledDistance)
              }
              
        
              if(this.traveledDistance >= 1 && this.traveledDistance <= 2) {
            
                this.$showMarker = this.$showMarker = 1
          
              } 
              
              if(this.traveledDistance >= 2 && this.traveledDistance <= 3) {
                this.$showMarker = this.$showMarker = 2
              }

              if(this.traveledDistance >= 3 && this.traveledDistance <= 4) {
                this.$showMarker = this.$showMarker = 3
              }

              if(this.traveledDistance >= 4 && this.traveledDistance <= 5) {
                this.$showMarker = this.$showMarker = 4
              }

              if(this.traveledDistance >= 5 && this.traveledDistance <= 6) {
                this.$showMarker = this.$showMarker = 5
              }

              if(this.traveledDistance >= 6 && this.traveledDistance <= 7) {
                this.$showMarker = this.$showMarker = 6
              }

              if(this.traveledDistance >= 7 && this.traveledDistance <= 8) {
                this.$showMarker = this.$showMarker = 7
              }

              if(this.traveledDistance >= 8 && this.traveledDistance <= 9) {
                this.$showMarker = this.$showMarker = 8
              }

              if(this.traveledDistance >= 9 && this.traveledDistance <= 10) {
                this.$showMarker = this.$showMarker = 9
                clearInterval(this.watchId)
              }
              

              console.log('travelled distance: ', this.traveledDistance)
              console.log('show marker: ', this.$showMarker)

              this.currentVillage = Array.prototype.slice.call(document.querySelectorAll('.village-marker')).find(marker => marker.id == this.$showMarker)
              this.passedVillage = Array.prototype.slice.call(document.querySelectorAll('.village-marker')).find(marker => marker.id == this.$showMarker-1)

              if(this.currentVillage.id == this.$showMarker) {
                // navigator.vibrate(200)
            
            
                this.currentVillage.style.visibility = 'visible'
                console.log('passed village: ', this.passedVillage)

                if(typeof this.passedVillage !== 'undefined') {
                  this.passedVillage.style.visibility = 'hidden'
                  eventBus.$emit('checkpointReached', `${this.passedVillage.id}`)
                }
            
        } 
            }, (err) => {
              this.gettingLocation = false
              this.errorStr = err.message
            }, {
              enableHighAccuracy: true
            })
        },
        arrayEquals(a, b) {
          return Array.isArray(a) && Array.isArray(b) && a.length === b.length && a.every((val, index) => val === b[index]);
        },
        round(num, places) {
          return +(parseFloat(num).toFixed(places));
        },
        calculateDelta(track) {
          if(track.length >= 3) {
            const newIndex = track.length - 1;
            const newLatLng = track[newIndex];
            const lastLatLng = track[newIndex - 1];
            const latitude = 0;
            const longitude = 1;
            return this.distance(newLatLng[latitude], newLatLng[longitude], lastLatLng[latitude], lastLatLng[longitude], 'K');
          }
        },
        distance(lat1, lon1, lat2, lon2, unit) {
          if ((lat1 == lat2) && (lon1 == lon2)) {
            return 0;
          }
          else {
            var radlat1 = Math.PI * lat1/180;
            var radlat2 = Math.PI * lat2/180;
            var theta = lon1-lon2;
            var radtheta = Math.PI * theta/180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
              dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180/Math.PI;
            dist = dist * 60 * 1.1515;
            if (unit=="K") { dist = dist * 1.609344 }
            if (unit=="N") { dist = dist * 0.8684 }
            return dist;
          }
        }
    }
  };
</script>

// https://www.html5rocks.com/en/tutorials/geolocation/trip_meter/
// https://stackoverflow.com/questions/5260423/torad-javascript-function-throwing-error

<style lang="less" scoped>
    #locator {
        position: fixed;
        z-index: 3;
        color: #ea5705;
        bottom: 0;
        width: 100%;
    }

    button {
        background: #ea5705;
        border: none;
        color: white;
        padding: 1em;
    }

    .btn__container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 1em 1em;

      .locator-start__btn {
        border-radius: .5em;
        font-weight: 700;
      }

      .locator-help__btn {
        background: #fff;
        color: #000;
        border-radius: 50%;
      }

    }

    .getting__location {
      font-size: 2em;
      padding: .5em;
    }

    .distance__container {
      font-size: 2em;
      padding: .5em;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;


      .material-icons {
        font-size: unset;
      }

    }

</style>