<template>
    <div class="info-wrapper">
        <table>
            <tr v-if="data.name">
                <th>Name</th>
                <td>{{ data.name }}</td>
            </tr>
            <tr v-if="data.twitter">
                <th>Twitter</th>
                <td>
                    <a v-bind:href="'https://twitter.com/' + data.twitter">{{ data.twitter }}</a>
                </td>
            </tr>
            <tr v-if="data.discord">
                <th>Discord</th>
                <td>
                    {{ data.discord }}
                </td>
            </tr>
        </table>
    </div>
</template>

<style lang="scss" scoped>
    @import "../../public/scss/global.scss";

    .info-wrapper {
        border: 2px solid $darkblue;
        box-shadow: 4px 4px $darkblue;
        border-radius: 15px;
        padding: 1rem;
        width: calc(100% - 2rem - 4px);
        margin: 1rem 0;

        table {
            text-align: left;
            width: 100%;

            th {
                width: 5rem;
            }
        }

        @media (min-width: 768px) {
            table {
                display: flex;
                flex-wrap: wrap;
                tr {
                    display: block;
                    width: 50%;
                }
            }
        }
    }
</style>

<script>
export default {
    name: 'PlayerInfo',
    props: {
        data: null
    }
}
</script>