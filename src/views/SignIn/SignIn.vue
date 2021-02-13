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

            <SnackBar
            v-model="SnackBar.value"
            />
        </v-card>
    </v-container>
</template>

<script>
import Form from '../../components/Form/Form'
import SnackBar from '../../components/SnackBar/SnackBar'

    export default {
        name: 'SignIn',
        components: {
            Form,
            SnackBar
        },
        data() {
            return {
                SubmitFormBtnName: 'Register',
                SnackBar: {
                    value: false
                }
            }
        },
        methods: {
            validateForm(formIsValid) {
                if (formIsValid) {
                    this.$router.push({ name: "Home" });
                } else{
                    this.SnackBar.value = true;
                }
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>