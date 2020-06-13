<template>
    <main>
        <Title type="h1" title="Components" />
        <article>
            <Title type="h2" title="Big Title" />
        </article>
    </main>
</template>

<style lang="scss" scoped>

    main {
        width: 90%;
        max-width: 800px;
        margin: auto;
    }
    
</style>

<script>
import Title from '@/components/Title.vue'

export default {
    name: 'Components',
    components: {
        Title
    }
}
</script>