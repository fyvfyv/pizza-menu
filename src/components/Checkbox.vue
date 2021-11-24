<template>
  <div
    class="checkbox"
    :class="{
      'readonly': readonly,
    }"
    :title="title"
  >
    <input
      v-model="innerValue"
      type="checkbox"
      :checked="innerValue"
      :disabled="readonly"
      @click="checkChanged"
    >
    <span class="box">
      <IconTick class="icon-tick" />
    </span>
    <label v-if="!!label">{{ label }}</label>
  </div>
</template>

<script lang="ts">
import IconTick from './IconTick.vue';
import {Component, Prop} from 'vue-property-decorator';
import Vue from 'vue';

@Component({
  components: {
    IconTick,
  },
})
export default class Checkbox extends Vue {
  @Prop({type: String, default: null})
  public label?: string;

  @Prop({type: Boolean, default: false})
  public readonly?: boolean;

  @Prop({type: String, default: null})
  public title?: string;

  @Prop({type: String, required: true})
  public context!: string;

  @Prop({type: Boolean, required: true})
  public value!: boolean;

  public innerValue = false;

  public mounted(): void {
    this.innerValue = this.value;
  }

  public checkChanged(): void {
    if (this.readonly) {
      return;
    }

    this.innerValue = !this.innerValue;
    this.$emit('input', this.innerValue, this.context);
    this.$emit('change');
  }
}
</script>

<style lang="scss" scoped>
.checkbox {
  $inactive-color: #E0E5E7;
  $active-color: #FF6900;

  align-items: center;
  align-self: center;
  display: flex;
  position: relative;

  &.inline {
    display: inline-flex;
  }

  input[type="checkbox"]:disabled + span.box,
  :disabled & input[type="checkbox"] + span.box,
  input[type="checkbox"]:disabled + span.box + label,
  :disabled & input[type="checkbox"] + span.box + label,
  &[disabled] span.box,
  [disabled] & span.box,
  &[disabled] label,
  [disabled] & label {
    opacity: 0.5;
  }

  input[type="checkbox"]:checked + span.box .icon-tick {
    transform: scale(1);
  }

  input[type="checkbox"]:checked + span.box {
    background-color: $active-color;
    border-color: $active-color;
  }

  input[type="checkbox"] {
    display: inline-block;
    height: 100%;
    left: 0;
    margin: 0;
    opacity: 0;
    position: absolute;
    width: 100%;
  }

  &:not(.readonly) input[type="checkbox"] {
    cursor: pointer;
  }

  &.readonly input[type="checkbox"],
  input[type="checkbox"]:disabled,
  :disabled & input[type="checkbox"],
  input[type="checkbox"][disabled],
  [disabled] & input[type="checkbox"]{
    pointer-events: none;
  }

  span.box,
  label {
    display: inline-block;
    vertical-align: middle;
  }

  span.box {
    border-radius: 0.25rem;
    border: 2px solid $inactive-color;
    height: 1rem;
    pointer-events: none;
    position: relative;
    width: 1rem;
    background-color: #fff;
    transition: background-color 0.3s, border-color 0.3s;

    .icon-tick {
      height: 0.75rem;
      width: 0.75rem;
      left: 12%;
      position: absolute;
      top: -12%;
      transform: scale(0);
      z-index: 1;
      transition: transform 0.3s;
    }
  }

  label {
    font-size: 1rem;
    font-weight: normal;
    margin: 0;
    padding-left: 0.5rem;
  }
}
</style>
