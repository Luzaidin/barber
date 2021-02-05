<template>
    <v-container 
    fill-height
    >    
        <v-row>
            <v-col
            cols="6"
            >
                <p> Image </p>
            </v-col>

            <v-col
            cols="6"
            >
                <LoginForm/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import LoginForm from '../../components/Login/LoginForm'

    export default {
        name: 'Login',
        components: {
            LoginForm,
        },
    }
</script>

<style lang="scss" scoped>

</style>