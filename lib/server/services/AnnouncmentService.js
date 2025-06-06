import { getDatabaseConnection } from '../utils/database.js';

class AnnouncmentService {
    async getAllAnnouncments() {
        const connection = await getDatabaseConnection();
        const query = 'SELECT * FROM announcements';
        const [rows] = await connection.execute(query);
        return rows;
    }

    async getAnnouncmentById(announcmentId) {
        const connection = await getDatabaseConnection();
        const query = 'SELECT * FROM announcements WHERE id = ?';
        const [rows] = await connection.execute(query, [announcmentId]);
        return rows[0] || null;
    }

    async updateAnnouncment(announcmentId, updatedFields) {
        const connection = await getDatabaseConnection();
        const setClause = Object.keys(updatedFields)
            .map(field => `${field} = ?`)
            .join(', ');
        const values = [...Object.values(updatedFields), announcmentId];
        const query = `UPDATE announcements SET ${setClause} WHERE id = ?`;
        const [result] = await connection.execute(query, values);
        return result.affectedRows > 0;
    }

    async addOrUpdateAnnouncment(announcment) {
        const connection = await getDatabaseConnection();
        const { id, title, content, department, urgent } = announcment;
        const datetime = new Date().toISOString().split('T')[0];
        if (id) {
            const query = `UPDATE announcements SET title = ?, content = ?, department = ?, urgent = ?, datetime = ? WHERE id = ?`;
            const [result] = await connection.execute(query, [title, content, department, urgent, datetime, id]);
            return result.affectedRows > 0 ? id : null;
        } else {
            const query = `INSERT INTO announcements (title, content, department, urgent, datetime) VALUES (?, ?, ?, ?, ?)`;
            const [result] = await connection.execute(query, [title, content, department, urgent, datetime]);
            return result.insertId;
        }
    }

    async removeAnnouncment(announcmentId) {
        const connection = await getDatabaseConnection();
        const query = 'DELETE FROM announcements WHERE id = ?';
        const [result] = await connection.execute(query, [announcmentId]);
        return result.affectedRows > 0;
    }
}

export default AnnouncmentService;
