<template>
    <v-snackbar
    v-model="snackbar"
    :timeout="timeout"
    color="error"
    >
    Error! E-mail or Password are not valid
    </v-snackbar>
</template>

<script>
    export default {
        data() {
            return {
                snackbar: false,
                timeout: 2000
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>
