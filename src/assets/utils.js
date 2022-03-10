export const currencyFormat = (x) => {
  return x.toLocaleString('en');
};

export const colorCheck = (num, theme) => {
  if (theme) {
    if (num >= 0) {
      return '#388e3c';
    } else {
      return '#d32f2f';
    }
  } else {
    if (num >= 0) {
      return '#66bb6a';
    } else {
      return '#f44336';
    }
  }
};
