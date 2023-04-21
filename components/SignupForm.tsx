import {
    Box, Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    InputGroup,
    InputRightElement,
    Stack,
    Text,
    Input,
    Link,
    useColorModeValue
} from '@chakra-ui/react';
import {ViewIcon, ViewOffIcon} from "@chakra-ui/icons";
import {useState} from "react";
import NextLink from "next/link";
import {User} from "../app/auth/signup/page";
type SignupFormProps = {
  onSubmit: () => void;
  loading: boolean;
  user: User;
  setUser: (user: User) => void;
};
export const SignupForm = (signupFormProps: SignupFormProps) => {
    const {onSubmit,loading,user, setUser} = signupFormProps;
    const [showPassword, setShowPassword] = useState(false);
    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        S'inscrire
                    </Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        et commencer à créer des tierlists ✌️
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <Box>
                            <FormControl id="username" isRequired>
                                <FormLabel>Username</FormLabel>
                                <Input type="text" value={user.username} onChange={(e) => setUser({...user, username: e.target.value})} required />
                            </FormControl>
                        </Box>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input type="email" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} required />
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input type={showPassword ? 'text' : 'password'} value={user.password} onChange={(e) => setUser({...user, password: e.target.value})} required />
                                <InputRightElement h={'full'}>
                                    <Button
                                        variant={'ghost'}
                                        onClick={() =>
                                            setShowPassword((showPassword) => !showPassword)
                                        }>
                                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Stack spacing={10} pt={2}>
                            <Button
                                loadingText="Soumission"
                                size="lg"
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}
                                onClick={onSubmit}
                                isLoading={loading}
                            >
                                {/* eslint-disable-next-line react/no-unescaped-entities */}
                                S'inscrire
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={'center'}>
                                Déjà un compte ? <Link color={'blue.400'} as={NextLink} href={'/login'}>Connexion</Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
};
