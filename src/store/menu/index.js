const state = {
  cartItems: [],
};

const getDefaultState = () => {
  return {
    cartItems: [],
  };
};

const actions = {
  addToOrder({ commit, dispatch }, payload) {
    // console.log("addToOrder action");
    let cartItem = {
      // id: payload.item.id,
      name: payload.item.name,
      description: payload.item.description,
      vegan: payload.item.vegan,
      price: payload.option.price,
      size: payload.option.size,
      quantity: 1,
    };

    commit("addPizzaToOrder", cartItem);

    dispatch(
      "snackbarModule/showSuccess",
      {
        message: "Pizza added to the order",
      },
      { root: true }
    );
  },
  deleteFromOrder({ commit, dispatch }, payload) {
    let cartItem = {
      // id: payload.item.id,
      name: payload.item.name,
      description: payload.item.description,
      vegan: payload.item.vegan,
      price: payload.option.price,
      size: payload.option.size,
      quantity: 1,
    };

    commit("deletePizzaFromOrder", cartItem);

    dispatch(
      "snackbarModule/showWarning",
      {
        message: "Pizza deleted from order",
      },
      { root: true }
    );
  },
  increaseQuantity({ commit, dispatch }, payload) {
    let cartItem = {
      // id: payload.item.id,
      name: payload.item.name,
      description: payload.item.description,
      vegan: payload.item.vegan,
      price: payload.item.price,
      size: payload.item.size,
      quantity: 1,
    };

    commit("addPizzaToOrder", cartItem);

    dispatch(
      "snackbarModule/showSuccess",
      {
        message: "Pizza added to the order",
      },
      { root: true }
    );
  },

  decreaseQuantity({ commit, dispatch }, payload) {
    let cartItem = {
      // id: payload.item.id,
      name: payload.item.name,
      description: payload.item.description,
      vegan: payload.item.vegan,
      price: payload.item.price,
      size: payload.item.size,
      quantity: 1,
    };

    commit("deletePizzaFromOrder", cartItem);

    dispatch(
      "snackbarModule/showWarning",
      {
        message: "Pizza deleted from order",
      },
      { root: true }
    );
  },

  resetCartState({ commit, dispatch }) {
    commit("resetCart");

    dispatch(
      "snackbarModule/showWarning",
      {
        message: "Cart is clear",
      },
      { root: true }
    );
  },
};
const mutations = {
  addPizzaToOrder(state, payload) {
    // console.log("addPizzaToOrder mutation");
    const pizzaName = payload.name;
    const pizzaSize = payload.size;

    let existingPizzas = [...state.cartItems];

    const alreadyInCartPizza = existingPizzas.find(
      (pizza) => pizza.name == pizzaName && pizza.size == pizzaSize
    );

    if (alreadyInCartPizza) {
      existingPizzas = existingPizzas.map((pizza) => {
        if (pizza.name == pizzaName && pizza.size == pizzaSize) {
          return { ...pizza, quantity: pizza.quantity + 1 };
        } else {
          return pizza;
        }
      });
    } else {
      existingPizzas.push(payload);
    }

    state.cartItems = existingPizzas;
  },

  deletePizzaFromOrder(state, payload) {
    const pizzaName = payload.name;
    const pizzaSize = payload.size;

    let existingPizzas = [...state.cartItems];

    const alreadyInCartPizza = existingPizzas.find(
      (pizza) => pizza.name == pizzaName && pizza.size == pizzaSize
    );

    if (alreadyInCartPizza) {
      existingPizzas = existingPizzas.map((pizza) => {
        if (pizza.name == pizzaName && pizza.size == pizzaSize) {
          return { ...pizza, quantity: pizza.quantity - 1 };
        } else {
          return pizza;
        }
      });
    }

    let remainingPizzas = existingPizzas.filter((pizza) => pizza.quantity !== 0);

    state.cartItems = remainingPizzas;
  },
  resetCart(state) {
    Object.assign(state, getDefaultState());
  },
};
const getters = {
  getAllCartItems(state) {
    return state.cartItems;
  },
  getCartItemsNumber(state) {
    const cartItemsNumber = state.cartItems.reduce((a, b) => a + b.quantity, 0);
    return cartItemsNumber;
  },
  cartTotalPrice: (state, getters) => {
    return getters.getAllCartItems.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  },
};

export const menuModule = {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
