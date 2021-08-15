<template>
    <v-alert
    type="success"
    :dismissible="dismissible"
    >
      {{text}}
    </v-alert>
</template>

<script>
    export default {
        name: "SuccessAlert",
        props:{
            value: {
                type: Boolean,
                default: false
            },
            text: {
                type: String,
                default: 'Success!'
            },
            dismissible: {
                type: Boolean,
                default: true
            },
        },

    }
</script>

<style lang="scss" scoped>

</style>