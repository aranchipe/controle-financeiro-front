function amountFormat(value) {
  value = String(value).replace(/^(0+)/g, "");
  value = value.replace(/[^\w\s]|\s|[A-Z]/gi, "");
  const len = value.length;

  if (len === 1) {
    value = value.replace(/(\d)/, "0,0$1");
  } else if (len === 2) {
    value = value.replace(/(\d)/, "0,$1");
  } else if (len > 2) {
    value = value.replace(/(\d{2})$/, ",$1");
  }

  if (len === 6) {
    value = value.replace(/(\d{1})/, "$1.");
  } else if (len === 7) {
    value = value.replace(/(\d{2})/, "$1.");
  } else if (len === 8) {
    value = value.replace(/(\d{3})/, "$1.");
  } else if (len === 9) {
    value = value.replace(/(\d{1})(\d{3})/, "$1.$2.");
  } else if (len === 10) {
    value = value.replace(/(\d{2})(\d{3})/, "$1.$2.");
  } else if (len === 11) {
    value = value.replace(/(\d{3})(\d{3})/, "$1.$2.");
  } else if (len === 12) {
    value = value.replace(/(\d{1})(\d{3})(\d{3})/, "$1.$2.$3.");
  } else if (len === 13) {
    value = value.replace(/(\d{2})(\d{3})(\d{3})/, "$1.$2.$3.");
  }

  return value;
}

export { amountFormat };
