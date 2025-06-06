import WhishlistService from '../../../lib/server/services/whishlistService.js';

const whishlistService = new WhishlistService();

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get('studentId');
    try {
        if (studentId) {
            const wishlist = await whishlistService.getWishlistByStudentId(studentId);
            return new Response(JSON.stringify({ wishlist, status: 200 }));
        } else {
            const wishlists = await whishlistService.getAllWishlists();
            return new Response(JSON.stringify({ wishlists, status: 200 }));
        }
    } catch (error) {
        console.error('Error fetching wishlist(s):', error);
        return new Response(JSON.stringify({ message: 'Failed to fetch wishlist(s)', status: 500 }), { status: 500 });
    }
}

export async function POST(request) {
    const { studentId, projectId } = await request.json();
    try {
        const id = await whishlistService.addToWishlist(studentId, projectId);
        return new Response(JSON.stringify({ message: 'Added to wishlist', id, status: 201 }));
    } catch (error) {
        console.error('Error adding to wishlist:', error);
        return new Response(JSON.stringify({ message: 'Failed to add to wishlist', status: 500 }), { status: 500 });
    }
}

export async function DELETE(request) {
    const { studentId, projectId } = await request.json();
    try {
        const success = await whishlistService.removeFromWishlist(studentId, projectId);
        if (success) {
            return new Response(JSON.stringify({ message: 'Removed from wishlist', status: 200 }));
        } else {
            return new Response(JSON.stringify({ message: 'Wishlist item not found', status: 404 }), { status: 404 });
        }
    } catch (error) {
        console.error('Error removing from wishlist:', error);
        return new Response(JSON.stringify({ message: 'Failed to remove from wishlist', status: 500 }), { status: 500 });
    }
}
