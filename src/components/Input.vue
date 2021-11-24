<template>
  <div class="input-wrapper">
    <div class="labeled-input">
      <label :for="id">
        {{ label }}
      </label>
      <input
        :placeholder="placeholder"
        :id="id"
        :ref="inputFieldRef"
        v-model="modelValue"
        required
        :class="{
          touched,
          invalid: error.hasError,
        }"
        @blur="onBlur"
        @error="error = $event"
      >
    </div>
    <ErrorMessage
      :error="error.message"
    />
  </div>

</template>

<script lang="ts">
import {Component, Mixins, Prop} from 'vue-property-decorator';
import ValidationMixin from '@/mixins/validation-mixin';
import ErrorMessage from '@/components/ErrorMessage.vue';

@Component({
  components: {ErrorMessage}
})
export default class BaseInput extends Mixins(ValidationMixin) {
  @Prop({required: true})
  public value!: string;

  @Prop({required: true})
  public id!: string;

  @Prop({required: true})
  public label!: string;

  @Prop({required: true})
  public placeholder!: string;

  public get modelValue(): string {
    return this.value;
  }

  public set modelValue(value: string) {
    this.validateField();
    this.$emit('input', value);
  }

  public onBlur(event: Event): void {
    this.touched = true;
    this.validateField();
    this.$emit('blur', event);
  }
}
</script>

<style lang="scss" scoped>
.input-wrapper {
  input {
    width: 100%;

    -webkit-appearance: none;
    background-color: #fff;
    border: 2px solid #E0E5E7;
    border-radius: 0.5rem;
    box-sizing: border-box;
    font-size: 1rem;
    line-height: 1.25;
    outline: none;
    padding: 0.5rem 1rem;
    transition: border-color 0.3s, color 0.3s;

    &:focus {
      border-color: #b2bcc1;
    }

    &.invalid {
      border-color: #f25153;
    }

    &[disabled],
    [disabled] &,
    &:disabled,
    :disabled & {
      opacity: 0.5;
      pointer-events: none;
    }
  }
}
</style>
