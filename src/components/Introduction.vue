<template>
    <transition name="page-fade">
    <article class="introduction__article" v-show="loading == false">
        <h1 class="introduction__title">{{ content.title }}</h1>
        <div class="introduction__summary">
            <img class="summary__img" src="https://www.slfnd.org/uploads/1/3/3/4/133433220/whatsapp-image-2021-01-18-at-6-46-46-am_orig.jpeg" alt="">

            <p class="summary__text">
            {{ content.content }}
            </p>
        </div>
      
        <router-link class="introduction__btn cta-btn" to="/explanation" tag="button">{{ content.cta }}</router-link>
    
    </article>
    </transition>
</template>

<script>
import { eventBus } from '../main'

export default {
    name: 'Introduction',
    data() {
        return {
            loading: true,
            content: {}
        }
    },
    mounted(){

        setTimeout(() => {
            this.loading = false
        }, 1);

        const data = require('../assets/static-data.json')
        

        // const chosenLanguage = data.landingpage__content.find(lang => this.$language.chosen === lang.lang)

        this.changeLanguage(data.landingpage__content, this.$language.chosen)

        eventBus.$on('change language', (lang) => {
            this.changeLanguage(data.landingpage__content, lang)
        }) 
    },
    methods: {
        changeLanguage(array, chosenLanguage) {
            const setLanguage = array.find(language => language.lang === chosenLanguage)
            
            this.content = setLanguage
        }
    }
}
</script>


<style lang="less">

    .introduction__article {

        margin: 0 1em;
        color: #fff;
        padding-top: 7rem;
        display: flex;
        flex-direction: column;
        height: 135vh;
        justify-content: space-around;

        .introduction__title {
            margin: 0;
            color: #ea5705;
        }

        .introduction__summary {
            
            display: flex;
            width: 100%;
            flex-direction: column;
            display: flex;
            width: 100%;
            height: 100%;
            flex-direction: column;
            justify-content: space-evenly;
            
            .summary__img {
                width: 100%;
            }

            .summary__text {
                line-height: 1.5;
            }
        }

        .cta-btn {
            background: #ea5705;
            border: 3px solid #ea5705;
            border-radius: .2em;
            color: #ffffff;
            padding: 1em 3em;
            font-weight: 900;
            font-size: 1em;
        }
    }

    @media only screen and (min-width: 750px) {

        .introduction__article {
            flex-direction: row;
            flex-wrap: wrap;

            .introduction__title {
                font-size: 3em;
            }

            .introduction__summary {
                flex-direction: row;

                .summary__img {
                    width: 30%;
                    object-fit: cover;
                }

                .summary__text {
                    padding-left: 1em;
                }
            }
        }
        
        

    }

</style>