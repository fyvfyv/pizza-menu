<template>
  <div class="step-3">
    <div class="container">
      <Input
        ref="nameInput"
        v-model="name"
        id="name"
        label="Name"
        placeholder="Tony"
        :custom-validators="[validateName]"
        @error="setError"
      />

      <Input
        ref="addressInput"
        v-model="address"
        id="address"
        label="Address"
        placeholder="Stark"
        :custom-validators="[validateAddress]"
        @error="setError"
      />

      <Input
        ref="phoneInput"
        v-model="phone"
        id="phone"
        label="Phone"
        placeholder="+79112223344"
        :custom-validators="[validatePhone]"
        @error="setError"
      />
    </div>

    <div class="footer">
      <Button @click="prevStep">
        Change toppings
      </Button>

      <Button @click="nextStep">
        Make pizza!
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import RadioGroup from '@/components/RadioGroup.vue';
import Button from '@/components/Button.vue';
import Checkbox from '@/components/Checkbox.vue';
import {isValidPhoneNumber} from 'libphonenumber-js';
import Input from '@/components/Input.vue';

@Component({
  components: {Input, Checkbox, Button, RadioGroup},
})
export default class Step3 extends Vue {
  public name = this.$store.state.currentOrder.customer.name || '';
  public address = this.$store.state.currentOrder.customer.name || '';
  public phone = this.$store.state.currentOrder.customer.name || '';
  public hasErrors: boolean[] = [];

  public validateName(value: string): string {
    if (!value || !value.trim()) return 'You should fill the name';
    return '';
  }

  public validateAddress(value: string): string {
    if (!value || !value.trim()) return 'You should fill the address';
    if (value.trim().length < 10) return 'The address is too short (min 10 symbols)';
    return '';
  }

  public validatePhone(value: string): string {
    if (!value || !value.trim()) return 'You should fill the phone';
    if (!isValidPhoneNumber(value)) return 'The phone is invalid';
    return '';
  }

  public setError(event: {hasError: boolean, message: string}): void {
    this.hasErrors.push(event.hasError);
  }

  public prevStep(): void {
    this.$emit('prev-step');
  }

  public nextStep(): void {
    this.hasErrors = [];
    (this.$refs.nameInput as any).onBlur();
    (this.$refs.addressInput as any).onBlur();
    (this.$refs.phoneInput as any).onBlur();
    if (this.hasErrors.filter(Boolean).length) return;
    this.$store.commit('currentOrder/updateCustomer', {
      name: this.name,
      address: this.address,
      phone: this.phone,
    });
    this.$emit('next-step');
  }
}

</script>

<style lang="scss" scoped>
.step-3 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .container {
    display: grid;
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
