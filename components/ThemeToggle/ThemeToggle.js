import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import styles from "../../pages/styles.module.css";

const ThemeToggleButton = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className={styles.button}
        >
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
    );
};

export default ThemeToggleButton;
