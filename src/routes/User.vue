<template>
    <Title type="h1" :title="$route.params.user" />
</template>

<script>
import Title from '@/components/Title.vue'
export default {
    name: 'User',
    components: {
        Title
    }
}
</script>