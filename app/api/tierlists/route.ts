import {extractBody} from "../../../lib/utils";
import TierListInterface from "../../../interfaces/TierListInterface";
import {getServerSession} from "next-auth";
import {authOptions} from "../../../pages/api/auth/[...nextauth]";
export async function POST(req:Request) {
    const body = await extractBody(req) as Promise<TierListInterface>;
    const myTierlist:TierListInterface = await body;
    const user = await getServerSession(authOptions) as any;

    if (!myTierlist) {
        return new Response(JSON.stringify({status: 400}), {status: 400})
    }


    prisma.tierlist.create({
        data: {
            name: myTierlist.name,
            // @ts-ignore
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
            user: {
                connect: {
                    id: "6847e11d-148c-4664-ae34-3bfe88cf44a7"
                }
            }
        }
    }).catch((e) => {
        console.log(e)
        return new Response(JSON.stringify({status: 500}), {status: 500})
    })

    return new Response(JSON.stringify({status: 201}), {status: 200})
}

export async function GET(req:Request) {
    // Si on a un id dans l'url, on renvoie la tierlist correspondante
    if (req.url.includes("id")) {
        const user = await getServerSession(authOptions) as any;
        const id = req.url.split("=")[1];
        // Get tierlist by id and user
        const tierlist = await prisma.tierlist.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                name: true,
                // @ts-ignore
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
    const tierlists = await prisma.tierlist.findMany({
        select: {
            id: true,
            name: true,
            // @ts-ignore
            media: true,
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

    return new Response(JSON.stringify(tierlists), {status: 200})
}

export async function DELETE(req:Request) {
    const body = extractBody(req) as Promise<{ id: string }>;
    const {id} = await body;
    const user = await getServerSession(authOptions) as any;

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
    const body = await extractBody(req) as Promise<TierListInterface>;
    const myTierlist:TierListInterface = await body;
    const user = await getServerSession(authOptions) as any;

    if (!myTierlist) {
        return new Response(JSON.stringify({status: 400}), {status: 400})
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
        return new Response(JSON.stringify({status: 500}), {status: 500})
    })

    return new Response(JSON.stringify({status: 200}), {status: 200})
}
