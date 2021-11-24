<template>
<div class="summary">
  <div class="container">
    <div class="fields">
      <p class="field">
        <b>Pizza size: </b>
        <span>{{ pizzaSize }} —</span>
        <span>{{ SizePrice[pizzaSize] }}$</span>
      </p>
      <p class="field toppings">
        <b>Toppings: </b>
        <span>{{ toppings }}</span>
      </p>
      <p class="field">
        <span class="subfield">
          <b>Name: </b>
          <span>{{ name }}</span>
        </span>
        <span class="subfield">
          <b>Address: </b>
          <span>{{ address }}</span>
        </span>
        <span class="subfield">
          <b>Phone: </b>
          <span>{{ phone }}</span>
        </span>
      </p>

      <p class="field">
        <span class="subfield">
          <b>VAT (15%): </b>
          <span>{{ vat }}</span>
        </span>
        <span class="subfield">
          <b>Total: </b>
          <b>{{ totalPrice }}</b>
        </span>
      </p>
    </div>

    <PizzaImage :size="pizzaSize" />
  </div>

  <Button
    @click="reload"
  >
    Start again
  </Button>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {Size} from '@/models/size';
import {SizePrice} from '@/models/size-price';
import {Topping} from '@/models/topping';
import {ToppingPrice} from '@/models/topping-price';
import PizzaImage from '@/components/PizzaImage.vue';
import Button from '@/components/Button.vue';

@Component({
  components: {Button, PizzaImage},
  data: () => ({
    Size,
    SizePrice,
  })
})
export default class Summary extends Vue {
  public vat = 0;
  public totalPrice = 0;

  public mounted(): void {
    this.countPrice();
  }

  public get pizzaSize(): Size {
    return this.$store.state.currentOrder.size;
  }

  public get toppings(): Topping[] {
    return this.$store.state.currentOrder.toppings.join(', ').toLowerCase();
  }

  public get name(): string {
    return this.$store.state.currentOrder.customer.name;
  }

  public get address(): string {
    return this.$store.state.currentOrder.customer.address;
  }

  public get phone(): string {
    return this.$store.state.currentOrder.customer.phone;
  }

  public countPrice(): void {
    const sizePrice = SizePrice[this.pizzaSize];
    const toppings = this.$store.state.currentOrder.toppings as Topping[];
    let toppingsPrices = toppings.map((topping) => ToppingPrice[topping]);
    console.log(toppingsPrices)
    const howManyFreeToppings = Math.floor(toppingsPrices.length / 3);
    console.log({...toppingsPrices}, howManyFreeToppings)
    toppingsPrices = toppingsPrices.sort().slice(howManyFreeToppings);
    console.log(toppingsPrices);
    const toppingTotalPrice = toppingsPrices.reduce((total, price) => {
      total += price;
      return total;
    }, 0);

    let tempTotal = sizePrice + toppingTotalPrice;

    this.vat = Math.floor(tempTotal * 0.15 * 100) / 100;
    this.totalPrice = tempTotal + this.vat;
  }

  public reload(): void {
    const newUrl = new URL(window.location.href);
    window.location.href = newUrl.href;
  }
}
</script>

<style lang="scss" scoped>
.summary {
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

    .fields {
      display: flex;
      flex-direction: column;
    }

    .toppings {
      max-width: 20rem;
    }

    .subfield {
      display: block;
    }

    img {
      flex-shrink: 0;
    }
  }
}
</style>
