<template>
    <div class="info-wrapper" ref="infoWrapper" v-if="showWrapper == true">
        <table ref="infoTable">
            <tr v-if="data.altNames">
                <th scope="row">Alternative Names</th>
                <td>{{ data.altNames }}</td>
            </tr>
            <tr v-if="data.age">
                <th>Age</th>
                <td>{{ data.age }}</td>
            </tr>
            <tr v-if="data.gender">
                <th>Gender/Pronouns</th>
                <td>{{ data.gender }}</td>
            </tr>
            <tr v-if="data.creature">
                <th>Creature Type</th>
                <td>{{ data.creature }}</td>
            </tr>
            <tr v-if="data.timeline">
                <th>Timeline Info</th>
                <td>{{ data.timeline }}</td>
            </tr>
        </table>
    </div>
</template>

<style lang="scss" scoped>
    @import "../../public/scss/info-table.scss";
</style>

<script>
export default {
    name: 'CharInfo',
    props: {
        data: null
    },
    data() {
        return {
            showWrapper: true
        }
    },
    mounted() {
        if (this.$refs.infoTable.childElementCount === 0) this.showWrapper = false
    }
}
</script>