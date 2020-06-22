<template>
    <div class="thread-wrapper">
        {{ charID }}, {{ thread }}
    </div>
</template>

<script>
export default {
    name: 'Thread',
    data() {
        return {
            charID: this.$route.params.char.toLowerCase(),
            thread: this.$route.params.thread
        }
    }
}
</script>