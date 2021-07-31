<template>
    <v-alert
    v-model="alertValue"
    type="error"
    :dismissible="dismissible"
    >
      {{text}}
    </v-alert>
</template>

<script>
    export default {
        name: "ErrorAlert",
        props:{
            value: {
                type: Boolean,
                default: false
            },
            text: {
                type: String,
                default: 'Error'
            },
            dismissible: {
                type: Boolean,
                default: true
            },
        },
        computed: {
            alertValue: {
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