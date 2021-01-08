const state = {
  snackbar: {
    show: false,
    message: `It's alive`,
    timeout: 2000,
    color: "green",
  },
};

const actions = {
  showSuccess({ commit }, payload) {
    // console.log("action showSuccess");
    commit("setSuccessSnackBar", payload);
  },
  addToOrder({ commit }, payload) {
    commit("setSuccessSnackBar", payload);
  },
  showError({ commit }, error) {
    commit("showError", error.message);
  },
  showWarning({ commit }, message) {
    // console.log("showWarning action");
    commit("showWarning", message);
  },
  hide({ commit }) {
    commit("hide");
  },
};

const mutations = {
  setSuccessSnackBar(state, payload) {
    // console.log("mutation showSuccess");

    state.snackbar = {
      ...state.snackbar,
      show: true,
      message: payload.message,
      timeout: 1500,
      color: "light-green",
    };
  },
  showWarning(state, payload) {
    // console.log("showWarning mutation");

    state.snackbar = {
      ...state.snackbar,
      show: true,
      message: payload.message,
      timeout: 3000,
      color: "orange-light1",
    };
  },

  showError(state, message) {
    state.snackbar = {
      ...state.snackbar,
      show: true,
      message,
      timeout: 0,
      color: "deep-orange",
    };
  },

  hide(state) {
    state.snackBar = {
      ...state.snackbar,
      show: false,
      message: "",
      timeout: 2000,
      color: "light-green",
    };
  },
};

const getters = {
  getSnackbar(state) {
    return state.snackbar;
  },
};

export const snackBar = {
  state,
  actions,
  mutations,
  getters,
  namespaced: true,
};
