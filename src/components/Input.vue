<template>
    <label v-bind:class="{ error: error }" class="roboto">
        <SmallTitle type="p">{{ label }}</SmallTitle>
        <small v-if="note">{{ note }}</small>
        <textarea v-if="type === 'textarea'"
            :name="name"
            :id="name"
            :placeholder="placeholder"
            :required="required"
            :autofocus="autofocus"
            :value="value"
            @input="updateInput($event)"
            rows="5" />
        <input v-else
            :type="type"
            :name="name"
            :id="name"
            :placeholder="placeholder"
            :required="required"
            :autofocus="autofocus"
            :value="value"
            v-on:change="$emit('change', $event)"
            @input="updateInput($event)" />
    </label>
</template>

<style lang="scss" scoped>
    @import "../../public/scss/global.scss";

    label {
        display: block;
        font-size: 1rem;
        font-weight: 100;
        margin-bottom: 1.5rem;
        
        input[type='text'],
        input[type='url'],
        input[type='password'],
        input[type='email'],
        input[type='number'],
        input[type='date'],
        textarea {
            display: block;
            width: calc(100% - 1rem - 2px);
            border-width: 2px;
            border-style: solid;
            border-color: $darkblue;
            border-radius: 10px;
            padding: .5rem;
            font-size: 1rem;
            color: $darkblue;
            margin-top: .25rem; 
        }

        input[type='file'] {
            display: block;
            margin-top: .25rem;
            padding: .5rem 0;
        }

        &.error {
            input {
                border-color: $red;
            }
        }
    }
    
</style>

<script>
import SmallTitle from '@/components/SmallTitle.vue'

export default {
    name: 'Input',
    components: {
        SmallTitle
    },
    props: {
        label: String,
        name: String,
        placeholder: String,
        type: String,
        required: String,
        autofocus: String,
        link: String,
        value: null,
        note: null
    },
    data() {
        return {
            error: null,
        }
    },
    methods: {
        updateInput(event) {
            this.$emit('input', event.target.value);
        }
    }
}
</script>