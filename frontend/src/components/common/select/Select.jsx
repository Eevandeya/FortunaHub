import { memo } from 'react';
import './select.css';

const Select = memo(({ options, value, defaultValue, onChange, name }) => {
    return (
        <select
            className='select-fixed'
            name={name}
            value={value}
            onChange={(event) => onChange(event.target.value)}>
            <option disabled value=''>
                {defaultValue}
            </option>
            {options.map((date, index) => (
                <option value={date} label={date} key={index}></option>
            ))}
        </select>
    );
});

export default Select;
