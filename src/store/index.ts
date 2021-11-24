import Vue from 'vue'
import Vuex from 'vuex'
import {orders} from '@/store/modules/orders';
import {currentOrder} from '@/store/modules/currentOrder';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    currentOrder,
    orders,
  }
})
