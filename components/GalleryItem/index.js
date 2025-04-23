import React, {useCallback, useState} from 'react';
import Title from '../Title';
import styles from './styles.module.css';
import Image from "next/image";
import img from '../../img.png';

const GalleryItem = React.memo(({ id, title }) => {
  const [showId, setShowId] = useState(false);

  const toggleView = () => setShowId((prev) => !prev);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleView();
    }
  }, [toggleView]);

  return (
      <div
          className={styles.galleryItem}
          role="button"
          tabIndex={0}
          aria-pressed={showId}
          aria-label={`Gallery item titled ${title}`}
          onClick={toggleView}
          onKeyDown={handleKeyDown}
      >
        <div className={`${styles.cardInner} ${showId ? styles.flipped : ''}`}>
          <div className={styles.cardFront}>
            <div className={styles.imageContainer}>
              <Image
                  src={img}
                  width={200}
                  height={200}
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
