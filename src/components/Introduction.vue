<template>
    <article class="introduction__article">
        <h1 class="introduction__title">The walk against gender based violence</h1>
        <div>
        <img class="introduction__img" src="https://static.spacecrafted.com/f37fddf4d72c4bd1b48e97008a4a78ba/i/d29ef1e47a324d899cec873587a04846/1/4SoifmQp45JMgBnHp7ed2/Hindolo%20Pokawa.jpg" alt="">

        <p>
        This is Hindolo Pokawa. He realised violence against women and girls is a big problem in Sierra Leone and wanted to know what the root of this problem is and try to raise awareness for this problem. He then knew what his mission would be, go to Sierra Leone and walk through different towns and villages to spread awareness for this world problem.
        </p>
        </div>
      
        <router-link class="cta-btn" to="/map" tag="button">Checkout Hindolo's itinerary</router-link>
    
    </article>
</template>


<style lang="less">

    .introduction__article {
        margin: 0 1em;
        color: #fff;
        padding-top: 20%;
    }

    .introduction__img {
        width: 50%;
    }

    .cta-btn {
        background: #ea5705;
        border: 3px solid #ea5705;
        border-radius: .2em;
        color: #ffffff;
    }

    .introduction__title {
        margin: 0;
        color: #ea5705;
    }

</style>