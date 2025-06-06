import AnnouncmentService from '../../../lib/server/services/AnnouncmentService.js';

const announcmentService = new AnnouncmentService();

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const announcmentId = searchParams.get('id');

    try {
        if (announcmentId) {
            const announcment = await announcmentService.getAnnouncmentById(announcmentId);
            if (announcment) {
                return new Response(JSON.stringify({ announcment, status: 200 }));
            } else {
                return new Response(JSON.stringify({ message: "Announcment not found", status: 404 }), { status: 404 });
            }
        } else {
            const announcments = await announcmentService.getAllAnnouncments();
            return new Response(JSON.stringify({ announcments, status: 200 }));
        }
    } catch (error) {
        console.error("Error fetching announcment(s):", error);
        return new Response(JSON.stringify({ message: "Failed to fetch announcment(s)", status: 500 }), { status: 500 });
    }
}

export async function POST(request) {
    const body = await request.json();
    try {
        const announcmentId = await announcmentService.addOrUpdateAnnouncment(body);
        return new Response(JSON.stringify({ message: "Announcment added", announcmentId, status: 201 }));
    } catch (error) {
        console.error("Error adding announcment:", error);
        return new Response(JSON.stringify({ message: "Failed to add announcment", status: 500 }), { status: 500 });
    }
}

export async function DELETE(request) {
    const { announcmentId } = await request.json();
    try {
        const success = await announcmentService.removeAnnouncment(announcmentId);
        if (success) {
            return new Response(JSON.stringify({ message: "Announcment removed", status: 200 }));
        } else {
            return new Response(JSON.stringify({ message: "Announcment not found", status: 404 }), { status: 404 });
        }
    } catch (error) {
        console.error("Error removing announcment:", error);
        return new Response(JSON.stringify({ message: "Failed to remove announcment", status: 500 }), { status: 500 });
    }
}
