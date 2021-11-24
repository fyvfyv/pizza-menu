<template>
  <div class="step-1">
    <div class="container">
      <RadioGroup
        :options="pizzaSizeOptions"
        :value="pizzaSize"
        @input="changeSize"
      />

      <PizzaImage :size="pizzaSize" />
    </div>

    <Button
      type="button"
      @click="nextStep"
    >
      Choose toppings
    </Button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import RadioGroup from '@/components/RadioGroup.vue';
import {Size} from '@/models/size';
import {SizePrice} from '@/models/size-price';
import {RadioOption} from '@/components/radio-option';
import Button from '@/components/Button.vue';
import PizzaImage from '@/components/PizzaImage.vue';

@Component({
  components: {PizzaImage, Button, RadioGroup},
  data: () => ({
    Size,
  }),
})
export default class Step1 extends Vue {
  public pizzaSize = this.$store.state.currentOrder.size || Size.Small;

  public getSizeLabelText(size: Size): string {
    return `${size}: ${SizePrice[size]}$`
  }

  public get pizzaSizeOptions(): RadioOption[] {
    return [
      {
        text: this.getSizeLabelText(Size.Small),
        value: Size.Small
      },
      {
        text: this.getSizeLabelText(Size.Medium),
        value: Size.Medium
      },
      {
        text: this.getSizeLabelText(Size.Large),
        value: Size.Large
      },
      {
        text: this.getSizeLabelText(Size.ExtraLarge),
        value: Size.ExtraLarge
      }
    ];
  }

  public changeSize(size: Size): void {
    this.pizzaSize = size;
  }

  public nextStep(): void {
    this.$store.commit('currentOrder/updateSize', this.pizzaSize);
    this.$emit('next-step');
  }
}

</script>

<style lang="scss" scoped>
.step-1 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .container {
    min-width: 29rem;
    height: 17.5rem;
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
  }
}
</style>
