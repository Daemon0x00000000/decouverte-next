import prisma from "../../../lib/prismaClient";
import bcrypt from "bcryptjs";
export async function POST(req: Request) {
    const body = await req.json();
    const {email, username, password} = await body;

    if (!body) {
        return new Response(JSON.stringify({status: 400}), {status: 400})
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
        return new Response(JSON.stringify({status: 500}), {status: 500})
    })

    return new Response(JSON.stringify({status: 201}), {status: 201})
}
