<template>
  <img
    class="pizza-image"
    src="/pizza.svg"
    :class="{
      small: size === Size.Small,
      medium: size === Size.Medium,
      large: size === Size.Large,
      'extra-large': size === Size.ExtraLarge,
    }"
    alt="Pizza" />
</template>

<script lang="ts">
import {Component, Prop} from 'vue-property-decorator';
import Vue from 'vue';
import {Size} from '@/models/size';

@Component({
  data: () => ({
    Size,
  })
})
export default class PizzaImage extends Vue {
  @Prop({type: String, required: true})
  public size!: Size;
}
</script>

<style lang="scss" scoped>
.pizza-image {
  margin-left: 3rem;
  height: auto;
  flex-shrink: 0;

  &.small {
    width: 160px;
  }

  &.medium {
    width: 200px;
  }

  &.large {
    width: 240px;
  }

  &.extra-large {
    width: 280px;
  }
}
</style>
