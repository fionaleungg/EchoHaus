import React from 'react'
import GraphImage from './GraphImage'
import styles from '../styles/ForgettingCurve.module.css'
import LogoutButton from '../signup-login/LogoutButton';

function ForgettingCurve() {
    return (
        <div className={styles.graph}>
            <h1 className={styles.title}>Your Progress</h1>
            <div className={styles.curve}>
                <GraphImage />
            </div>
            <div className = {styles.logoutButton}>
                <LogoutButton />
            </div>
        </div>
    )
}

export default ForgettingCurve;