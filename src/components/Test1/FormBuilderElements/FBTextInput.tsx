import React, { useState, ChangeEvent } from 'react';
import {FormLabel, TextField} from '@material-ui/core';
import { FormBuilderProps } from '../FormBuilder/FormBuilder.component';

const FBTextInput = ({ fbElement, handleChange, setFieldValue }: FormBuilderProps) => {
    const [value, setValue] = useState(fbElement.defaultValue||'');

    const onLocalChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }
    const onLocalBlur = () => {
        setFieldValue && setFieldValue(fbElement.key, value);
    }
    return <>
        <FormLabel>
            {fbElement.label}
            {fbElement.required ? <span className="asterisk">*</span> : null}
        </FormLabel>
        <TextField
            onChange={onLocalChange}
            onBlur={onLocalBlur}
            value={value}
            
            name={fbElement.key} />
        </>
}
export default FBTextInput;