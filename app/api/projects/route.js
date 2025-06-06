import ProjectService from '../../../lib/server/services/projectService.js';

const projectService = new ProjectService();
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('id');

    try {
        if (projectId) {
            const project = await projectService.getProjectById(projectId);
            if (project) {
                return new Response(JSON.stringify({ project, status: 200 }));
            } else {
                return new Response(JSON.stringify({ message: "Project not found", status: 404 }), { status: 404 });
            }
        } else {
            const projects = await projectService.getAllProjects();
            return new Response(JSON.stringify({ projects, status: 200 }));
        }
    } catch (error) {
        console.error("Error fetching project(s):", error);
        return new Response(JSON.stringify({ message: "Failed to fetch project(s)", status: 500 }), { status: 500 });
    }
}

export async function POST(request) {
    const body = await request.json();
    try {
        const projectId = await projectService.addOrUpdateProject(body);
        return new Response(JSON.stringify({ message: "Project added", projectId, status: 201 }));
    } catch (error) {
        console.error("Error adding project:", error);
        return new Response(JSON.stringify({ message: "Failed to add project", status: 500 }), { status: 500 });
    }
}

export async function DELETE(request) {
    const { projectId } = await request.json();
    const projectService = new ProjectService();

    try {
        const success = await projectService.removeProject(projectId);
        if (success) {
            return new Response(JSON.stringify({ message: "Project removed", status: 200 }));
        } else {
            return new Response(JSON.stringify({ message: "Project not found", status: 404 }), { status: 404 });
        }
    } catch (error) {
        console.error("Error removing project:", error);
        return new Response(JSON.stringify({ message: "Failed to remove project", status: 500 }), { status: 500 });
    }
}