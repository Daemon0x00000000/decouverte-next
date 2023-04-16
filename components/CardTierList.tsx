"use client";
import Link from "next/link";
import {Box, Button, ButtonGroup, Flex, IconButton, Image, Skeleton, useBoolean} from "@chakra-ui/react";
import {ArrowForwardIcon, ArrowUpIcon, ArrowDownIcon} from "@chakra-ui/icons";
import {useCallback, useEffect} from "react";
import {useMutation} from "@tanstack/react-query";
import {toast} from "react-hot-toast";

type CardData = {
    id:string,
    name: string,
    media: string,
    votes: {points:string}[],
    score: number
}


export default function CardTierList({loading=true, data}: {loading?: boolean, data?: CardData}) {
    const {name, media} = data || {name: "", media: ""};
    const [upvote, setUpvote] = useBoolean();
    const [downvote, setDownvote] = useBoolean();
    const isVoted = useCallback((voteType:string) => {
        return data?.votes.find(vote => vote.points == (voteType === 'upvote' ? '1' : '-1')) !== undefined;
    }, [data?.votes]);

    const toggleVote = useCallback((voteType:string) => {
        voteType === 'upvote'
            ? (downvote ? setDownvote.toggle() : null, setUpvote.toggle())
            : (upvote ? setUpvote.toggle() : null, setDownvote.toggle());
    }, [downvote, upvote, setDownvote, setUpvote]);

    const vote = useMutation(async (voteType:string) => {
        const res = await fetch(`/api/tierlists/vote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: data?.id,
                strVote: voteType === 'upvote' ? isVoted(voteType) ? '0' : '1' : isVoted(voteType) ? '0' : '-1'
            })
        })
        return res.json();
    }, {
        onError: () => {
            toast.error("Une erreur est survenue lors du vote");
        }
    })

    const handleVote = useCallback((voteType:string) => {
        toggleVote(voteType);
        vote.mutate(voteType);
    }, [toggleVote, vote]);

    useEffect(() => {
        if (isVoted('upvote')) setUpvote.on();
        if (isVoted('downvote')) setDownvote.on();
    }, [isVoted, setDownvote, setUpvote]);

    return (
        <Flex p={50} alignItems="center" justifyContent="center">
            {loading ? (
                <Skeleton width={500} height={350} rounded={"lg"} />
            ) : (
            <Box
                bg={'white'}
                maxW="lg"
                borderWidth="1px"
                rounded="lg"
                shadow="lg"
                position="relative">

                <Image
                    src={media}
                    alt={`Picture of`}
                    roundedTop="lg"
                    minH={200}
                    maxH={200}
                    minW={500}
                    maxW={500}
                />

                <Box p="6">
                    <Flex mt="1" justifyContent="space-between" alignContent="center">
                        <Box
                            fontSize="2xl"
                            fontWeight="semibold"
                            as="h4"
                            lineHeight="tight"
                            isTruncated>
                            {name}
                        </Box>
                    </Flex>

                    <Flex justifyContent="space-between" alignContent="center">
                        <Box fontSize="2xl" color={'gray.800'}>
                            {data?.score}
                            <ButtonGroup size="md" isAttached m={2} ml={4} gap={1}>
                                <IconButton aria-label={"Upvote"} icon={<ArrowUpIcon/>} rounded={"full"}
                                            colorScheme={"green"} onClick={() => handleVote('upvote')} variant={upvote ? "solid" : "outline"}/>
                                <IconButton aria-label={"Downvote"} icon={<ArrowDownIcon/>} rounded={"full"}
                                            colorScheme={"red"} onClick={() => handleVote('downvote')} variant={downvote ? "solid" : "outline"}/>
                            </ButtonGroup>
                        </Box>
                        <Box fontSize="2xl" color={'gray.800'}>
                                <Button rightIcon={<ArrowForwardIcon/>} colorScheme='teal' variant='outline'>
                                    <Link href={`/tierlists/${data?.id}`}>
                                        Voir
                                    </Link>
                                </Button>
                        </Box>
                    </Flex>
                </Box>
            </Box>
            )}
        </Flex>
    )
}
