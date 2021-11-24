<template>
  <div class="order">
    <h1>{{ stepTitle }}</h1>

    <div
      v-if="currentStep === 2"
      class="helper"
    >
      There are some rules, which you should follow in your order:
      <ul>
        <li>You can choose up to 6 toppings.</li>
        <li>For each 2 topping the user get the third for free (the cheapest).</li>
        <li>You can’t choose Bacon and Mozzarella for the same pizza.</li>
      </ul>
    </div>

    <Step1
      v-if="currentStep === 1"
      @next-step="nextStep"
    />

    <Step2
      v-if="currentStep === 2"
      @next-step="nextStep"
      @prev-step="prevStep"
    />

    <Step3
      v-if="currentStep === 3"
      @next-step="nextStep"
      @prev-step="prevStep"
    />

    <Summary v-if="currentStep === 4" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import RadioGroup from '@/components/RadioGroup.vue';
import Button from '@/components/Button.vue';
import Checkbox from '@/components/Checkbox.vue';
import Input from '@/components/Input.vue';
import Step1 from '@/components/steps/Step1.vue';
import Step2 from '@/components/steps/Step2.vue';
import Step3 from '@/components/steps/Step3.vue';
import Summary from '@/components/steps/Summary.vue';

const STEP_TITLES = [
  'Choose your pizza size',
  'Choose toppings',
  'Customer details',
  'Summary'
];

@Component({
  components: {Summary, Step3, Step2, Step1, Input, Checkbox, Button, RadioGroup},
})
export default class Order extends Vue {
  public currentStep = 1;

  public get stepTitle(): string {
    return STEP_TITLES[this.currentStep - 1];
  }

  public nextStep(): void {
    if (this.currentStep === 4) return;
    this.currentStep += 1;
  }

  public prevStep(): void {
    if (this.currentStep === 1 || this.currentStep === 4) return;
    this.currentStep -= 1;
  }
}
</script>

<style lang="scss" scoped>
.order {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    text-align: center;
  }
}
</style>
