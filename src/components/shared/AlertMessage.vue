<template>
  <div class="message-alert">
    <div
      v-for="(item, index) in messages"
      :key="index"
      :class="[`alert alert-dismissible fade show alert-${item.status}`]"
      role="alert"
    >
      {{ item.message }}
      <button
        type="button"
        class="close"
        data-dismiss="alert"
        aria-label="Close"
        @click="removeMessage(i)"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Navbar',
  computed: {
    ...mapState('global', ['messages']),
  },
  methods: {
    removeMessage(num) {
      this.$store.dispatch('global/removeMessage', num);
    },
    removeMessageWithTiming(timestamp) {
      const vm = this;
      setTimeout(() => {
        vm.messages.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            vm.messages.splice(i, 1);
          }
        });
      }, 5000);
    },
  },
};
</script>

<style scope lang="scss">
.message-alert {
  position: fixed;
  width: 250px;
  top: 69px;
  left: 50%;
  margin-left: -125px;
  z-index: 1100;
}
</style>
