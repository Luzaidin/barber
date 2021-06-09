<template>
    <v-alert
    type="success">
      {{text}}
    </v-alert>
</template>

<script>
    export default {
        name: "SuccessAlert",
        props:{
            text: {
                type: String,
                default: 'Success'
            },
        }

    }
</script>

<style lang="scss" scoped>

</style>