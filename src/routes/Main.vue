<template>
  <div>
    <Title type="h1" title="Open-RP" />

    <BigMessage>
      Thanks for visiting! This is an in-progress community platform that is being built for online text-based roleplaying.
    </BigMessage>

    <div class="center">
      <img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif">
    </div>

    <p>
      I'm hard at work on this project, check the <router-link to="/roadmap">roadmap</router-link> to check on our progress. Also please <a href="https://forms.gle/i17wyD3WCiAghkhz6">respond to my survey</a> and let me know what you're looking for in your rp experience!
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