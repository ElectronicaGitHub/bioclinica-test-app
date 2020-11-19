import React, {useState, ChangeEvent} from 'react';
import { MenuItem, Select, FormLabel} from '@material-ui/core';
import { FormBuilderOption, FormBuilderProps } from '../FormBuilder/FormBuilder.component';

const FBSelect = ({ fbElement, handleChange }: FormBuilderProps) => {
    const [value, setValue] = useState(fbElement.defaultValue||'');

    const onLocalChange = (e: ChangeEvent<{value :unknown}>) => {
        setValue(e.target.value);
        handleChange(e);
    }
    const options = fbElement.options && fbElement.options.map((option: FormBuilderOption) => {
        return <MenuItem
            key={option.key}
            value={option.key}>
                {option.label}
        </MenuItem>
    });

    return <>
        <FormLabel>
            {fbElement.label}
            {fbElement.required ? <span className="asterisk">*</span> : null}
        </FormLabel>
        <Select
            value={value}
            onChange={onLocalChange}
            name={fbElement.key}>
            {options}
        </Select>
    </>
}

export default FBSelect;