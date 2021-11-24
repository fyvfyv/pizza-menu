import Order from '@/views/Order.vue';

export interface State {
  orders: Order[],
}

export const orders = {
  namespaced: true,
  state: (): State => ({
    orders: [],
  }),
  mutations: {
    addOrder(state: State, order: Order): void {
      state.orders = [...state.orders, order];
    }
  },
}
