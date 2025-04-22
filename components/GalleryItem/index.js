import React, { useState } from 'react';
import Title from '../Title';
import styles from './styles.module.css';

const GalleryItem = React.forwardRef(({ item }, ref) => {
  const [showId, setShowId] = useState(false);
  const { id, title } = item;

  const toggleView = () => setShowId((prev) => !prev);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleView();
    }
  };

  return (
      <div
          className={styles.galleryItem}
          onClick={toggleView}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={0}
          aria-pressed={showId}
          aria-label={`Gallery item titled ${title}`}
          ref={ref}
      >
        <div className={`${styles.cardInner} ${showId ? styles.flipped : ''}`}>
          <div className={styles.cardFront}>
            <div className={styles.imageContainer}>
              <img
                  src="https://www.arimetrics.com/wp-content/uploads/2020/01/mockup-1.png"
                  alt={title}
                  className={styles.thumbnail}
              />
            </div>
            <div className={styles.content}>
              <Title title={title} />
            </div>
          </div>
          <div className={styles.cardBack}>
            <div className={styles.idContainer}>
              <span className={styles.idText}>ID: {id}</span>
            </div>
          </div>
        </div>
      </div>
  );
});

export default GalleryItem;
