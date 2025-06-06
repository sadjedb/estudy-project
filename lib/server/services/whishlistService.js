import { getDatabaseConnection } from '../utils/database.js';

class WhishlistService {
    async getWishlistByStudentId(studentId) {
        const connection = await getDatabaseConnection();
        const [rows] = await connection.execute(
            `SELECT w.id, w.project_id, p.title, p.description, p.department, p.available_spots, p.supervisor
             FROM student_project_wishlist w
             JOIN projects p ON w.project_id = p.id
             WHERE w.student_id = ?`,
            [studentId]
        );
        return rows;
    }

    async addToWishlist(studentId, projectId) {
        const connection = await getDatabaseConnection();
        // Prevent duplicates
        const [existing] = await connection.execute(
            'SELECT id FROM student_project_wishlist WHERE student_id = ? AND project_id = ?',
            [studentId, projectId]
        );
        if (existing.length > 0) return existing[0].id;
        const [result] = await connection.execute(
            'INSERT INTO student_project_wishlist (student_id, project_id) VALUES (?, ?)',
            [studentId, projectId]
        );
        return result.insertId;
    }

    async removeFromWishlist(studentId, projectId) {
        const connection = await getDatabaseConnection();
        const [result] = await connection.execute(
            'DELETE FROM student_project_wishlist WHERE student_id = ? AND project_id = ?',
            [studentId, projectId]
        );
        return result.affectedRows > 0;
    }

    async getAllWishlists() {
        const connection = await getDatabaseConnection();
        const [rows] = await connection.execute(
            `SELECT w.id, w.student_id, s.first_name, s.last_name, w.project_id, p.title, p.description, p.department, p.available_spots, p.supervisor
             FROM student_project_wishlist w
             JOIN projects p ON w.project_id = p.id
             JOIN student s ON w.student_id = s.id`
        );
        return rows;
    }
}

export default WhishlistService;
