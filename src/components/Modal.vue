<template>
    <transition name="page-fade">
        <div class="modal-backdrop">
            <div class="modal">
            <header class="modal-header">
                <slot name="header">
                
                {{ place_name }}
            
                </slot>
                <button
                type="button"
                class="btn-close"
                @click="$router.back()"
                >
                <span class="material-icons">
                close
                </span>
                </button>
            </header>

            <section class="modal-body">
                <slot name="body">
                <carousel v-if="images" :perPage="1">

                    <slide v-for="image in images" :key="image.link">
                    <img class="carousel__img" :src='image.link' alt="">
                    </slide>
                </carousel>
                <p class="modal__information">
                {{ information }}
                </p>
                </slot>
            </section>

            <footer class="modal-footer">
                <slot name="footer">
                Stop number: {{ index }}
                </slot>
                <button
                v-if="$language.chosen == 'en'"
                type="button"
                class="btn-orange"
                @click="$router.back()"
                >
                Back
                </button>
                <button
                v-else
                type="button"
                class="btn-orange"
                @click="$router.back()"
                >
                Terug
                </button>
            </footer>
            </div>
        </div>
    </transition>
</template>

<script>

import { Carousel, Slide } from 'vue-carousel';

  export default {
    name: 'Modal',
    components: {
        Carousel,
        Slide
    },
    data() {
        return {
            place_name: "This is the default title!",
            information: "This is the default body!",
            index: "null",
            images: []
        }
    },
    mounted() {

        const json = require('../assets/data.json')

        const village = json.features.find(village => village.properties.place_name === this.$route.query.place_name)
        
        this.images = village.properties.images

        this.place_name = village.properties.place_name

        if(this.$language.chosen === "en") {
          
          this.information = village.properties.information[0].en
        } else {
          this.information = village.properties.information[1].nl
        }
        
        this.index = this.$route.params.index
        // this.images = 

    },
    methods: {
      close() {
        this.$emit('close');
      },
    },
  };
</script>

<style>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 4;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background: #000;
  }

  .modal__information {
    line-height: 1.5;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    position: relative;
    border-bottom: 1px solid #ea5705;
    color: #ea5705;
    justify-content: space-between;
    font-weight: 600;
  }

  .modal-footer {
    /* border-top: 1px solid #eeeeee; */
    flex-direction: column;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
    color: #fff;
  }

  .btn-close {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: #ea5705;
    background: transparent;
  }

  .btn-orange {
    color: white;
    background: #ea5705;
    border: 1px solid #ea5705;
    font-size: .9em;
    padding: 1rem;
    border-radius: 2px;
  }

    .page-fade-enter,
  .page-fade-leave-to {
    opacity: 0;
  }

  .page-fade-enter-active,
  .page-fade-leave-active {
    transition: opacity .5s ease;
  }

  .carousel__img {
    width: 100%;
    object-fit: contain;
  }

  .VueCarousel-dot--active {
    background-color: grey !important;
  }

  .VueCarousel-slide {
    display: flex;
    justify-self: center;
  }

  @media only screen and (min-width: 750px) {

      .modal-backdrop {
          justify-content: flex-end;
      }

      .modal-header {
          font-size: 1.2em;
      }

      .modal {
          width: 50%;
          height: 100vh;
          justify-content: space-between;
      }

  }

</style>

// source used: https://www.digitalocean.com/community/tutorials/vuejs-vue-modal-component