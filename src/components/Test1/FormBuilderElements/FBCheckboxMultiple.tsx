import React, {ChangeEvent, useState} from 'react';
import { FormControlLabel, Checkbox,FormLabel, FormGroup } from '@material-ui/core';
import { FormBuilderOption, FormBuilderProps } from '../FormBuilder/FormBuilder.component';

const FBCheckboxMultiple = ({ fbElement, handleChange }: FormBuilderProps) => {

    const [value, setValue] = useState(fbElement.defaultValue||[]);

    const onLocalChange = (e:ChangeEvent<HTMLInputElement>) => {
        const index = value.indexOf(e.target.value);
        if (index > -1) {
            let _value = value.slice();
            _value.splice(index, 1);
            setValue(_value);
        } else {
            setValue([...value, e.target.value]);
        }
        
        handleChange(e);
    }
    const options = fbElement.options && fbElement.options.map((option: FormBuilderOption) => {
        const checked = value.indexOf(option.key) > -1;
        
        return <FormControlLabel 
            key={option.key}
            label={option.label}
            control={
                <Checkbox 
                    checked={checked}
                    value={option.key} 
                    name={fbElement.key} 
                    onChange={onLocalChange} />
            }></FormControlLabel>
    });
    return <>
        <FormLabel>
            {fbElement.label}
            {fbElement.required ? <span className="asterisk">*</span> : null}
            </FormLabel>
        <FormGroup>
            {options}
        </FormGroup>
    </>
}

export default FBCheckboxMultiple;