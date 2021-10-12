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
            passedLocations: []
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
        const lastPassedLocation = this.passedLocations[this.passedLocations.length - 1]
        console.log('passed locations, last one: ', lastPassedLocation)
        
        this.traveledDistance = this.calculateDistance(lastPassedLocation.coords.latitude, lastPassedLocation.coords.longitude, this.location.coords.latitude, this.location.coords.longitude)

        //             if(this.stopWatching === true) {
        //     console.log('going to stop watching')
        //     return;
        // }

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