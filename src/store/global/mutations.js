export function LOADING(state, status) {
  state.isLoading = status;
}

export function CART(state, payload) {
  state.cart = payload;
}

// Alert
export function MESSAGES(state, { message, status, timestamp }) {
  state.messages.push({
    message,
    status,
    timestamp,
  });
}

export function REMOVEMESSAGEWITHTIMIMG(state, timestamp) {
  state.messages.forEach((item, i) => {
    if (item.timestamp === timestamp) {
      state.messages.splice(i, 1);
    }
  });
}

export function REMOVEMESSAGE(state, num) {
  state.messages.splice(num, 1);
}
