import { useState, useEffect } from 'react';

const usePagination = (initialData = [], initialPage = 1, limit = 20) => {
    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(initialPage);
    const [hasMore, setHasMore] = useState(true);

    const loadMoreData = async () => {
        if (loading) return;

        try {
            setLoading(true);
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}?page=${page}&limit=${limit}`
            );
            if (!res.ok) throw new Error('Failed to load more data');

            const newData = await res.json();
            setData((prev) => [...prev, ...newData]);

            if (newData.length < limit) {
                setHasMore(false);
            } else {
                setPage((prev) => prev + 1);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (data.length === 0) {
            loadMoreData();
        }
    }, []);

    return {
        data,
        loading,
        error,
        loadMoreData,
        hasMore,
    };
};

export default usePagination;
