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
      if (!hasItemOnCart(getters.getCart, payload.id)) {
        commit("pushItemToCart", {
          ...payload,
          amount: 1,
        });
      } else {
        const ItemIdOnCart = getItemIdOnCart(getters.getCart, payload.id);
        commit("increaseItemQuantity", {
          id: ItemIdOnCart,
          quantity: 1,
        });
      }
    },
    removeOneItem({ commit, getters }, payload) {
      const ItemIdOnCart = getItemIdOnCart(getters.getCart, payload.id);
      commit("decrementItemQuantity", {
        id: ItemIdOnCart,
        quantity: 1,
      });
    },
    changeAmountOfItem({ commit, getters }, payload) {
      const currentMoney = getters.getMoney;
      const hasItem = hasItemOnCart(getters.getCart, payload.item.id);
      const itemOnCart = getItemFromCart(getters.getCart, payload.item.id);
      const ItemIdOnCart = getItemIdOnCart(getters.getCart, payload.item.id);
      const canPay = currentMoney >= payload.item.price * payload.quantity;
      let possibleAmount = 0;

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
        if (possibleAmount === 0) {
          return possibleAmount;
        }
      }

      if (hasItem) {
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

      if (possibleAmount != payload.quantity) {
        console.log(possibleAmount);
        return possibleAmount;
      }

      return "sucess";
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
