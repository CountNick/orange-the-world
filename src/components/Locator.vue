<template>

    <div id="locator" v-cloak>
  
  <div v-if="errorStr">
    Sorry, but the following error
    occurred: {{errorStr}}
  </div>
  
  <div v-if="gettingLocation">
    <i>Getting your location...</i>
  </div>
  
  <div v-if="startLocation">
    Your start location data is {{ startLocation.coords.latitude }}, {{ startLocation.coords.longitude}}
  </div>
  
  <div v-if="location">
    Your location data is {{ location.coords.latitude }}, {{ location.coords.longitude}}
  </div>

  <div v-if="traveledDistance">
    Traveled distance: {{ traveledDistance }} KM
  </div>

  <button v-if="location === null" class="locator-start__btn"
    v-on:click="startLocator"
  >
      Start route
  </button>

  <button v-if="location" class="locator-start__btn"
    v-on:click="functionIsRunning = false; stopRoute()"
  >
      Stop route
  </button>
  
</div>

</template>

<script>


  export default {
    name: 'Locator',
    data() {
        return {
            location: null,
            gettingLocation: false,
            errorStr: null,
            startLocation: null,
            traveledDistance: null,
            // stopWatching: false
            functionIsRunning: false,
            passedLocations: [],
        }
    },
    created() {
        // do we support geolocation

        /** Converts numeric degrees to radians */
        if (typeof(Number.prototype.toRad) === "undefined") {
        Number.prototype.toRad = function() {
            return this * Math.PI / 180;
        }
        }

        if(!('geolocation' in navigator)) {
            this.errorStr = 'Geolocation is not available.';
        }

    },
    methods: {
        startLocator() {
        console.log(this.functionIsRunning)
        if(!this.functionIsRunning) {
            this.functionIsRunning = true
        }
        console.log(this.functionIsRunning)
        this.gettingLocation = true;
        // get position
        navigator.geolocation.getCurrentPosition(pos => {
            this.gettingLocation = false;
            this.startLocation = pos;
            this.location = pos;
        }, err => {
            this.gettingLocation = false
            this.errorStr = err.message
        })

        navigator.geolocation.watchPosition((position) => {
        
        console.log(position.coords);
        this.location = position

        this.passedLocations.push(this.location)
        // const lastPassedLocation = this.passedLocations[this.passedLocations.length - 1]
        
        this.traveledDistance = this.traveledDistance + this.calculateDistance(this.startLocation.coords.latitude, this.startLocation.coords.longitude, this.location.coords.latitude, this.location.coords.longitude)

        if(this.traveledDistance >= 1 || this.traveledDistance >= 2 || this.traveledDistance >= 3 || this.traveledDistance >= 4 || this.traveledDistance >= 5 ||this.traveledDistance >= 6 || this.traveledDistance >= 7 || this.traveledDistance >= 8 || this.traveledDistance >= 9) {
            this.$showMarker = this.$showMarker + 1
            console.log(this.$showMarker)
        }

        const currentVillage = Array.prototype.slice.call(document.querySelectorAll('.village-marker')).find(marker => marker.id == this.$showMarker)
        const passedVillage = Array.prototype.slice.call(document.querySelectorAll('.village-marker')).find(marker => marker.id == this.$showMarker-1)

        if(currentVillage.id == this.$showMarker) {
            navigator.vibrate(200)
            currentVillage.style.visibility = 'visible'
            passedVillage.style.visibility = 'hidden'
        } 
        

        });

        
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
            this.startLocation = null
            this.location = null
            this.traveledDistance = null
            // this.stopWatching = true
            console.log('function is running: ', this.functionIsRunning)
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
        background: black;
    }

    button {
        background: #ea5705;
        border: none;
        color: white;
        padding: 1em;
    }

</style>