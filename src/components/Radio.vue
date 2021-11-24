<template>
  <div
    class="input-radio-block"
    :title="text"
  >
    <input
      :id="radioValue"
      v-model="innerValue"
      type="radio"
      :value="radioValue"
      @change="inputChanged"
    />
    <span class="radio" />
    <label :for="radioValue">
      <slot>
        {{ text }}
      </slot>
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';

@Component({})
export default class Radio extends Vue {
  @Prop({type: [Number, String], required: true})
  public value!: string | number;

  @Prop({type: [Number, String], required: true})
  public radioValue!: string | number;

  @Prop({type: String, required: true})
  public text!: string;

  public innerValue: string | number = '';

  public mounted(): void {
    this.setInitialValue();
  }

  public inputChanged(ev: Event): void {
    const option = ev.target as HTMLInputElement;
    if (!option.checked) return;

    this.innerValue = option.value;
    this.$emit('input', this.innerValue);
    this.$emit('change');
  }

  @Watch('value')
  public setInitialValue(): void {
    this.innerValue = this.value;
  }
}
</script>
