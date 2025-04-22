import styles from './styles.module.css';
import GalleryGrid from "../components/GalleryGrid";
import usePagination from "../hooks/usePagination";
import ThemeToggleButton from "../components/ThemeToggle/ThemeToggle";

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
    const { data, loading, error, loadMoreData, hasMore } = usePagination();

    return (
        <div className={styles.container}>
            <ThemeToggleButton />
            {error && <p className={styles.error}>Error: {error}</p>}
            <GalleryGrid data={data} />

            {loading && <p className={styles.status}>Loading...</p>}
            {!hasMore && <p className={styles.status}>No more items to load</p>}
            {hasMore && !loading && (
                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                    <button
                        onClick={loadMoreData}
                        className={styles.button}
                    >
                        Load More
                    </button>
                </div>
            )}
        </div>
    );
}
