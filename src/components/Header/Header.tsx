import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from './Header.module.css';

function Header() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.logo}>It-incubator</div>
            <nav className={styles.menu}>
                <NavLink className={({isActive}) =>
                    isActive
                        ? `${styles.navLink} ${styles.packList} ${styles.activeLink}`
                        : `${styles.navLink} ${styles.packList}`}
                         to='/packsList'>
                    Packs list
                </NavLink>
                <NavLink className={({isActive}) =>
                    isActive
                        ? `${styles.navLink} ${styles.profile} ${styles.activeLink}`
                        : `${styles.navLink} ${styles.profile}`}
                         to='/profile'>
                    Profile
                </NavLink>
            </nav>
        </div>
    );
}

export default Header;