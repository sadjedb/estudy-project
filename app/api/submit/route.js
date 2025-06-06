import StudentProjectsService from "@/lib/server/services/studentProjectService";

const studentProjectsService = new StudentProjectsService();

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const studentId = searchParams.get("studentId");
  const projectId = searchParams.get("projectId");

  try {
    if (studentId && projectId) {
      const submission = await studentProjectsService.getStudentProject(
        studentId,
        projectId
      );
      return new Response(JSON.stringify({ submission, status: 200 }));
    } else if (studentId) {
      const submissions = await studentProjectsService.getProjectsByStudentId(
        studentId
      );
      return new Response(JSON.stringify({ submissions, status: 200 }));
    } else if (projectId) {
      const submissions = await studentProjectsService.getStudentsByProjectId(
        projectId
      );
      return new Response(JSON.stringify({ submissions, status: 200 }));
    } else {
      const allSubmissions =
        await studentProjectsService.getAllStudentProjects();
      return new Response(
        JSON.stringify({ submissions: allSubmissions, status: 200 })
      );
    }
  } catch (error) {
    console.error("Error fetching project submissions:", error);
    return new Response(
      JSON.stringify({ message: "Failed to fetch submissions", status: 500 }),
      { status: 500 }
    );
  }
}

export async function POST(request) {
  const submission = await request.json();
  try {
    const success = await studentProjectsService.submitProject(submission);
    if (success) {
      return new Response(
        JSON.stringify({
          message: "Project submitted successfully",
          status: 201,
        })
      );
    } else {
      return new Response(
        JSON.stringify({ message: "Failed to submit project", status: 400 }),
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error submitting project:", error);
    return new Response(
      JSON.stringify({ message: "Failed to submit project", status: 500 }),
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  const { id } = await request.json();
  try {
    const success = await studentProjectsService.deleteSubmission(id);
    if (success) {
      return new Response(
        JSON.stringify({ message: "Submission deleted", status: 200 })
      );
    } else {
      return new Response(
        JSON.stringify({ message: "Submission not found", status: 404 }),
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error deleting submission:", error);
    return new Response(
      JSON.stringify({ message: "Failed to delete submission", status: 500 }),
      { status: 500 }
    );
  }
}
