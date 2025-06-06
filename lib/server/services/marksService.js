import { getDatabaseConnection } from '../utils/database.js';

class MarksService {
    async getAllMarks() {
        const connection = await getDatabaseConnection();
        const [rows] = await connection.execute('SELECT * FROM marks');
        return rows;
    }

    async getMarksByStudentId(studentId) {
        const connection = await getDatabaseConnection();
        // Get all student_modules for this student, joined with modules to get the title
        const [studentModules] = await connection.execute(`
            SELECT sm.id as student_module_id, sm.module_id, sm.year, m.title
            FROM student_modules sm
            JOIN modules m ON sm.module_id = m.id
            WHERE sm.student_id = ?
        `, [studentId]);
        if (!studentModules.length) return [];
        // Get all marks for these student_module_ids
        const studentModuleIds = studentModules.map(sm => sm.student_module_id);
        let marks = [];
        if (studentModuleIds.length) {
            const [marksRows] = await connection.execute(
                `SELECT * FROM marks WHERE student_module_id IN (${studentModuleIds.map(() => '?').join(',')})`,
                studentModuleIds
            );
            marks = marksRows;
        }
        // Merge: for each student_module, find its mark (if any)
        const result = studentModules.map(sm => {
            const mark = marks.find(m => m.student_module_id === sm.student_module_id);
            return {
                student_module_id: sm.student_module_id,
                title: sm.title,
                module_id: sm.module_id,
                year: sm.year,
                ...(mark ? {
                    mark_id: mark.id,
                    score: mark.score,
                    td_score: mark.td_score,
                    tp_score: mark.tp_score,
                    created_at: mark.created_at,
                    updated_at: mark.updated_at
                } : {
                    mark_id: null,
                    score: null,
                    td_score: null,
                    tp_score: null,
                    created_at: null,
                    updated_at: null
                })
            };
        });
        return result;
    }

    async addOrUpdateMark(mark) {
        const connection = await getDatabaseConnection();
        const { id, student_module_id, score, td_score, tp_score } = mark;
        if (id) {
            const query = `UPDATE marks SET score = ?, td_score = ?, tp_score = ? WHERE id = ?`;
            const [result] = await connection.execute(query, [score, td_score, tp_score, id]);
            return result.affectedRows > 0 ? student_module_id : null;
        } else {
            const query = `INSERT INTO marks (student_module_id, score, td_score, tp_score) VALUES (?, ?, ?, ?)`;
            const [result] = await connection.execute(query, [student_module_id, score, td_score, tp_score]);
            return student_module_id;
        }
    }

    async removeMark(id) {
        const connection = await getDatabaseConnection();
        const [result] = await connection.execute('DELETE FROM marks WHERE id = ?', [id]);
        return result.affectedRows > 0;
    }
}

export default MarksService;
