<template>
    <transition name="page-fade">
    <article class="introduction__article" v-show="loading == false">
        <h1 class="introduction__title">The walk against gender based violence</h1>
        <div class="introduction__summary">
            <img class="summary__img" src="https://static.spacecrafted.com/f37fddf4d72c4bd1b48e97008a4a78ba/i/d29ef1e47a324d899cec873587a04846/1/4SoifmQp45JMgBnHp7ed2/Hindolo%20Pokawa.jpg" alt="">

            <p class="summary__text">
            This is Hindolo Pokawa. He realised violence against women and girls is a big problem in Sierra Leone and wanted to know what the root of this problem is and try to raise awareness for this problem. He then knew what his mission would be, go to Sierra Leone and walk through different towns and villages to spread awareness for this world problem.
            </p>
        </div>
      
        <router-link class="introduction__btn cta-btn" to="/explanation" tag="button">Start your challenge</router-link>
    
    </article>
    </transition>
</template>

<script>
export default {
    name: 'Introduction',
    data() {
        return {
            loading: true
        }
    },
    mounted(){

        setTimeout(() => {
            this.loading = false
        }, 1);
    }
}
</script>


<style lang="less">

    .introduction__article {

        margin: 0 1em;
        color: #fff;
        padding-top: 4rem;
        display: flex;
        flex-direction: column;
        height: 100%;
        justify-content: space-around;

        .introduction__title {
            margin: 0;
            color: #ea5705;
        }

        .introduction__summary {
            
            display: flex;
            width: 100%;
            flex-direction: column;
            
            .summary__img {
                width: 50%;
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