import { useState, useEffect } from "react";

const useMarks = (studentId) => {
    const url = studentId ? `/api/marks?studentId=${studentId}` : "/api/marks";
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
                console.error("Error fetching marks:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [url]);

    const addOrUpdateMark = async (mark) => {
        setLoading(true);
        try {
            const response = await fetch("/api/marks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(mark),
            });
            setStatusCode(response.status);
            const result = await response.json();
            setData((prevData) => ({
                ...prevData,
                marks: [
                    ...(prevData?.marks || []).filter((m) => m.student_module_id !== result.markId),
                    { ...mark, id: result.markId }
                ]
            }));
        } catch (error) {
            console.error("Error adding/updating mark:", error);
        } finally {
            setLoading(false);
        }
    };

    const removeMark = async (id) => {
        setLoading(true);
        try {
            const response = await fetch("/api/marks", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            });
            setStatusCode(response.status);
            if (response.ok) {
                setData((prevData) => ({
                    ...prevData,
                    marks: (prevData?.marks || []).filter((item) => item.id !== id)
                }));
            }
        } catch (error) {
            console.error("Error removing mark:", error);
        } finally {
            setLoading(false);
        }
    };

    return { loading, data, statusCode, addOrUpdateMark, removeMark };
};

export default useMarks;
