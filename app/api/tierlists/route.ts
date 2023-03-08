import {extractBody} from "../../../lib/utils";
import TierListInterface from "../../../interfaces/TierListInterface";
import {getServerSession} from "next-auth";
import {authOptions} from "../../../pages/api/auth/[...nextauth]";
export async function POST(req:Request) {
    const body = extractBody(req) as Promise<TierListInterface>;
    const myTierlist:TierListInterface = await body;
    const user = await getServerSession(authOptions) as any;

    if (!myTierlist) {
        return new Response("Bad Request", {status: 400})
    }

    if (!user) {
        return new Response("Bad Request", {status: 400})
    }


    prisma.tierlist.create({
        data: {
            name: myTierlist.name,
            tiers: {
                create: myTierlist.tiers.map(tier => {
                    return {
                        name: tier.name,
                        color: tier.color,
                        items: {
                            create: tier.items.map(item => {
                                return {
                                    encodedImage: item.encodedImage
                                }
                            })
                        }
                    }
                })
            },
            user: {
                connect: {
                    id: user.id
                }
            }
        }
    }).catch(() => {
        return new Response("Internal Server Error", {status: 500})
    })

    return new Response("OK", {status: 200})
}

export async function GET() {
    const user = await getServerSession(authOptions) as any;

    if (!user) {
        return new Response("Bad Request", {status: 400})
    }

    const tierlists = await prisma.tierlist.findMany({
        where: {
            userId: "e1c1b23b-321f-427f-b444-68a1698585c0"
        },
        select: {
            id: true,
            name: true,
            tiers: {
                select: {
                    id: true,
                    name: true,
                    color: true,
                    items: {
                        select: {
                            id: true,
                            encodedImage: true
                        }
                    }
                }
            }
        }
    }).catch(() => {
        return new Response("Internal Server Error", {status: 500})
    })

    return new Response(JSON.stringify(tierlists), {status: 200})
}

export async function DELETE(req:Request) {
    const body = extractBody(req) as Promise<{ id: string }>;
    const {id} = await body;
    const user = await getServerSession(authOptions) as any;

    if (!id) {
        return new Response("Bad Request", {status: 400})
    }

    if (!user) {
        return new Response("Unauthorized", {status: 401})
    }

    await prisma.tierlist.delete({
        where: {
            id
        }
    }).catch(() => {
        return new Response("Internal Server Error", {status: 500})
    })

    return new Response("OK", {status: 200})
}

export async function PUT(req:Request) {
    const body = extractBody(req) as Promise<TierListInterface>;
    const myTierlist:TierListInterface = await body;
    const user = await getServerSession(authOptions) as any;

    if (!myTierlist) {
        return new Response("Bad Request", {status: 400})
    }

    if (!user) {
        return new Response("Unauthorized", {status: 401})
    }

    await prisma.tierlist.update({
        where: {
            id: myTierlist.id
        },
        data: {
            name: myTierlist.name,
            tiers: {
                deleteMany: {},
                create: myTierlist.tiers.map(tier => {
                    return {
                        name: tier.name,
                        color: tier.color,
                        items: {
                            create: tier.items.map(item => {
                                return {
                                    encodedImage: item.encodedImage
                                }
                            })
                        }
                    }
                })
            }
        }
    }).catch(() => {
        return new Response("Internal Server Error", {status: 500})
    })

    return new Response("OK", {status: 200})
}
