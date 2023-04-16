import {getServerSession} from "next-auth";
import {authOptions} from "../../../../pages/api/auth/[...nextauth]";
import prisma from "../../../../lib/prismaClient";
import { Prisma } from "@prisma/client";

export async function POST(req:Request) {
    const {id, strVote} = await req.json();
    const vote = parseInt(strVote);
    const user = await getServerSession(authOptions) as {id:string}
    // If upvote or downvote
    if (!id || !strVote) {
        return new Response(JSON.stringify({status: 400}), {status: 400})
    }

    if (!user) {
        return new Response(JSON.stringify({status: 401}), {status: 401})
    }

    // Get vote of user
    const userVote = await prisma.vote.findUnique({
        where: {
            user_tierlist: {
                userId: user.id,
                tierlistId: id
            }
        },
        select: {
            id: true,
            points: true
        }
    }).catch(() => {
        return new Response(JSON.stringify({status: 500}), {status: 500})
    }) as Prisma.VoteGetPayload<{ select: { id: true; points: true; }; }>

    // If user has voted
    if (userVote) {

        let voteChange = 0;
        if (vote !== 0) {
            voteChange = vote === 1 && userVote.points === 1 ? 0 : vote === 1 && userVote.points === 0 ? 1 : vote === 1 && userVote.points === -1 ? 2 : vote === -1 && userVote.points === 1 ? -2 : vote === -1 && userVote.points === 0 ? -1 : vote === -1 && userVote.points === -1 ? 0 : 0
            await incrementVote(userVote.id, id, voteChange).catch(() => {
                return new Response(JSON.stringify({status: 500}), {status: 500})
            })
        } else {
            // If 0, delete vote
            await prisma.vote.delete({
                where: {
                    id: userVote.id
                }
            }).then(() => {
                prisma.tierlist.update({
                    where: {
                        id
                    },
                    data: {
                        score: {
                            increment: userVote.points === 1 ? -1 : 1
                        }
                    }
                }).catch(() => {
                    return new Response(JSON.stringify({status: 500}), {status: 500})
                })
            }).catch(() => {
                return new Response(JSON.stringify({status: 500}), {status: 500})
            })
        }
    } else {
        // If user has not voted
        if (vote !== 0) {
            await prisma.vote.create({
                data: {
                    points: vote === 1 ? 1 : -1,
                    tierlist: {
                        connect: {
                            id
                        }
                    },
                    user: {
                        connect: {
                            id: user.id
                        }
                    }
                }
            }).then(() => {
                prisma.tierlist.update({
                    where: {
                        id
                    },
                    data: {
                        score: {
                            increment: vote === 1 ? 1 : -1
                        }
                    }
                }).catch(() => {
                    return new Response(JSON.stringify({status: 500}), {status: 500})
                })
            }).catch(() => {
                return new Response(JSON.stringify({status: 500}), {status: 500})
            })
        }
    }

    return new Response(JSON.stringify({status:200}), {status: 200})


}

async function incrementVote(voteId: string, id: string, vote: number) {
    await prisma.vote.update({
        where: {
            id: voteId
        },
        data: {
            points: {
                increment: vote
            }
        }
    }).then(() => {
        prisma.tierlist.update({
            where: {
                id
            },
            data: {
                score: {
                    increment: vote
                }
            }
        }).catch(() => {
            return new Response(JSON.stringify({status: 500}), {status: 500})
        })
    }).catch(() => {
        return new Response(JSON.stringify({status: 500}), {status: 500})
    })
}
