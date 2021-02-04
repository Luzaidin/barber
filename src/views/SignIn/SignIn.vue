<template>
    <Form 
    :SubmitFormBtnName=SubmitFormBtnName 
    @validateForm="validateForm($event)"
    />
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