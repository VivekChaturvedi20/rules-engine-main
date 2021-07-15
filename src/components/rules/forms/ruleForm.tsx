import React from 'react';
import { Button } from 'react-bootstrap';
import {
    Formik, Form, Field, ErrorMessage, yupToFormErrors
} from 'formik';
import { getContent } from '../../../utils/contentUtils';
import { validateContractDates } from '../../../utils/validationUtils';
import Switch from '../../inputs/switch';
import styles from './ruleForm.module.scss';
import RuleFormSchema from '../../../validation/schemas/ruleForm';
import ruleFormDto from '../../../dtos/ruleFormDto';

interface Props {
    initialValues: ruleFormDto,
    onCancel: Function,
    onSave: Function
}

function ruleForm(props: Props) {
    const ruleFormSchema = RuleFormSchema();

    const handleCancel = () => {
        if (props.onCancel) {
            props.onCancel();
        }
    };

    const handleSave = (values: any) => {
        if (props.onSave) {
            props.onSave(values);
        }
    };

    const validate = (values: any) => ruleFormSchema
        .validate(values, { abortEarly: false })
        .then(() => {
            const errors = {};
            return errors;
        })
        .catch((err: any) => {
            const errors = yupToFormErrors(err);
            return errors;
        });

    return (
        <div className={styles.page}>
            <div className={styles.form}>
                <Formik
                    initialValues={props.initialValues}
                    onSubmit={(values) => {
                        handleSave(values);
                    }}
                    validate={validate}
                >
                    {({
                        values,
                        setFieldValue,
                        errors,
                        touched
                    }) => (
                        <Form>
                            <label htmlFor="name" className="form-label form-label-required">{getContent('rulesEngine.labels.name')}</label>
                            <Field data-testid="name" type="text" className={`form-control ${errors.name && touched.name && 'input-error'}`} name="name" maxLength={120} />
                            <ErrorMessage data-testid="nameErrorMessage" name="name">{(msg) => <div className="error-message">{msg}</div>}</ErrorMessage>

                            <label htmlFor="active" className="form-label form-label-required">{getContent('rulesEngine.labels.status')}</label>
                            <div className={styles['switch-container']}>
                                <Switch data-testid="active" onChange={(val: boolean) => setFieldValue('active', val)} checked={values.active} />
                                <span className={styles['active-label']}>{getContent('rulesEngine.labels.active')}</span>
                            </div>

                            <label htmlFor="category" className="form-label form-label-required">{getContent('rulesEngine.labels.category')}</label>
                            <Field data-testid="category" type="text" className={`form-control ${errors.category && touched.category && 'input-error'}`} name="category" maxLength={120} />
                            <ErrorMessage name="category">{(msg) => <div className="error-message">{msg}</div>}</ErrorMessage>

                            <label htmlFor="group" className="form-label form-label-required">{getContent('rulesEngine.labels.group')}</label>
                            <Field data-testid="group" type="text" className={`form-control ${errors.group && touched.group && 'input-error'}`} name="group" maxLength={120} />
                            <ErrorMessage name="group">{(msg) => <div className="error-message">{msg}</div>}</ErrorMessage>

                            <div className="pull-right-row">
                                <Button variant="link" onClick={handleCancel}>{getContent('application.buttons.cancel')}</Button>
                                <div className="button-spacer" />
                                <Button type="submit" data-testid="saveButton">{getContent('application.buttons.save')}</Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

export default ruleForm;
