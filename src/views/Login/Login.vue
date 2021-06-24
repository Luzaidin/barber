<template>
    <div>
        <v-row>
            <v-col
            cols="6"
            class="d-none d-sm-flex imgHome"
            >
            </v-col>

            <v-col
            cols="12"
            sm="6"
            >
                <LoginForm/>
            </v-col>
        </v-row>
    </div>
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
html, body {
  height: 100%;
}

.imgHome {
    background: url('../../assets/Login/barber_home.jpg') no-repeat;
    height: 100vh;
    background-size: cover;
}
</style>