import TierListInterface from "../../../interfaces/TierListInterface";
import {getServerSession} from "next-auth";
import {authOptions} from "../../../pages/api/auth/[...nextauth]";
import {Request} from "next/dist/compiled/@edge-runtime/primitives/fetch";
import prisma from "../../../lib/prismaClient";
import {Prisma} from "@prisma/client";

export async function POST(req:Request) {
    const myTierlist:TierListInterface = await req.json();
    const {user} = await getServerSession(authOptions) as any;

    if (!myTierlist) {
        return new Response(JSON.stringify({status: 400}), {status: 400})
    }

    if (!user) {
        return new Response(JSON.stringify({status: 401}), {status: 401})
    }

    prisma.tierlist.create({
        data: {
            name: myTierlist.name,
            media: myTierlist.media,
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
            userId: user.id
        }
    }).catch((e) => {
        console.log(e)
        return new Response(JSON.stringify({status: 500}), {status: 500})
    })

    return new Response(JSON.stringify({status: 201}), {status: 201})
}

export async function GET(req:Request) {
    // Si on a un id dans l'url, on renvoie la tierlist correspondante
    const {user} = await getServerSession(authOptions) || {} as any;
    if (req.url.includes("id")) {
        const id = req.url.split("=")[1];
        // Get tierlist by id and user
        // Must get total votes count
        const tierlist = await prisma.tierlist.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                name: true,
                media: true,
                user: {
                    select: {
                        id: true
                    }
                },
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
            return new Response(JSON.stringify({status: 500}), {status: 500})
        })

        if (!tierlist) {
            return new Response(JSON.stringify({status: 404}), {status: 404})
        }

        return new Response(JSON.stringify(tierlist), {status: 200})
    }
    // get tierlists, score, and vote of user
    const tierlists = await prisma.tierlist.findMany({
        select: {
            id: true,
            name: true,
            media: true,
            votes: {
                select: {
                    points: true,
                },
                where: {
                    userId: user ? user.id : '0'
                }
            },
            score: true
        }
    }).catch(() => {
        return new Response(JSON.stringify({status: 500}), {status: 500})
    })

    return new Response(JSON.stringify(tierlists), {status: 200})
}

export async function DELETE(req:Request) {
    const {id} = await req.json();
    const {user} = await getServerSession(authOptions) as any;

    if (!id) {
        return new Response(JSON.stringify({status: 400}), {status: 400})
    }

    if (!user) {
        return new Response(JSON.stringify({status: 401}), {status: 401})
    }

    await prisma.tierlist.delete({
        where: {
            id
        }
    }).catch(() => {
        return new Response(JSON.stringify({status: 500}), {status: 500})
    })

    return new Response(JSON.stringify({status: 200}), {status: 200})
}

export async function PUT(req:Request) {
    const myTierlist:TierListInterface = await req.json();
    const {user} = await getServerSession(authOptions) as any;

    if (!myTierlist) {
        return new Response(JSON.stringify({status: 400}), {status: 400})
    }

    if (!user && !user.id) {
        return new Response(JSON.stringify({status: 401}), {status: 401})
    }

    // If user owns tierlist
    const tierlist = await prisma.tierlist.findUnique({
        where: {
            id: myTierlist.id
        },
        select: {
            userId: true
        }
    }).catch(() => {
        return new Response(JSON.stringify({status: 500}), {status: 500})
    }) as Prisma.TierlistGetPayload<{ select: { userId: true; }; }>

    if (!tierlist || tierlist.userId !== user.id) {
        return new Response(JSON.stringify({status: 401}), {status: 401})
    }

    await prisma.tierlist.update({
        where: {
            id: myTierlist.id
        },
        data: {
            name: myTierlist.name,
            media: myTierlist.media,
            tiers: {
                deleteMany: {},
                create: myTierlist.tiers && myTierlist.tiers.map(tier => {
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
        return new Response(JSON.stringify({status: 500}), {status: 500})
    })

    return new Response(JSON.stringify({status: 200}), {status: 200})
}
