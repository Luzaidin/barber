<template>
    <v-snackbar
    v-model="snackValue"
    :timeout="timeout"
    :color="color"
    >
    {{mensage}}
    </v-snackbar>
</template>

<script>
    export default {
        name: 'SnackBar',
        props: {
            value: {
                type: Boolean,
                defaul: false
            },
            timeout: {
                type: Number,
                default: 2000
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
        computed: {
            snackValue: {
                get() {
                    return this.value 
                },
                set(newValue) {
                    this.$emit('input', newValue);
                }

            }
        },
    }
</script>

<style lang="scss" scoped>

</style>
