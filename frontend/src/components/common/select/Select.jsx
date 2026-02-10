import { memo } from 'react';
import './select.css';

const Select = memo(({ options, value, defaultValue, onChange }) => {
    return (
        <select
            className='select-fixed'
            name='date'
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
