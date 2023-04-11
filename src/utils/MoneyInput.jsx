import NumberFormat from "react-number-format";

function MoneyInput() {
  return (
    <NumberFormat
      thousandSeparator={"."}
      decimalSeparator={","}
      prefix={"R$ "}
      decimalScale={2}
      fixedDecimalScale={true}
      allowNegative={false}
      type="text"
    />
  );
}

export default MoneyInput;
