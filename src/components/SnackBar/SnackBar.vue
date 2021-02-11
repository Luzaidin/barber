<template>
    <v-snackbar
    :value="snackbar"
    :timeout="timeout"
    :color="color"
    >
    {{mensage}}
    </v-snackbar>
</template>

<script>
    export default {
        props: {
            snackbar: {
                type: Boolean,
                default: false
            },
            timeout: {
                type: Number,
                default: 200
            },
            color: {
                type: String,
                default: "error"
            },
            mensage: {
                type: String,
                default: "Error! E-mail or Password are not valid"
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>
