import { getDatabaseConnection } from "../utils/database.js";

class ModuleService {
  async getAllModules() {
    const connection = await getDatabaseConnection();
    const query = "SELECT * FROM modules";
    const [modules] = await connection.execute(query);
    // Fetch syllabus for each module
    for (const mod of modules) {
      const [syllabus] = await connection.execute(
        "SELECT * FROM module_syllabus WHERE module_id = ? ORDER BY id",
        [mod.id]
      );
      mod.syllabus = syllabus;
    }
    return modules;
  }

  async getModuleById(moduleId) {
    const connection = await getDatabaseConnection();
    const [modules] = await connection.execute(
      "SELECT * FROM modules WHERE code = ?",
      [moduleId]
    );
    if (modules.length === 0) return null;
    const mod = modules[0];
    const [syllabus] = await connection.execute(
      "SELECT * FROM module_syllabus WHERE module_id = ? ORDER BY id",
      [mod.id]
    );
    mod.syllabus = syllabus;
    return mod;
  }

  async addOrUpdateModule(module) {
    const connection = await getDatabaseConnection();
    const {
      id,
      title,
      code,
      instructor,
      department,
      credits,
      description,
      schedule,
      location,
      syllabus = [],
    } = module;
    let moduleId = id;
    if (id) {
      const query = `UPDATE modules SET title = ?, code = ?, instructor = ?, department = ?, credits = ?, description = ?, schedule = ?, location = ? WHERE id = ?`;
      await connection.execute(query, [
        title,
        code,
        instructor,
        department,
        credits,
        description,
        schedule,
        location,
        id,
      ]);
      // Remove old syllabus
      await connection.execute(
        "DELETE FROM module_syllabus WHERE module_id = ?",
        [id]
      );
    } else {
      // Insert new module
      const query = `INSERT INTO modules (title, code, instructor, department, credits, description, schedule, location, id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, UUID())`;
      await connection.execute(query, [
        title,
        code,
        instructor,
        department,
        credits,
        description,
        schedule,
        location,
      ]);
      // Get the inserted id
      const [rows] = await connection.execute(
        "SELECT id FROM modules WHERE code = ? ORDER BY id DESC LIMIT 1",
        [code]
      );
      moduleId = rows[0].id;
    }
    // Insert syllabus
    for (const item of syllabus) {
      await connection.execute(
        "INSERT INTO module_syllabus (module_id, week, description, courseFile, tdFile) VALUES (?, ?, ?, ?, ?)",
        [
          moduleId,
          item.week,
          item.description,
          item.courseFile || null,
          item.tdFile || null,
        ]
      );
    }
    return moduleId;
  }

  async updateModule(moduleId, updatedFields) {
    const connection = await getDatabaseConnection();
    const setClause = Object.keys(updatedFields)
      .map((field) => `${field} = ?`)
      .join(", ");
    const values = [...Object.values(updatedFields), moduleId];
    const query = `UPDATE modules SET ${setClause} WHERE id = ?`;
    const [result] = await connection.execute(query, values);
    return result.affectedRows > 0;
  }

  async removeModule(moduleId) {
    const connection = await getDatabaseConnection();
    // Remove syllabus first due to FK constraint
    await connection.execute(
      "DELETE FROM module_syllabus WHERE module_id = ?",
      [moduleId]
    );
    const [result] = await connection.execute(
      "DELETE FROM modules WHERE id = ?",
      [moduleId]
    );
    return result.affectedRows > 0;
  }
}

export default ModuleService;
