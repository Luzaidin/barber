<template>
    <v-alert
    v-model="alertValue"
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