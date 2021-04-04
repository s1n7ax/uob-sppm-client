function Select({ defaultValue, values, onChange }) {
  let options = values.map((option) => {
    var isDefaultValue = defaultValue === (option.value ?? option.text);
    return (
      <option selected={isDefaultValue} value={option.value ?? option.text}>
        {option.text}
      </option>
    );
  });

  return <select onChange={onChange}>{options}</select>;
}

export default Select;
