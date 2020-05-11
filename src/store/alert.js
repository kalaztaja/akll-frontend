const alertStore = {
  state: {
    alertText: '',
    alertType: '',
    loading: false
  },
  mutations: {
    setError(state, text) {
      //Type 0 = success
      //Type 1 = info
      //Type 2 = alert
      //Type 3 = custom

      state.alertType = '2';
      state.alertText = text;
    },
    clearErrorText(state) {
      state.alertText = '';
      state.alertType = '';
    },
    setInfo(state, text) {
      state.alertText = text;
      state.alertType = '1';
    },
    setSuccess(state, text) {
      state.alertText = text;
      state.alertType = '0';
    },
    setLoading(state) {
      state.loading = true;
    },
    stopLoading(state) {
      state.loading = false;
    }
  },
  getters: {
    getAlertText: state => {
      return state.alertText;
    },
    getAlertType: state => {
      return state.alertType;
    },
    getLoading: state => {
      return state.loading;
    }
  },
  actions: {
    setAlertError(context, text) {
      context.commit('setError', text);
    },
    clearError(context) {
      context.commit('clearErrorText');
    },
    setAlertInfo(context, text) {
      context.commit('setInfo', text);
    },
    setAlertSuccess(context, text) {
      context.commit('setSuccess', text);
    },
    startLoading(context) {
      context.commit('setLoading');
    },
    stopLoading(context) {
      context.commit('stopLoading');
    }
  }
};

export default alertStore;
