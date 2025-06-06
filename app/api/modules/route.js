import ModuleService from '../../../lib/server/services/moduleService.js';

const moduleService = new ModuleService();

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const moduleId = searchParams.get('id');

    try {
        if (moduleId) {
            const mod = await moduleService.getModuleById(moduleId);
            if (mod) {
                return new Response(JSON.stringify({ module: mod, status: 200 }));
            } else {
                return new Response(JSON.stringify({ message: "Module not found", status: 404 }), { status: 404 });
            }
        } else {
            const modules = await moduleService.getAllModules();
            return new Response(JSON.stringify({ modules, status: 200 }));
        }
    } catch (error) {
        console.error("Error fetching module(s):", error);
        return new Response(JSON.stringify({ message: "Failed to fetch module(s)", status: 500 }), { status: 500 });
    }
}

export async function POST(request) {
    const body = await request.json();
    try {
        const moduleId = await moduleService.addOrUpdateModule(body);
        return new Response(JSON.stringify({ message: "Module added/updated", moduleId, status: 201 }));
    } catch (error) {
        console.error("Error adding/updating module:", error);
        return new Response(JSON.stringify({ message: "Failed to add/update module", status: 500 }), { status: 500 });
    }
}

export async function DELETE(request) {
    const { moduleId } = await request.json();
    try {
        const success = await moduleService.removeModule(moduleId);
        if (success) {
            return new Response(JSON.stringify({ message: "Module removed", status: 200 }));
        } else {
            return new Response(JSON.stringify({ message: "Module not found", status: 404 }), { status: 404 });
        }
    } catch (error) {
        console.error("Error removing module:", error);
        return new Response(JSON.stringify({ message: "Failed to remove module", status: 500 }), { status: 500 });
    }
}
