<template>
  <div>
    <Title type="h1" title="Open-RP" />

    <BigMessage>
      Thanks for visiting! This is a community platform being built for online text-based roleplaying.
    </BigMessage>

    <div class="main-flex">
      <div>
        <img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif">
      </div>

      <div>
        <p>
          I'm hard at work on this project, check the <router-link to="/roadmap">roadmap</router-link> to check on our progress. Also please <a href="https://forms.gle/i17wyD3WCiAghkhz6">respond to my survey</a> and let me know what you're looking for in your rp experience!
        </p>
      </div>
    </div>

    <Title type="h2">How will this work?</Title>
    <p>My hope is that this will be a better experience by eliminating the need to juggle multiple RP accounts as you would if you were using Dreamwidth, Tumblr, or Twitter for RP. On this website you will create a single login, then from your dashboard you will be able to create characters. At any time you will have only one active character, and that character is the one that will be used for posting to RP posts.</p>
    
    <p>
      Please check out the sample user I made (<router-link to="/user/darizard">darizard</router-link>) as well as characters that are linked from that profile.
    </p>
  </div>
</template>

<style lang="scss" scoped>
  @media (min-width: 768px) {
    .main-flex {
      display: flex;

      div:nth-child(2) {
        margin-left: 1rem;

        p:first-child {
          margin-top: 0;
        }
      }
    }
  }
</style>

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