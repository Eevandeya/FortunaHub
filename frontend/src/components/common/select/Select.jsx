const Select = ({ options, value, defaultValue, onChange }) => {
  return (
    <div className="select is-warning is-rounded">
      <select
        name="date"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        <option disabled value="">
          {defaultValue}
        </option>
        {options.map((date, index) => (
          <option value={date} label={date} key={index}></option>
        ))}
      </select>
    </div>
  );
};

export default Select;
