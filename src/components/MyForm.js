import React from "react";
import { withFormik } from "formik";
import * as Yup from "yup";
import store from 'store';

import SelectFormik from "./SelectFormik";


const MyForm = props => {
    const {
        values,
        touched,
        dirty,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        handleReset,
        setFieldValue,
        setFieldTouched,
        isSubmitting
    } = props;

    return (
        <form onSubmit={handleSubmit}>
            <SelectFormik
                value={values.country}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                error={errors.country}
                touched={touched.country}
            />
            <label htmlFor="city" style={{ display: "block" }}>
                Enter your city
            </label>
            <input
                id="city"
                placeholder="Enter your city"
                type="city"
                value={values.city}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            {errors.city && touched.city && (
                <div style={{ color: "red", marginTop: ".5rem" }}>{errors.city}</div>
            )}
            <button
                type="button"
                className="outline"
                onClick={handleReset}
                disabled={!dirty || isSubmitting}
            >
                Reset
            </button>
            <button type="submit" disabled={isSubmitting}>
                Submit
            </button>
        </form>
    );
};

const formikEnhancer = withFormik({
    validationSchema: Yup.object().shape({
        city: Yup.string().min(2, 'Too Short!')
            .max(32, 'Too Long!')
            .required("City is required!"),
        country: Yup.string().required("Country is required!")
    }),
    enableReinitialize: true,
    mapPropsToValues: props => ({
        city: "",
        country: []
    }),
    handleSubmit: (values, { setSubmitting, resetForm }) => {
        const key = '2d430c5f48743021d8032fc9f98354c2';
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${values.city},${values.country.value}&appid=${key}`)
            .then(resp => { return resp.json() })
            .then(data => {
                if(data.cod ==='404'){
                    setSubmitting(false);
                    resetForm();
                    alert('city not found');
                    return;
                }
                const weathers = store.get('weather') || [];
                const has = weathers.some(o => o.id === data.id);
                if(!has || !data.cod ==='404'){
                    store.set('weather',[...weathers, data]);
                    alert(`City added: ${values.city}`);
                    setSubmitting(false);
                    resetForm();
                }else {
                    alert('You have this city on list');
                    setSubmitting(false);
                    resetForm();
                }
            })
            .catch(err => {
                setSubmitting(false);
                resetForm();
                alert(err);
            });
    },
    displayName: "MyForm"
});

export const MyEnhancedForm = formikEnhancer(MyForm);
