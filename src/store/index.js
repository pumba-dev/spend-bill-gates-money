import { createStore } from "vuex";

const TotalGatesMoney = 100000000000;

export default createStore({
  state: {
    cart: [],
    money: TotalGatesMoney,
  },
  getters: {
    getMoney(state) {
      let money = TotalGatesMoney;

      state.cart.forEach((item) => {
        money -= item.price * item.amount;
      });
      return money;
    },
    getCart(state) {
      return state.cart.sort((a, b) => {
        return a.price - b.price;
      });
    },
    getTotalCostCart(state) {
      let total = 0;
      state.cart.forEach((item) => {
        total += item.price * item.amount;
      });
      return total;
    },
  },
  mutations: {
    pushItemToCart(state, value) {
      state.cart.push(value);
    },
    removeItemFromCart(state, id) {
      state.cart.splice(id, 1);
    },
    increaseItemQuantity(state, value) {
      state.cart[value.id].amount += value.quantity;
    },
    decrementItemQuantity(state, value) {
      state.cart[value.id].amount -= value.quantity;
    },
    changeItemAmount(state, value) {
      state.cart[value.id].amount = value.quantity;
    },
  },
  actions: {
    addOneItem({ commit, getters }, payload) {
      const ItemIdOnCart = getItemIdOnCart(getters.getCart, payload.id);

      if (hasItemOnCart(getters.getCart, payload.id)) {
        commit("increaseItemQuantity", {
          id: ItemIdOnCart,
          quantity: 1,
        });
      } else {
        commit("pushItemToCart", {
          ...payload,
          amount: 1,
        });
      }
    },
    removeOneItem({ commit, getters }, payload) {
      const ItemIdOnCart = getItemIdOnCart(getters.getCart, payload.id);
      const ItemOnCart = getItemFromCart(getters.getCart, payload.id);

      if (ItemOnCart.amount == 1) {
        commit("removeItemFromCart", ItemIdOnCart);
      } else {
        commit("decrementItemQuantity", {
          id: ItemIdOnCart,
          quantity: 1,
        });
      }
    },
    changeAmountOfItem({ commit, getters }, payload) {
      const currentMoney = getters.getMoney;
      const hasItem = hasItemOnCart(getters.getCart, payload.item.id);
      const itemOnCart = getItemFromCart(getters.getCart, payload.item.id);
      const ItemIdOnCart = getItemIdOnCart(getters.getCart, payload.item.id);
      const canPay = currentMoney >= payload.item.price * payload.quantity;
      let possibleAmount = 0;

      // Checking how many items can be purchased
      // If the amount is not possible, it will be set to the maximum possible
      if (canPay) {
        possibleAmount = payload.quantity;
      } else {
        if (hasItem) {
          possibleAmount = Math.floor(
            (currentMoney + itemOnCart.price * itemOnCart.amount) /
              payload.item.price
          );
        } else {
          possibleAmount = Math.floor(currentMoney / payload.item.price);
        }
      }

      if (possibleAmount == 0) {
        commit("removeItemFromCart", ItemIdOnCart);
      } else if (hasItem) {
        commit("changeItemAmount", {
          id: ItemIdOnCart,
          quantity: possibleAmount,
        });
      } else {
        commit("pushItemToCart", {
          ...payload.item,
          amount: possibleAmount,
        });
      }

      return possibleAmount;
    },
  },
});

function getItemFromCart(cart, itemId) {
  return cart.find((item) => item.id === itemId);
}

function getItemIdOnCart(cart, itemId) {
  let index = "error";
  cart.forEach((item, i) => {
    if (item.id == itemId) {
      index = i;
    }
  });
  return index;
}

function hasItemOnCart(array, id) {
  return array.find((item) => item.id === id);
}
