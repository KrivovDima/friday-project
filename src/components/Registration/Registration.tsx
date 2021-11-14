import React from 'react';
import styles from './Registration.module.css';

function Registration() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.box}>
                <h2 className={styles.title}>It-incubator</h2>
                <h3 className={styles.subTitle}>Sign Up</h3>
                <div className={styles.formWrapper}>
                    <input className={styles.input} type="text"/>
                    <input className={styles.input} type="password"/>
                    <input className={styles.input} type="password"/>
                    <div className={styles.btns}>
                        <button className={styles.btn}>Cancel</button>
                        <button>Register</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Registration;