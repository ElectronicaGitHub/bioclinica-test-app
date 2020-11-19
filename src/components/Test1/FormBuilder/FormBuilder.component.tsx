import React from 'react';
import formBuilderDataJson from '../../../assets/form_builder_config.json'
import { FormControl, Button } from '@material-ui/core';
import {Formik, FormikProps, Form, Field} from 'formik';
import * as Yup from 'yup';
import classNames from 'classnames';

import './FormBuilder.scss';
import FBTextInput from '../FormBuilderElements/FBTextInput';
import FBSelect from '../FormBuilderElements/FBSelect';
import FBRadioButtons from '../FormBuilderElements/FBRadioButtons';
import FBCheckboxMultiple from '../FormBuilderElements/FBCheckboxMultiple';
import FBCheckboxSingle from '../FormBuilderElements/FBCheckboxSingle';

export interface FormBuilderElement {
    type: string;
    label: string;
    key: string;
    required?: boolean;
    options?: FormBuilderOption[];
    defaultValue?:any;
}

export interface FormBuilderOption {
    key: string;
    label: string;
}

export interface FormBuilderProps {
    fbElement : FormBuilderElement;
    handleChange : Function;
    setFieldValue? : Function;
}

const FormBuilderFactory = (handleChange: Function, setFieldValue:Function, formElement:FormBuilderElement) => { 
    var control;
    
    switch (formElement.type) {
        case "​checkbox_single":  
            control = <FBCheckboxSingle
                fbElement={formElement}
                handleChange={handleChange}
            ></FBCheckboxSingle>
            break;
            
        case "checkbox_multiple":
            control = <FBCheckboxMultiple
                fbElement={formElement}
                handleChange={handleChange}
            ></FBCheckboxMultiple>
            break;  
        case "text":
            control = <FBTextInput 
                handleChange={handleChange}
                fbElement={formElement}
                setFieldValue={setFieldValue}
            ></FBTextInput>
            break;
        case "radio":
            control = <FBRadioButtons 
                fbElement={formElement} 
                handleChange={handleChange}
            ></FBRadioButtons>
            break;
        case "select":
            control = <FBSelect 
                fbElement={formElement} 
                handleChange={handleChange}
            ></FBSelect>
            break;
        default:
            break;
    }

    return <div key={formElement.key}>
        <FormControl key={formElement.key}>
            {control}
        </FormControl>
    </div>
}

const FormBuilder:React.FC = () => {

    const initialValues: { [k: string]: any } = {};
    const formBuilderData: FormBuilderElement[] = formBuilderDataJson;
    const formDataFieldsTypes: { [k: string]: any } = {
        text : 'string',
        radio : 'string',
        select : 'string',
        checkbox_multiple : 'array',
        checkbox_single : 'boolean'
    }
    let validationObject:{[k:string]:any} = {};
    formBuilderData
    .filter((el:FormBuilderElement) => el.required)
    .map((el: FormBuilderElement) => {
        const type:string = formDataFieldsTypes[el.type];
        validationObject[el.key] = (Yup as any)[type]().required('Required field');
        if (el.defaultValue) {
            initialValues[el.key] = el.defaultValue;
        }
        return true;
    });
    const fbValidationSchema = Yup.object().shape(validationObject);

    return <Formik
        initialValues={initialValues}
        validationSchema={fbValidationSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values) => {
            alert(JSON.stringify(values, null, 2));
        }}>
        {({handleChange, setFieldValue, errors}: FormikProps<any>) => (
            <Form>
                {formBuilderData.map((form_element:FormBuilderElement) => {
                    const field_classes = classNames({
                        'field-wrapper' : true,
                        'with-error': errors[form_element.key]
                    })
                    return <div className={field_classes} key={form_element.key}>
                        <Field>
                            {() => FormBuilderFactory(handleChange, setFieldValue, form_element)}
                        </Field>
                        {errors[form_element.key] ? (
                            <div className="error-message">{errors[form_element.key]}</div>
                        ) : null}
                    </div>
                })}
                <div className="button-container">
                    <Button type="submit" variant="contained" color="primary">Submit</Button>
                </div>
            </Form>
        )}
    </Formik>
}
export default FormBuilder;
