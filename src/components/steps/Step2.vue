<template>
  <div class="step-2">
    <div class="container">
      <Checkbox
        v-for="(topping, index) in toppings"
        :key="index"
        :label="topping"
        :context="topping"
        :value="chosenToppings[topping]"
        :readonly="isToppingBlocked(topping)"
        @input="chooseTopping"
      />
    </div>

    <div class="footer">
      <Button @click="prevStep">
        Change size
      </Button>

      <Button @click="nextStep">
        Set customer info
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import RadioGroup from '@/components/RadioGroup.vue';
import Button from '@/components/Button.vue';
import {Topping} from '@/models/topping';
import Checkbox from '@/components/Checkbox.vue';

@Component({
  components: {Checkbox, Button, RadioGroup},
})
export default class Step2 extends Vue {
  public chosenToppings = Object.keys(Topping).reduce(
    (acc, topping) => {
      acc[topping] = this.previouslyAddedToppings.includes(topping as Topping);
      return acc;
    },
    {} as Record<string, boolean>,
  );

  public get previouslyAddedToppings(): Topping[] {
    return this.$store.state.currentOrder.toppings;
  }

  public get isToppingBlocked(): (topping: Topping) => boolean {
    return (topping: Topping) => {
      const chosenToppingsArr = this.chosenToppingsArr();

      return (chosenToppingsArr.length === 6 && !this.chosenToppings[topping]) ||
        (topping === Topping.Mozzarella && this.chosenToppings[Topping.Bacon]) ||
        (topping === Topping.Bacon && this.chosenToppings[Topping.Mozzarella])
    }
  }
  public get toppings(): Topping[] {
    return Object.values(Topping)
  }

  public chooseTopping(checked: boolean, context: string): void {
    this.$set(this.chosenToppings, context, checked);
  }

  public prevStep(): void {
    this.$emit('prev-step');
  }

  public chosenToppingsArr(): Topping[] {
    const toppings: Topping[] = [];
    Object.keys(this.chosenToppings).forEach((topping) => {
      if (this.chosenToppings[topping]) toppings.push(topping as Topping);
    });

    return toppings
  }

  public nextStep(): void {

    this.$store.commit('currentOrder/updateToppings', this.chosenToppingsArr());
    this.$emit('next-step');
  }
}

</script>

<style lang="scss" scoped>
.step-2 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1rem;
    margin-bottom: 1rem;
  }

  .footer {
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
