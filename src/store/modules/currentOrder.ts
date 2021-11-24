import {Topping} from '@/models/topping';
import {Size} from '@/models/size';

export interface Customer {
  name: string,
  phone: string,
  address: string,
}

export interface Order {
  toppings: Topping[],
  customer: Customer,
  size: Size,
}

export const currentOrder = {
  namespaced: true,
  state: (): Order => ({
    toppings: [],
    customer: {
      name: '',
      phone: '',
      address: '',
    },
    size: Size.Small,
  }),
  mutations: {
    updateToppings(state: Order, toppings: Topping[]): void {
      state.toppings = toppings;
    },
    updateCustomer(state: Order, customer: Customer): void {
      state.customer = customer;
    },
    updateSize(state: Order, size: Size): void {
      state.size = size;
    },
  },
}
