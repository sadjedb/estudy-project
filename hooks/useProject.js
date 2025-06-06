"use client";
import { useState, useEffect } from "react";

const useProject = () => {
  const url = "/api/projects";
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

  const addProject = async (project) => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      });
      setStatusCode(response.status);
      const result = await response.json();

      setData((prevData) => ({
        ...prevData,
        projects: [
          ...(prevData.projects || []).filter((p) => p.id !== result.projectId),
          { ...project, id: result.projectId },
        ],
      }));
    } catch (error) {
      console.error("Error adding project:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeProject = async (projectId) => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ projectId }),
      });
      setStatusCode(response.status);
      if (response.ok) {
        setData((prevData) => ({
          ...prevData,
          projects: (prevData.projects || []).filter(
            (item) => item.id !== projectId
          ),
        }));
      }
    } catch (error) {
      console.error("Error removing project:", error);
    } finally {
      setLoading(false);
    }
  };

  const getProjectById = async (projectId) => {
    setLoading(true);
    try {
      const response = await fetch(`${url}?id=${projectId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setStatusCode(response.status);
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error fetching project by ID:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    data,
    statusCode,
    addProject,
    removeProject,
    getProjectById,
  };
};

export default useProject;
