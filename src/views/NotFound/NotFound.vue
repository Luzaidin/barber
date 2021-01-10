<template>
    <div style="height:100%; background-size: cover; background-attachment: fixed; background-position: center center;" :style="{ 'background-image': 'url(' + image + ')' }"></div>
</template>

<script>
    import Image from '../../assets/closed_404.jpg'
    export default {
        name: 'NotFoud',

        data(){
            return{
                image: Image
            }
        }
    }
</script>
