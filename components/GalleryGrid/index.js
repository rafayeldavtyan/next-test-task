import React from 'react';
import GalleryItem from '../GalleryItem';
import styles from './styles.module.css';

const GalleryGrid = ({ data }) => {
    return (
        <div className={styles.grid}>
            {data.map((item) => (
                <GalleryItem {...item} key={item.id} />
            ))}
        </div>
    );
};

export default GalleryGrid;
