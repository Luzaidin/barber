<template slot="progress">
    <v-progress-linear
    :color="color"
    :height="height"
    indeterminate
    ></v-progress-linear>
</template>

<script>
    export default {
        name: 'ProgressLinear',
        data() {
            return {
                color: 'deep-blue',
                height: '10'
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>
