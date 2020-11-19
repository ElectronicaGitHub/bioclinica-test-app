import React, { useState, ChangeEvent } from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import {  FormBuilderProps } from '../FormBuilder/FormBuilder.component';

const FBTextInput = ({ fbElement, handleChange }: FormBuilderProps) => {
    const [value, setValue] = useState(fbElement.defaultValue||false);
    const checked = !!fbElement.defaultValue;

    const onLocalChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(!value);
        handleChange(e);
    }

    return <>
        <FormControlLabel label={
            fbElement.label + (fbElement.required ? <span className="asterisk">*</span> : '')
        } control={
            <Checkbox checked={value} onChange={onLocalChange} name={fbElement.key}></Checkbox>
        }></FormControlLabel>
        
    </>
}
export default FBTextInput;