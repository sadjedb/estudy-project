import MarksService from '../../../lib/server/services/marksService.js';

const marksService = new MarksService();

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('studentId');
    try {
        if (studentId) {
            const marks = await marksService.getMarksByStudentId(studentId);
            return new Response(JSON.stringify({ marks, status: 200 }));
        } else {
            const marks = await marksService.getAllMarks();
            return new Response(JSON.stringify({ marks, status: 200 }));
        }
    } catch (error) {
        console.error('Error fetching marks:', error);
        return new Response(JSON.stringify({ message: 'Failed to fetch marks', status: 500 }), { status: 500 });
    }
}

export async function POST(request) {
    const body = await request.json();
    try {
        const markId = await marksService.addOrUpdateMark(body);
        return new Response(JSON.stringify({ message: 'Mark added/updated', markId, status: 201 }));
    } catch (error) {
        console.error('Error adding/updating mark:', error);
        return new Response(JSON.stringify({ message: 'Failed to add/update mark', status: 500 }), { status: 500 });
    }
}

export async function DELETE(request) {
    const { id } = await request.json();
    try {
        const success = await marksService.removeMark(id);
        if (success) {
            return new Response(JSON.stringify({ message: 'Mark removed', status: 200 }));
        } else {
            return new Response(JSON.stringify({ message: 'Mark not found', status: 404 }), { status: 404 });
        }
    } catch (error) {
        console.error('Error removing mark:', error);
        return new Response(JSON.stringify({ message: 'Failed to remove mark', status: 500 }), { status: 500 });
    }
}
