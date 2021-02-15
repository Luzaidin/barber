<template>
    <v-row  
    class="justify-center">
        <v-btn
        :color="color"
        :text="type"
        @click="executeMethod"
        >
        {{mensage}}
        </v-btn>
    </v-row>
</template>

<script>
    export default {
        name: 'ButtonCenter',
        props: {
            color: {
                type: String,
                default: 'primary'
            },
            mensage: {
                type: String,
                default: ''
            },
            type: {
                tpe: Boolean,
                default: true
            },
            clickMethod: {
                type: Function
            }
        },
        methods: {
            executeMethod() {
                if(this.clickMethod){
                    this.clickMethod()
                }
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>