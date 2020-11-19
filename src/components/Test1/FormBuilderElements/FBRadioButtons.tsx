import React, { ChangeEvent, useState } from 'react';
import { FormControlLabel, FormLabel, RadioGroup, Radio } from '@material-ui/core';
import { FormBuilderOption, FormBuilderProps } from '../FormBuilder/FormBuilder.component';

const FBRadioButtons = ({ fbElement, handleChange }: FormBuilderProps) => {
    const [value, setValue] = useState(fbElement.defaultValue || '');

    const onLocalChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        handleChange(e);
    }
    var options = fbElement.options && fbElement.options.map((option: FormBuilderOption) => {
        return <FormControlLabel
            key={option.key}
            value={option.key}
            control={<Radio />}
            label={option.label} />
    });
    return <>
        <FormLabel>
            {fbElement.label}
            {fbElement.required ? <span className="asterisk">*</span> : null}
        </FormLabel>
        <RadioGroup
            onChange={onLocalChange}
            value={value}
            name={fbElement.key}>
            {options}
        </RadioGroup>
    </>
}

export default FBRadioButtons;