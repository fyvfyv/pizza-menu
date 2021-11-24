<template>
  <div class="radio-group">
    <div v-if="(!!options && options.length)">
      <Radio
        v-for="(option, index) in options"
        :key="index"
        v-model="innerValue"
        :checked="innerValue === option.value"
        :radio-value="option.value"
        :text="option.text"
        @input="setNewOptionValue"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';
import Radio from '@/components/Radio.vue';
import {RadioOption} from '@/components/radio-option';

@Component({
  components: {Radio}
})
export default class RadioGroup extends Vue {
  @Prop({type: [Number, String], required: true})
  public value!: string | number;

  @Prop({type: Array as PropType<RadioOption[]>, required: true})
  public options!: RadioOption[];

  public innerValue: string | number = '';

  public mounted(): void {
    this.setInitialValue();
  }

  setNewOptionValue(optionValue: string): void {
    this.innerValue = optionValue;
    this.$emit('input', this.innerValue);
    this.$emit('change');
  }

  @Watch('value')
  public setInitialValue(): void {
    this.innerValue = this.value;
  }
}
</script>

<style lang="scss">
.radio-group {
  $inactive-color: #E0E5E7;
  $active-color: #FF6900;

  box-sizing: border-box;
  display: inline-flex;
  flex-direction: column;

  .input-radio-block {
    margin-top: 1.5rem;
    position: relative;
    display: flex;
    align-items: center;

    &:hover input[type="radio"]:not(:checked) + span.radio:after {
      height: 0.5rem;
      width: 0.5rem;
      background-color: $inactive-color;
    }

    input[type="radio"]:checked + span.radio:before {
      border-color: $active-color;
    }

    input[type="radio"]:checked + span.radio:after {
      height: 0.75rem;
      width: 0.75rem;
      background-color: $active-color;
    }

    &:first-child {
      margin-top: 0;
    }

    input[type="radio"] {
      cursor: pointer;
      display: inline-flex;
      height: 100%;
      left: 0;
      opacity: 0;
      position: absolute;
      width: 100%;
    }

    span.radio,
    label {
      display: inline-flex;
      align-items: center;
      cursor: pointer;
    }

    span.radio {
      height: 1rem;
      pointer-events: none;
      position: absolute;
      width: 1rem;
      cursor: pointer;
      top: 50%;
      transform: translateY(-50%);

      &:before,
      &:after {
        border-radius: 50%;
        content: " ";
        left: 50%;
        position: absolute;
        top: 50%;
        transform: translate3d(-50%, -50%, 0);
        transition: border-color 0.3s, background-color 0.3s, height 0.3s, width 0.3s;
      }

      &:before {
        border: 2px solid $inactive-color;
        height: 100%;
        width: 100%;
      }

      &:after {
        height: 0;
        width: 0;
      }
    }

    label {
      font-weight: normal;
      line-height: 1;
      margin: 0;
      padding-left: 1.5rem;
      cursor: pointer;
    }
  }
}
</style>
