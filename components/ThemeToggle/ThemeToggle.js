import React, {useMemo} from 'react';
import { useTheme } from '../../context/ThemeContext';
import styles from "../../pages/styles.module.css";

const ThemeToggleButton = () => {
    const { theme, toggleTheme } = useTheme();
    const activeTheme = useMemo(() => theme === 'light' ? 'Dark' : 'Light', [theme])

    return (
        <button
            onClick={toggleTheme}
            className={styles.button}
        >
            Switch to {activeTheme} Mode
        </button>
    );
};

export default ThemeToggleButton;
