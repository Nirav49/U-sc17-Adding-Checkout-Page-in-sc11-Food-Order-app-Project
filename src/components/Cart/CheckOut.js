import React, { useRef, useState } from 'react';
import classes from './CheckOut.module.css';

const emptyData = value => value.trim() === '';
const matchChars = value => value.trim().length !== 6;

const Checkout = (props) => {
    const [formValidity, setFormValidity] = useState({
        names: true,
        streets: true,
        postals: true,
        citys: true
    })
    const nameRef = useRef();
    const streetRef = useRef();
    const postalRef = useRef();
    const cityRef = useRef();


    const finalHandler = (event) => {

        event.preventDefault();

        const names = nameRef.current.value;
        const streets = streetRef.current.value;
        const postals = postalRef.current.value;
        const citys = cityRef.current.value;

        const nameIsValid = !emptyData(names)
        const streetIsValid = !emptyData(streets)
        const postalIsValid = !matchChars(postals)
        const citysIsValid = !emptyData(citys)

        setFormValidity({
            names: nameIsValid,
            streets: streetIsValid,
            postals: postalIsValid,
            citys: citysIsValid
        })

        const formIsValid =
            nameIsValid &&
            streetIsValid &&
            postalIsValid &&
            citysIsValid;

        if (!formIsValid) {
            return;
        }

        props.onConfirm({
            name: names,
            street: streets,
            postal: postals,
            city: citys
        })
    };

    const namesclasses = `${classes.control} ${formValidity.names ? '' : classes.invalid}`
    const streetsclasses = `${classes.control} ${formValidity.streets ? '' : classes.invalid}`
    const postalsclasses = `${classes.control} ${formValidity.postals ? '' : classes.invalid}`
    const citysclasses = `${classes.control} ${formValidity.citys ? '' : classes.invalid}`

    return (
        <form className={classes.form} onSubmit={finalHandler}>
            <div className={namesclasses}>
                <label >Your Name</label>
                <input
                    type='text'
                    ref={nameRef} />
                {!formValidity.names && <p>please enter valid name</p>}
            </div>
            <div className={streetsclasses}>
                <label >Street</label>
                <input
                    type='text'
                    ref={streetRef} />
                {!formValidity.streets && <p>please enter valid street</p>}
            </div>
            <div className={postalsclasses}>
                <label >Postal Code</label>
                <input
                    type='number'
                    ref={postalRef} />
                {!formValidity.postals && <p>please enter valid postal code</p>}
            </div>
            <div className={citysclasses}>
                <label>City</label>
                <input
                    type='text'
                    ref={cityRef}
                />
                {!formValidity.citys && <p>please enter valid city</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit}>
                    Confirm
                </button>
            </div>
        </form>
    );
};

export default Checkout;