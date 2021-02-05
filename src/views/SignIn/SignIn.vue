<template>
    <v-container 
    fill-height>   
        <v-card
        class="mx-auto my-12"
        max-width="600"
        >
            <v-card-title 
            class="justify-center"
            >
            Sign Up
            </v-card-title>

            <v-card-text>
                <Form 
                :SubmitFormBtnName=SubmitFormBtnName 
                @validateForm="validateForm($event)"
                />
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import Form from '../../components/Form/Form'

    export default {
        name: 'SignIn',
        components: {
            Form
        },
        data() {
            return {
                SubmitFormBtnName: 'Register'
            }
        },
        methods: {
            validateForm(formIsValid) {
                if (formIsValid) {
                    this.$router.push({ name: "Home" });
                }
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>