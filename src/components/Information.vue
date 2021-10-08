<template>

    <div>
        <h3>{{place_data.place_name}}</h3>
        <h3>{{place_data.index}}</h3>
    </div>

</template>

<script>

export default {
    
    name: "Information",
    props: ["place_data"]
};
</script>

<style lang="less">


</style>