"use client";
import  'react-placeholder/lib/reactPlaceholder.css';
import Link from "next/link";
import {Box, Button, ButtonGroup, Flex, IconButton, Image, Skeleton} from "@chakra-ui/react";
import {ArrowForwardIcon, ArrowUpIcon, ArrowDownIcon} from "@chakra-ui/icons";

type CardData = {
    id:string,
    name: string,
    media: string,
}
export default function CardTierList({loading=true, data}: {loading?: boolean, data?: CardData}) {
    const {name, media} = data || {name: "", media: ""};
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
                            20000
                            <ButtonGroup size="md" isAttached m={2} ml={4} gap={1}>
                                <IconButton aria-label={"Upvote"} icon={<ArrowUpIcon/>} rounded={"full"}
                                            colorScheme={"green"} variant={"outline"}/>
                                <IconButton aria-label={"Downvote"} icon={<ArrowDownIcon/>} rounded={"full"}
                                            colorScheme={"red"} variant={"outline"}/>
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
