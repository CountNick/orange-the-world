<template>
    <div class="language-switch__container">
        <button v-if="$language.chosen == 'nl'"
            id="en" 
            class="language-switch__btn"
            v-on:click="changeLanguage($event)"
        >
            View in English
        </button>
        
        <button v-if="$language.chosen == 'en'"
            id="nl"
            class="language-switch__btn"
            v-on:click="changeLanguage($event)"
        >
            Bekijk in Nederlands
        </button>
    </div>
</template>

<script>

import { eventBus } from '../main'

export default {
    name: 'Introduction',
    data() {
        return {
            loading: true
        }
    },
    mounted(){

    },
    methods: {
        changeLanguage(event) {

            this.$language.chosen = event.target.id

            eventBus.$emit('change language', event.target.id)
            
        }
    }
}
</script>


<style lang="less">

    .language-switch__container {
        z-index: 10;
        
        .language-switch__btn {
            color: #ea5705;
            background: none;
            border: none;
            font-weight: bolder;
        }
    }

</style>