import { useState, useEffect } from "react";

const useWhishlist = (studentId) => {
    const url = studentId ? `/api/whishlist?studentId=${studentId}` : null;
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [statusCode, setStatusCode] = useState(null);

    useEffect(() => {
        if (!url) return;
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                setStatusCode(response.status);
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error("Error fetching wishlist:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [url]);

    const getWishlistByStudentId = async (studentId) => {
        const url = studentId ? `/api/whishlist?studentId=${studentId}` : null;
        if (!url) return;
        setLoading(true);
        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            setStatusCode(response.status);
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error("Error fetching all wishlists:", error);
        } finally {
            setLoading(false);
        }
    };


    const addToWhishlist = async (projectId) => {
        if (!studentId) return;
        setLoading(true);
        try {
            const response = await fetch("/api/whishlist", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ studentId, projectId }),
            });
            setStatusCode(response.status);
            const result = await response.json();
            setData((prevData) => ({
                ...prevData,
                wishlist: [...(prevData?.wishlist || []), { student_id: studentId, project_id: projectId }]
            }));
        } catch (error) {
            console.error("Error adding to wishlist:", error);
        } finally {
            setLoading(false);
        }
    };

    const removeFromWhishlist = async (projectId) => {
        if (!studentId) return;
        setLoading(true);
        try {
            const response = await fetch("/api/whishlist", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ studentId, projectId }),
            });
            setStatusCode(response.status);
            if (response.ok) {
                setData((prevData) => ({
                    ...prevData,
                    wishlist: (prevData?.wishlist || []).filter((item) => item.project_id !== projectId)
                }));
            }
        } catch (error) {
            console.error("Error removing from wishlist:", error);
        } finally {
            setLoading(false);
        }
    };

    return { loading, data, statusCode, addToWhishlist, removeFromWhishlist, getWishlistByStudentId };
};

export default useWhishlist;
