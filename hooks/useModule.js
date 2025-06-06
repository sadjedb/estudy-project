import { useState, useEffect } from "react";

const useModule = () => {
  const url = "/api/modules";
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

  const addModule = async (module) => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(module),
      });
      setStatusCode(response.status);
      const result = await response.json();
      setData((prevData) => ({
        ...prevData,
        modules: [
          ...(prevData.modules || []).filter((m) => m.id !== result.moduleId),
          { ...module, id: result.moduleId },
        ],
      }));
    } catch (error) {
      console.error("Error adding module:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeModule = async (moduleId) => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ moduleId }),
      });
      setStatusCode(response.status);
      if (response.ok) {
        setData((prevData) => ({
          ...prevData,
          modules: (prevData.modules || []).filter(
            (item) => item.id !== moduleId
          ),
        }));
      }
    } catch (error) {
      console.error("Error removing module:", error);
    } finally {
      setLoading(false);
    }
  };

  const getModuleById = async (moduleId) => {
    setLoading(true);
    try {
      const response = await fetch(`${url}?id=${moduleId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setStatusCode(response.status);
      const result = await response.json();
      setData(result);
      return result;
    } catch (error) {
      console.error("Error fetching module by ID:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, statusCode, addModule, removeModule, getModuleById };
};

export default useModule;
