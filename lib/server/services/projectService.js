import { getDatabaseConnection } from "../utils/database.js";

class ProjectService {
  async getAllProjects() {
    const connection = await getDatabaseConnection();
    const query = "SELECT * FROM projects";
    const [rows] = await connection.execute(query);
    return rows;
  }

  async getProjectById(projectId) {
    const connection = await getDatabaseConnection();
    const query = "SELECT * FROM projects WHERE id = ?";
    const [rows] = await connection.execute(query, [projectId]);
    return rows[0] || null;
  }

  async updateProject(projectId, updatedFields) {
    const connection = await getDatabaseConnection();
    const setClause = Object.keys(updatedFields)
      .map((field) => `${field} = ?`)
      .join(", ");
    const values = [...Object.values(updatedFields), projectId];
    const query = `UPDATE projects SET ${setClause} WHERE id = ?`;
    const [result] = await connection.execute(query, values);
    return result.affectedRows > 0;
  }

  async addOrUpdateProject(project) {
    const connection = await getDatabaseConnection();
    const { id, title, description, department, available_spots, supervisor } =
      project;

    if (id) {
      const query = `UPDATE projects SET title = ?, description = ?, department = ?, available_spots = ?, supervisor = ? WHERE id = ?`;
      const [result] = await connection.execute(query, [
        title,
        description,
        department,
        available_spots,
        supervisor,
        id,
      ]);
      return result.affectedRows > 0 ? id : null;
    } else {
      const query = `INSERT INTO projects (title, description, department, available_spots, supervisor) VALUES (?, ?, ?, ?, ?)`;
      const [result] = await connection.execute(query, [
        title,
        description,
        department,
        available_spots,
        supervisor,
      ]);
      return result.insertId;
    }
  }

  async removeProject(projectId) {
    const connection = await getDatabaseConnection();
    const query = "DELETE FROM projects WHERE id = ?";
    const [result] = await connection.execute(query, [projectId]);
    return result.affectedRows > 0;
  }
}

export default ProjectService;
