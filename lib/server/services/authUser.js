import { getDatabaseConnection } from "../utils/database";
import bcrypt from "bcryptjs";

export async function authUser(email, password, userType) {
    const connection = await getDatabaseConnection();
    await connection.connect();

    const table = userType === "student" ? "students" : "admins";
    const data = userType === "student" ? "first_name, last_name, password" : "full_name, password";

    try {
        const [rows] = await connection.execute(
            `SELECT id, ${data}, email FROM ${table} WHERE email = ?`,
            [email]
        );

        if (rows.length > 0) {
            const user = rows[0];
            // Compare password using bcrypt for both students and admins
            const match = await bcrypt.compare(password, user.password);
            if (!match) return null;

            // Remove password from returned object
            delete user.password;
            return {
                ...user,
                roles: [userType, "public"],
                permissions: ["view", "edit", "delete"],
            };
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error authenticating user:", error);
        throw error;
    } finally {
        await connection.end();
    }
}
