<template name="page-fade"> 
    <section class="explanation__container">
        
        <router-link to="/map" tag="button" class="close__btn">
            <span class="material-icons">
                close
            </span>
        </router-link>
        
        <article>
            <p>
                Welcome to the Orange the World Challenge. Press the start route button and start walking to track the amount of kilometers you've walked. With each kilometer you walk you'll enter a new village in Sierra Leone. Villages will be highlighted when you arrive in them, when clicking on one you'll get more information about what Hindolo does in this village.
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
    top: 20%;
    background: #fff;
    margin: 1rem 2rem;
    padding: 1rem 2rem;
    box-shadow: 2px 2px 20px 1px;
}

.close__btn {
    display: flex;
    align-items: center;
    background: none;
    border: none;
    flex-direction: row;
    width: 100%;
    justify-content: flex-end;
}

</style>