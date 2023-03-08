import prisma from "../../../lib/prismaClient";
import {User} from "@prisma/client";
import {extractBody} from "../../../lib/utils";
import bcrypt from "bcryptjs";
export async function POST(req: Request) {
    const body = extractBody(req);

    const {email, password} = await body;

    console.log(email, password);

    if (!email || !password) {
        return new Response("Bad request", {
            status: 400,
        })
    }

    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    }) as User;

    if (!user || user.password !== await bcrypt.hash(password, user.salt)) {
        return new Response("Invalid credentials or user not found", {
            status: 401,
        })
    }
    return new Response(JSON.stringify(user), {
        status: 200,
    })

}
