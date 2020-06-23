<template>
    <div class="404-wrapper">
        <Title type="h1">Oops!</Title>

        <p>We couldn't find the page you were looking for. If you think this is a mistake try reaching out to us for support.</p>
    </div>
</template>

<script>
import Title from '@/components/Title.vue'

export default {
    name: 'NotFound',
    components: {
        Title
    }
}
</script>