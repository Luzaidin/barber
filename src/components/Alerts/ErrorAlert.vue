<template>
    <v-alert
    v-model="alertValue"
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