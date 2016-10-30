import React from 'react';
import { reduxForm, Field, getFormValues } from 'redux-form';
import { validate, warn, asyncValidate } from './validate';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        formValues: getFormValues('FormName')(state)
    }
}

const renderField = (field) => {
    const { input, label, type, meta: { touched, error, warning, asyncValidating } } = field;

    const groupFeedback = !touched ? "" : error ? " has-danger" : warning ? " has-warning" : "";
    const inputFeedback = !touched ? "" : error ? " form-control-danger" : warning ? " form-control-warning" : "";
    const validating = asyncValidating ? " loadinggif" : "";

    return (
        <div className={`form-group${groupFeedback}`}>
            <label htmlFor={input.name}>{label}</label>
            <input {...input} className={`form-control${inputFeedback}${validating}`} placeholder={label} type={type}/>
            {touched && (error || warning) && (<div className="form-control-feedback">{error}{warning}</div>)}
        </div>
    )
}

const Form = (props) => {
    const { handleSubmit, submitting, pristine, reset, error, formValues } = props;
    return (
        <div>
            <fieldset>
                <legend>
                    Register Form
                </legend>
                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}
                <form noValidate onSubmit={handleSubmit}>
                    <Field type="text" name="username" component={renderField} label="User Name" />
                    <Field type="email" name="email" component={renderField} label="Email" />
                    <Field type="text" name="age" component={renderField} label="Age" />

                    <button type="submit" className="btn btn-primary" disabled={submitting}>Submit</button>
                    <button type="button" className="btn btn-default" disabled={pristine || submitting} onClick={reset}>Clear</button>
                </form>
            </fieldset>
            <fieldset>
                <legend>
                    Values
                </legend>
                <pre>
                {JSON.stringify(props, null, 2)}
                </pre>
            </fieldset>
        </div>
    )
}

export default connect(mapStateToProps)(reduxForm({
    form: 'FormName',
    validate,
    warn,
    asyncValidate,
    asyncBlurFields: [ 'email' ]
})(Form))