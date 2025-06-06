import { useState, useEffect } from "react";

const useAnnouncements = () => {
    const url = "/api/announcements";
    const method = "GET";
    const body = null;
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [statusCode, setStatusCode] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const options = {
                    method,
                    headers: {
                        "Content-Type": "application/json",
                    },
                };

                if (body && method.toUpperCase() === "POST") {
                    options.body = JSON.stringify(body);
                }

                const response = await fetch(url, options);
                setStatusCode(response.status);
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const addAnnouncement = async (announcement) => {
        setLoading(true);
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(announcement),
            });
            setStatusCode(response.status);
            const result = await response.json();
            setData((prevData) => ({
                ...prevData,
                announcments: [
                    ...(prevData.announcments || []).filter((a) => a.id !== result.announcmentId),
                    { ...announcement, id: result.announcmentId }
                ]
            }));
        } catch (error) {
            console.error('Error adding announcement:', error);
        } finally {
            setLoading(false);
        }
    };

    const removeAnnouncement = async (announcmentId) => {
        setLoading(true);
        try {
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ announcmentId }),
            });
            setStatusCode(response.status);
            if (response.ok) {
                setData((prevData) => ({
                    ...prevData,
                    announcments: (prevData.announcments || []).filter((item) => item.id !== announcmentId)
                }));
            }
        } catch (error) {
            console.error("Error removing announcement:", error);
        } finally {
            setLoading(false);
        }
    };

    return { loading, data, statusCode, addAnnouncement, removeAnnouncement };
};

export default useAnnouncements;
