import StudentService from '../../../lib/server/services/studentService.js';

const studentService = new StudentService();

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('id');

    try {
        if (studentId) {
            const student = await studentService.getStudentById(studentId);
            if (student) {
                return new Response(JSON.stringify({ student, status: 200 }));
            } else {
                return new Response(JSON.stringify({ message: "Student not found", status: 404 }), { status: 404 });
            }
        } else {
            const students = await studentService.getAllStudents();
            return new Response(JSON.stringify({ students, status: 200 }));
        }
    } catch (error) {
        console.error("Error fetching student(s):", error);
        return new Response(JSON.stringify({ message: "Failed to fetch student(s)", status: 500 }), { status: 500 });
    }
}

export async function POST(request) {
    const body = await request.json();
    try {
        // body should include assignedModules: [moduleId, ...]
        const studentId = await studentService.addOrUpdateStudent(body);
        return new Response(JSON.stringify({ message: "Student added/updated", studentId, status: 201 }));
    } catch (error) {
        console.error("Error adding/updating student:", error);
        return new Response(JSON.stringify({ message: "Failed to add/update student", status: 500 }), { status: 500 });
    }
}
export async function PATCH(request) {
    const body = await request.json();
    const { studentId, type, data } = body;

    try {
        let success = false;
        if (type === "info") {
            success = await studentService.updateStudentInfo(studentId, data);
        }
        if (success) {
            return new Response(JSON.stringify({ message: "Student updated", status: 200 }));
        } else {
            return new Response(JSON.stringify({ message: "Student not found", status: 404 }), { status: 404 });
        }
    } catch (error) {
        console.error("Error updating student:", error);
        return new Response(JSON.stringify({ message: "Failed to update student", status: 500 }), { status: 500 });
    }
}

export async function DELETE(request) {
    const { studentId } = await request.json();

    try {
        const success = await studentService.removeStudent(studentId);
        if (success) {
            return new Response(JSON.stringify({ message: "Student removed", status: 200 }));
        } else {
            return new Response(JSON.stringify({ message: "Student not found", status: 404 }), { status: 404 });
        }
    } catch (error) {
        console.error("Error removing student:", error);
        return new Response(JSON.stringify({ message: "Failed to remove student", status: 500 }), { status: 500 });
    }
}
