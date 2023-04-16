"use client";
import {
    Box,
    Flex,
    Avatar,
    HStack,
    IconButton,
    Link,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    Skeleton, SkeletonCircle,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, AddIcon, SettingsIcon } from '@chakra-ui/icons';
import {ReactNode} from "react";
import {useSession} from "next-auth/react";
import NextLink from "next/link";
import {FaStar} from "react-icons/all";
import styles from "styles/Header.module.scss";
const NavLink = ({ href, children }: { href: string, children: ReactNode }) => (
    <Link
        as={NextLink}
        px={3}
        py={1}
        fontSize={'md'}
        rounded={'md'}
        _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('gray.200', 'gray.700'),
        }}
        href={href}>
        {children}
    </Link>
);

export default function Header() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {data: session, status} = useSession();

    const links = [
        {
            name: 'Tierlists',
            href: '/tierlists'
        }
    ]
    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={20} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <HStack
                            as={'nav'}
                            spacing={4}
                            display={{ base: 'none', md: 'flex' }}>
                            <Box fontSize={'xl'} mr={4}>
                                <Link as={NextLink} href={'/'} display={'flex'} alignItems={'center'} justifyContent={'center'} className={styles.title}>
                                    Tierlist R<FaStar color={'#FFD700'} size={20}/>nker
                                </Link>
                            </Box>
                            {links.map((link,index) => (
                                <NavLink href={link.href} key={index}>{link.name}</NavLink>
                            ))}
                        </HStack>
                    </HStack>
                    <Flex alignItems={'center'}>
                        {status === 'loading' ? (
                            // Light radius
                            <Skeleton w={24} h={10} rounded={'full'} mr={4} />
                        ) : (
                            <Button
                                variant={'solid'}
                                colorScheme={'teal'}
                                size={'sm'}
                                rounded={'full'}
                                mr={4}
                                leftIcon={<AddIcon />}
                                w={24}
                                h={10}
                            >
                                <NextLink href={'/tierlists/create'}>
                                    {session ? 'Ajouter' : 'Demo'}
                                </NextLink>
                            </Button>
                        )}
                        <Menu>
                            <MenuButton
                                as={Button}
                                rounded={'full'}
                                variant={'link'}
                                cursor={'pointer'}
                                _hover={
                                    {
                                        textDecoration: 'none',
                                        bg: useColorModeValue('gray.300', 'gray.700'),
                                    }
                                }
                                minW={0}>
                                {status === 'loading' ? (
                                     <SkeletonCircle size="10" />
                                ) : (
                                <Avatar
                                    size={'sm'}
                                    src={session ? 'https://img.icons8.com/officel/256/user.png' : ''}
                                />
                                )}
                            </MenuButton>
                            <MenuList>
                                <MenuItem><SettingsIcon mr={2}/>Paramètres</MenuItem>
                                <MenuDivider />
                                <HStack p={4} mt={2} justifyContent={'center'}>
                                    {!session ? (
                                        <>
                                            <Button colorScheme="blue" variant="solid">
                                                <Link href="/auth/signin">Connexion</Link>
                                            </Button>
                                            <Button colorScheme="blue" variant="outline">
                                                <Link href="/auth/signup">Inscription</Link>
                                            </Button>
                                        </>
                                    ) : (
                                        <Button colorScheme="red" variant="outline">
                                            <Link href="/auth/signout">Déconnexion</Link>
                                        </Button>
                                    )}
                                </HStack>
                            </MenuList>
                        </Menu>
                    </Flex>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            {links.map((link,index) => (
                                <NavLink href={link.href} key={index}>{link.name}</NavLink>
                            ))}
                        </Stack>
                    </Box>
                ) : null}
            </Box>
        </>
    );
}
