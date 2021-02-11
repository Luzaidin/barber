<template>
    <v-snackbar
    :value="snackbar"
    :timeout="timeout"
    color="error"
    >
    Error! E-mail or Password are not valid
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
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>
