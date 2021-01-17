<template>
    <v-container fill-height>    
        <v-row >
            <v-col cols="6">
                <p> Image </p>
            </v-col>

            <v-col cols="6">
                <Form/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import Form from '../../components/Login/Form'

    export default {
        name: 'Login',
        components: {
            Form,
        },
    }
</script>

<style lang="scss" scoped>

</style>