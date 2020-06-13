<template>
  <div>
    <Title type="h1" title="Open-RP" />

    <BigMessage>
      Thanks for visiting! This is an in-progress social platform that is being built specifically for online text-based roleplaying.
    </BigMessage>

    <p>
      As this project kicks off feel free to <a href="https://forms.gle/i17wyD3WCiAghkhz6">respond to my survey</a> and let me know what you're looking for in your rp experience.
    </p>
  </div>
</template>

<script>
import Title from '@/components/Title.vue'
import BigMessage from '@/components/BigMessage.vue'

export default {
  name: 'Main',
  components: {
    Title,
    BigMessage
  }
}
</script>