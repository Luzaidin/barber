<template>
    <v-alert
    type="error">
      {{text}}
    </v-alert>
</template>

<script>
    export default {
        name: "ErrorAlert",
        props:{
            text: {
                type: String,
                default: 'Error'
            },
        }

    }
</script>

<style lang="scss" scoped>

</style>