<template>
  <div
    class="error-message-wrapper"
    :class="{'is-visible': !!error}"
  >
    <transition name="fade">
      <p
        v-if="error"
        class="error-message"
      >
        {{ error }}
      </p>
    </transition>
  </div>
</template>
<script lang="ts">
import {Component, Prop} from 'vue-property-decorator';
import Vue from 'vue';

@Component({})
export default class ErrorMessage extends Vue {
  @Prop()
  public error?: string;
}
</script>

<style lang="scss" scoped>
.error-message-wrapper {
  transition: height 0.3s;
  height: 0;
  &.is-visible {
    height: 1.25rem;
  }
}

.error-message {
  margin: 0;
  padding-top: 0.5rem;
  height: 1.5rem;
  color: #f25153;
  font-size: 0.75rem;
}
</style>
