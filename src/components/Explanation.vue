<template name="page-fade"> 
    <section class="explanation__container">
        
        <router-link to="/map" tag="button" class="close__btn">
            <span class="material-icons">
                close
            </span>
        </router-link>
        
        <article class="explanation__text">

            <h3>Location data</h3>
            <p>
                Welcome to the Orange the World Challenge! In order fot his application to work you'll need to enable location services for this application. When pressing the "Start challenge" button the browser will ask for permission to use your location, if you deny access you won't be able to keep track of the distance you've walked. The location data is not being saved for privacy reasons. If you accidentally did not allow the application to use location data but still want to make use of this feature it's possible to empty your browser's cache and reload the page.
            </p>
            
            <h3>I don't want you to use my location</h3>
            <p>
            if you deny access your location won't be tracked and you won't be able to see how far you've walked but you'll still be able to click the points on the map for more information.
            </p>
        </article>

        

    </section>
</template>

<script>
export default {
    
}
</script>

<style lang="less" scoped>

.explanation__container {
    z-index: 5;
    position: fixed;
    top: 0;
    background: #fff;
    margin: 1rem 2rem;
    padding: 1rem 2rem;
    box-shadow: 2px 2px 20px 1px;
    height: 80vh;

    .close__btn {
        display: flex;
        align-items: center;
        background: none;
        border: none;
        flex-direction: row;
        width: 100%;
        justify-content: flex-end;
    }

    .explanation__text {
        overflow-y: scroll;
    }
}



</style>