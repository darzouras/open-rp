<template>
    <div class="info-wrapper" v-if="data">
        <table>
            <tr v-if="data.name">
                <th scope="row">Name</th>
                <td>{{ data.name }}</td>
            </tr>
            <tr v-if="data.birthday">
                <th scope="row">Birthday</th>
                <td>{{ data.birthday }}</td>
            </tr>
            <tr v-if="data.pronouns">
                <th scope="row">Pronouns</th>
                <td>{{ data.pronouns }}</td>
            </tr>
            <tr v-if="data.timezone">
                <th scope="row">Time zone</th>
                <td>{{ data.timezone }}</td>
            </tr>
            <tr v-if="data.twitter">
                <th scope="row">Twitter</th>
                <td>
                    <a v-bind:href="'https://twitter.com/' + data.twitter">{{ data.twitter }}</a>
                </td>
            </tr>
            <tr v-if="data.discord">
                <th scope="row">Discord</th>
                <td>
                    {{ data.discord }}
                </td>
            </tr>
            <tr v-if="data.plurk">
                <th scope="row">Plurk</th>
                <td>
                    <a v-bind:href="'https://plurk.com/' + data.plurk">{{ data.plurk }}</a>
                </td>
            </tr>
            <tr v-if="data.tumblr">
                <th scope="row">Tumblr</th>
                <td>
                    <a v-bind:href="'https://' + data.tumblr + '.tumblr.com'">{{ data.tumblr }}</a>
                </td>
            </tr>
            <tr v-if="data.livejournal">
                <th scope="row">Livejournal</th>
                <td>
                    <a v-bind:ref="'https://' + data.livejournal + '.livejournal.com'">{{ data.livejournal }}</a>
                </td>
            </tr>
            <tr v-if="data.dreamwidth">
                <th scope="row">Dreamwidth</th>
                <td>
                    <a v-bind:href="'https://' + data.dreamwidth + '.dreamwidth.org'">{{ data.dreamwidth }}</a>
                </td>
            </tr>
        </table>

        <div class="info" v-html="data.extra"></div>
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
        margin: 1rem 0 2rem;

        table {
            text-align: left;
            width: 100%;

            th {
                width: 6rem;
            }

            th, td {
                padding: .25rem 0;
            }
        }

        .info {
            padding: 1rem 0 0;
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