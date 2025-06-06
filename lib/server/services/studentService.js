import { getDatabaseConnection } from "../utils/database.js";
import bcrypt from "bcryptjs";

class StudentService {
  async getAllStudents() {
    const connection = await getDatabaseConnection();
    const query = "SELECT * FROM students";
    const [rows] = await connection.execute(query);
    // For each student, get their wishlisted projects and assigned modules
    for (const student of rows) {
      const [wishlist] = await connection.execute(
        `SELECT p.* FROM student_project_wishlist w JOIN projects p ON w.project_id = p.id WHERE w.student_id = ?`,
        [student.id]
      );
      student.wishlist_projects = wishlist;
      // Get assigned modules
      const [assignedModules] = await connection.execute(
        `SELECT m.* FROM student_modules sm JOIN modules m ON sm.module_id = m.id WHERE sm.student_id = ?`,
        [student.id]
      );
      student.assignedModules = assignedModules;
    }
    return rows;
  }

  async getStudentById(studentId) {
    const connection = await getDatabaseConnection();
    const query = "SELECT * FROM students WHERE id = ?";
    const [rows] = await connection.execute(query, [studentId]);
    const student = rows[0] || null;
    if (!student) return null;
    // Get wishlisted projects for this student
    const [wishlist] = await connection.execute(
      `SELECT p.* FROM student_project_wishlist w JOIN projects p ON w.project_id = p.id WHERE w.student_id = ?`,
      [studentId]
    );
    student.wishlist_projects = wishlist;
    // Get assigned modules for this student
    const [assignedModules] = await connection.execute(
      `SELECT m.* FROM student_modules sm JOIN modules m ON sm.module_id = m.id WHERE sm.student_id = ?`,
      [studentId]
    );
    student.assignedModules = assignedModules;
    return student;
  }

  async updateStudent(studentId, updatedFields) {
    const connection = await getDatabaseConnection();
    const setClause = Object.keys(updatedFields)
      .map((field) => `${field} = ?`)
      .join(", ");
    const values = [...Object.values(updatedFields), studentId];
    const query = `UPDATE students SET ${setClause} WHERE id = ?`;
    const [result] = await connection.execute(query, values);
    return result.affectedRows > 0;
  }

  async addOrUpdateStudent(student) {
    const connection = await getDatabaseConnection();
    const { id, first_name, last_name, password, email, department, wishlist, assignedModules } = student;
    let studentId = id;
    let hashedPassword = password;
    if (password) {
      // Only hash if password is provided (for new or updated password)
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }
    if (id) {
      const query = `UPDATE students SET first_name = ?, last_name = ?, password = ?, email = ?, department = ?, wishlist = ? WHERE id = ?`;
      const result = await connection.execute(query, [first_name, last_name, hashedPassword, email, department, JSON.stringify(wishlist), id]);
      studentId = id;
    } else {
      // Insert a new student if no ID is provided
      const query = `INSERT INTO students (first_name, last_name, password, email, department, wishlist) VALUES (?, ?, ?, ?, ?, ?)`;
      const result = await connection.execute(query, [first_name, last_name, hashedPassword, email, department, JSON.stringify(wishlist)]);
      studentId = result[0].insertId;
    }
    // Handle assigned modules
    if (Array.isArray(assignedModules)) {
      // Remove old assignments if updating
      if (id) {
        await connection.execute('DELETE FROM student_modules WHERE student_id = ?', [studentId]);
      }
      // Get current academic year (e.g., 2024-2025)
      const now = new Date();
      const yearStart = now.getMonth() >= 8 ? now.getFullYear() : now.getFullYear() - 1; // Academic year starts in September
      const yearEnd = yearStart + 1;
      const academicYear = `${yearStart}-${yearEnd}`;
      for (const moduleId of assignedModules) {
        await connection.execute('INSERT INTO student_modules (student_id, module_id, year) VALUES (?, ?, ?)', [studentId, moduleId, academicYear]);
      }
    }
    return studentId;
  }

  async removeStudent(studentId) {
    const connection = await getDatabaseConnection();
    const query = "DELETE FROM students WHERE id = ?";
    const [result] = await connection.execute(query, [studentId]);
    return result.affectedRows > 0;
  }

  async updateStudentInfo(studentId, { bio, phone }) {
    const connection = await getDatabaseConnection();
    const fields = [];
    const values = [];
    if (bio !== undefined && bio !== null) {
      fields.push('bio = ?');
      values.push(bio);
    }
    if (phone !== undefined && phone !== null) {
      fields.push('phone = ?');
      values.push(phone);
    }
    if (fields.length === 0) return false;
    const query = `UPDATE students SET ${fields.join(', ')} WHERE id = ?`;
    values.push(studentId);
    const [result] = await connection.execute(query, values);
    return result.affectedRows > 0;
  }
}

export default StudentService;
