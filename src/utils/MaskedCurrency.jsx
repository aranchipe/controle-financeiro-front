import InputMask from "react-input-mask";

const onlyNumbers = (str) => str.replace(/[^0-9]/g, "");

export function MaskedCurrency({ name, value, onChange, placeholder }) {
  function handleChange(e) {
    onChange({
      ...e,
      target: {
        ...e.target,
        name,
        value: onlyNumbers(e.target.value),
      },
    });
  }

  return (
    <InputMask
      name={name}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
}
