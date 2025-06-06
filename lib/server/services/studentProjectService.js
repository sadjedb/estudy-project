import { getDatabaseConnection } from "../utils/database.js";

class StudentProjectsService {
  async getAllStudentProjects() {
    const connection = await getDatabaseConnection();
    const [rows] = await connection.execute(`
            SELECT sp.*, s.name as student_name, p.title as project_title 
            FROM studentProjects sp
            JOIN students s ON sp.student_id = s.id
            JOIN projects p ON sp.project_id = p.id
        `);
    return rows;
  }

  async getProjectsByStudentId(studentId) {
    const connection = await getDatabaseConnection();
    const [rows] = await connection.execute(
      `
            SELECT sp.*, p.title as project_title, p.description as project_description
            FROM studentProjects sp
            JOIN projects p ON sp.project_id = p.id
            WHERE sp.student_id = ?
        `,
      [studentId]
    );
    return rows;
  }

  async getStudentsByProjectId(projectId) {
    const connection = await getDatabaseConnection();
    const [rows] = await connection.execute(
      `
            SELECT sp.*, s.name as student_name, s.email as student_email
            FROM studentProjects sp
            JOIN students s ON sp.student_id = s.id
            WHERE sp.project_id = ?
        `,
      [projectId]
    );
    return rows;
  }

  async getStudentProject(studentId, projectId) {
    const connection = await getDatabaseConnection();
    const [rows] = await connection.execute(
      `
            SELECT sp.*, p.title as project_title, s.name as student_name
            FROM studentProjects sp
            JOIN projects p ON sp.project_id = p.id
            JOIN students s ON sp.student_id = s.id
            WHERE sp.student_id = ? AND sp.project_id = ?
        `,
      [studentId, projectId]
    );
    return rows[0] || null;
  }

  async submitProject(submission) {
    const connection = await getDatabaseConnection();
    const { student_id, project_id, file_link, note } = submission;

    const existing = await this.getStudentProject(student_id, project_id);

    if (existing) {
      const query = `UPDATE studentProjects 
                          SET file_link = ?, note = ?, updated_at = CURRENT_TIMESTAMP 
                          WHERE student_id = ? AND project_id = ?`;
      const [result] = await connection.execute(query, [
        file_link,
        note,
        student_id,
        project_id,
      ]);
      return result.affectedRows > 0;
    } else {
      const query = `INSERT INTO studentProjects 
                          (student_id, project_id, file_link, note) 
                          VALUES (?, ?, ?, ?)`;
      const [result] = await connection.execute(query, [
        student_id,
        project_id,
        file_link,
        note,
      ]);
      return result.affectedRows > 0;
    }
  }
}

export default StudentProjectsService;
