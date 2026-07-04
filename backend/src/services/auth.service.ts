import { RegisterUserInput } from "../types/auth.types.js";
import { db } from "../config/db.js";
import { users } from "../schemas/user.js";
import { eq } from "drizzle-orm";

export const register = async (
    data: RegisterUserInput
) => {
    const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, data.email));

    if (existingUser.length > 0) {
    return {
        success: false,
        message: "Email already registered"
    };
}

    console.log(data);
return {
    success: true,
    message: "Email is available"
};

};
