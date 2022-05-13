import { createStore } from "vuex";

export default createStore({
  state: {
    totalOfMoney: 100000000000,
    cart: [],
  },
  getters: {
    getTotalOfMoney(state) {
      return state.totalOfMoney;
    },
    getCart(state) {
      return state.cart;
    },
  },
  mutations: {
    addTotalOfMoney(state, value) {
      state.totalOfMoney += value;
    },
    subTotalOfMoney(state, value) {
      state.totalOfMoney -= value;
    },
    pushItemToCart(state, value) {
      state.cart.push(value);
    },
    removeItemFromCart(state, id) {
      state.cart.splice(id, 1);
    },
  },
  actions: {
    addItemToCart({ commit, state }, item) {
      let hasItem = false;
      state.cart.forEach((element) => {
        if (element.id === item.id) {
          element.quantity += 1;
          hasItem = true;
        }
      });
      if (!hasItem) {
        commit("pushItemToCart", {
          ...item,
          quantity: 1,
        });
      }
      commit("subTotalOfMoney", item.price);
    },
    changeItemAmountCart({ commit, state }, data) {
      let hasItem = false;
      state.cart.forEach((element) => {
        if (element.id === data.item.id) {
          commit("addTotalOfMoney", data.item.price * element.quantity);
          element.quantity = data.quantity;
          hasItem = true;
        }
      });
      if (!hasItem) {
        commit("pushItemToCart", {
          ...data.item,
          quantity: data.quantity,
        });
      }

      commit("subTotalOfMoney", data.item.price * data.quantity);
    },
    removeItemToCart({ commit, state }, item) {
      state.cart.forEach((element) => {
        if (element.id === item.id) {
          element.quantity -= 1;
          commit("addTotalOfMoney", item.price);
        }
      });
    },
  },
});
