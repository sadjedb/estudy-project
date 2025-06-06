import { useState, useEffect } from 'react';

const useApi = (url, method = 'GET', body = null) => {
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
                        'Content-Type': 'application/json',
                    },
                };

                if (body && method.toUpperCase() === 'POST') {
                    options.body = JSON.stringify(body);
                }

                const response = await fetch(url, options);
                setStatusCode(response.status);
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [url, method, body]);

    return { loading, data, statusCode };
};

export default useApi;