import { useState, useEffect } from "react";

const useSubmitProject = (studentId, projectId) => {
  const baseUrl = "/api/submit";
  const url =
    studentId && projectId
      ? `${baseUrl}?studentId=${studentId}&projectId=${projectId}`
      : studentId
      ? `${baseUrl}?studentId=${studentId}`
      : projectId
      ? `${baseUrl}?projectId=${projectId}`
      : baseUrl;

  const [loading, setLoading] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [submission, setSubmission] = useState(null);
  const [statusCode, setStatusCode] = useState(null);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setStatusCode(response.status);
      const result = await response.json();

      if (studentId && projectId) {
        setSubmission(result.submission);
      } else {
        setSubmissions(result.submissions || []);
      }
    } catch (err) {
      console.error("Error fetching project submissions:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!url) return;
    fetchData();
  }, [url, studentId, projectId]);

  const submitProject = async (projectData) => {
    setLoading(true);
    setError(null);
    try {
      console.log("Submitting project data:", projectData);
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });
      setStatusCode(response.status);
      const result = await response.json();

      if (response.ok) {
        setSubmitted(true);
        if (studentId && projectId) {
          setSubmission(result.submission);
        } else {
          fetchData();
        }
        return result;
      } else {
        setSubmitted(false);
        return result;
      }
    } catch (err) {
      console.error("Error submitting project:", err);
      setError(err);
      setSubmitted(false);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    submissions,
    submission,
    statusCode,
    error,
    submitted,
    submitProject,
    refetch: fetchData,
    isSubmittedFor: (sid, pid) => {
      if (!submissions || submissions.length === 0) return false;
      return submissions.some(
        (s) =>
          String(s.student_id) === String(sid) &&
          String(s.project_id) === String(pid)
      );
    },
  };
};

export default useSubmitProject;
