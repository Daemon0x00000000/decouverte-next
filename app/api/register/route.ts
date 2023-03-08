import prisma from "../../../lib/prismaClient";
import {extractBody} from "../../../lib/utils";
import bcrypt from "bcryptjs";
export async function POST(req: Request) {
    const body = extractBody(req);
    const {email, username, password} = await body;

    if (!body) {
        return {
            status: 400,
            body: {
                message: "Bad request",
            },
        };
    }
    // Hash du password avec bcrypt + salt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await prisma.user.create({
        data: {
            email: email,
            username: username,
            password: hashedPassword,
            salt: salt,
        }
    }).catch(() => {
        return new Response("Internal Server Error", {
            status: 500,
        })
    })

    return new Response("User created", {
        status: 200,
    })
}
