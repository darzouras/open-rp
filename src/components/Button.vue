<template>
    <button
        :name="name"
        :id="name"
        class="roboto"
        v-on:click="$emit('click')"
        v-bind:class="{ alert : alert, full : full, inactive : inactive }"
    >
        <slot></slot>
    </button>
</template>

<style lang="scss" scoped>
    @import "../../public/scss/global.scss";

    button {
        background: white;
        color: $darkblue;
        border: 2px solid $darkblue;
        border-radius: 10px;
        text-decoration: none;
        padding: .5rem 1rem;
        text-align: center;
        font-weight: 400;
        font-size: 1.2rem;
        text-transform: lowercase;
        cursor: pointer;

        &.alert {
            color: $red;
            border-color: $red;

            &:hover {
                color: white;
                background: $red;
            }
        }

        &.inactive {
            cursor: initial;

            &:hover {
                background: white;
                color: $darkblue;
            }
        }

        &.full {
            width: 100%;
        }

        &:hover {
            color: white;
            background: $darkblue;
        }
    }

</style>

<script>
export default {
    name: 'Button',
    props: {
        name: String,
        alert: null,
        full: null,
        inactive: null
    }
}
</script>