<template>
    <transition name="page-fade">
    <article class="introduction__article" v-show="loading == false">
        <h1 class="introduction__title">Welcome to the Orange Challenge!</h1>
        <div class="introduction__summary">
            <img class="summary__img" src="https://static.spacecrafted.com/f37fddf4d72c4bd1b48e97008a4a78ba/i/d29ef1e47a324d899cec873587a04846/1/4SoifmQp45JMgBnHp7ed2/Hindolo%20Pokawa.jpg" alt="">

            <p class="summary__text">
            Thank you for participating! We greatly appreciate your efforts in combating violence against women in Sierra Leone with Hindolo Pokawa and UN Women NL. Hindolo's journey will take him through different cities and villages, crossing a total of 837 kilometers across Sierra Leone. This website will take you to the 10 biggest cities and villages that Hindolo visits on his walk. We will show you the activities that are done while he is there. You will be joining him in this journey, walking a total of 8.37 kilometers in your own neighborhood. We encourage you to share pictures of your walk for your sponsors! Make sure to use the hashtag #OrangetheWorldNL. 
            </p>
        </div>
      
        <router-link class="introduction__btn cta-btn" to="/explanation" tag="button">Let's start</router-link>
    
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