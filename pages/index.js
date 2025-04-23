import styles from './styles.module.css';
import GalleryGrid from "../components/GalleryGrid";
import usePagination from "../hooks/usePagination";
import ThemeToggleButton from "../components/ThemeToggle/ThemeToggle";
import {useDebouncedCallback} from "../hooks/useDebouncedCallback";
import {useCallback, useRef} from "react";
import { InView } from "react-intersection-observer";

export async function getServerSideProps() {
    const page = 1;
    const limit = 20;
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}?page=${page}&limit=${limit}`
    );
    const data = await res.json();

    return {
        props: {
            initialData: data,
        },
    };
}

export default function Home() {
    const {data, loading, error, loadMoreData, onSearch, hasMore} = usePagination();

    const debouncedSearch = useDebouncedCallback((value) => {
        onSearch(value);
    }, 300);

    const oneInfiniteElInView = useCallback(
        (inView) => {
          if(!inView) return
            loadMoreData()
        },
        []
    );

    return (
        <div className={styles.container}>
            <div className={styles.navbar}>
                <ThemeToggleButton/>
                <input
                    type="text"
                    placeholder='Search...'
                    onChange={(e) => debouncedSearch(e.target.value)}
                />
            </div>
            <GalleryGrid data={data}/>

            {error && <p className={styles.error}>Error: {error}</p>}
            {loading && <p className={styles.status}>Loading...</p>}
            {!hasMore && <p className={styles.status}>No more items to load</p>}

            {hasMore && !loading && (
                <InView as="div" onChange={oneInfiniteElInView} />
            )}
        </div>
    );
}
