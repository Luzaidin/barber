<template>
    <v-container 
    fill-height
    >    
        <v-row>
            <v-col
            cols="6"
            class="d-none d-sm-flex"
            >
                <p> Image </p>
            </v-col>

            <v-col
            cols="12"
            sm="6"
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