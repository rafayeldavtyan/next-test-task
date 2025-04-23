import { useState, useEffect, useRef } from 'react';

const usePagination = (initialData = [], initialPage = 1, limit = 20) => {
    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const pageRef = useRef(initialPage);
    const searchRef = useRef('');

    const loadMoreData = async () => {
        if (loading) return;

        try {
            setLoading(true);
            const page = pageRef.current;
            const searchQuery = searchRef.current;

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}?page=${page}&limit=${limit}&searchQuery=${searchQuery}`
            );
            if (!res.ok) {
                setError('Failed to load more data');
            }

            const newData = await res.json();
            setData((prev) => [...prev, ...newData]);

            if (newData.length < limit) {
                setHasMore(false);
            } else {
                pageRef.current = page + 1;
            }
        } catch {
            setError('Failed to load items');
        } finally {
            setLoading(false);
        }
    };

    const onSearch = async (searchQuery = '') => {
        searchRef.current = searchQuery
        setData([]);
        pageRef.current = 1;
        setHasMore(true);

        await loadMoreData();
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
        hasMore,
        loadMoreData,
        onSearch,
    };
};

export default usePagination;
