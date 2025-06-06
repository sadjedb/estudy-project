import { useState, useEffect } from "react";

const useStudent = (studentId) => {
  const url = "/api/students";
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

        // If studentId exists, fetch a specific student
        const fetchUrl = studentId ? `${url}?id=${studentId}` : url;

        const response = await fetch(fetchUrl, options);

        setStatusCode(response.status);
        const result = await response.json();
        const parsedResult = Array.isArray(result.students)
          ? {
              ...result,
              students: result.students.map((student) => ({
                ...student,
                wishlist:
                  typeof student.wishlist === "string"
                    ? JSON.parse(student.wishlist)
                    : student.wishlist,
              })),
            }
          : result;
        setData(parsedResult);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [studentId]);

  const addStudent = async (student) => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(student),
      });
      setStatusCode(response.status);
      const result = await response.json();
      setData((prevData) => ({
        ...prevData,
        students: [
          ...(prevData?.students || []),
          { ...student, id: result.studentId },
        ],
      }));
    } catch (error) {
      console.error("Error adding student:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeStudent = async (studentId) => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ studentId }),
      });
      setStatusCode(response.status);
      if (response.ok) {
        setData((prevData) =>
          (prevData || []).filter((item) => item.id !== studentId)
        );
      }
    } catch (error) {
      console.error("Error removing student:", error);
    } finally {
      setLoading(false);
    }
  };

  const editInfo = async ({ bio, phone }) => {
    setLoading(true);
    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId,
          type: "info",
          data: { bio, phone }
        }),
      });
      setStatusCode(response.status);
      if (response.ok) {
        setData((prevData) => {
          if (!prevData || !prevData.student) return prevData;
          return {
            ...prevData,
            student: {
              ...prevData.student,
              bio: bio !== undefined ? bio : prevData.student.bio,
              phone: phone !== undefined ? phone : prevData.student.phone,
            },
          };
        });
      }
    } catch (error) {
      console.error("Error updating student info:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, statusCode, addStudent, removeStudent, editInfo };
};

export default useStudent;
