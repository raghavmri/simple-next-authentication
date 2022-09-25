import {
    Box,
    Center,
    Container,
    Flex,
    Icon,
    VStack,
    Button,
} from '@chakra-ui/react';
import {
    getProviders,
    getSession,
    GetSessionParams,
    signIn,
    useSession,
} from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { FaDiscord, FaGithub } from 'react-icons/fa';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
export default function SignIn({ providers }) {
    const router = useRouter();
    const user = useSession();
    useEffect(() => {
        // if (router.query.callbackUrl) {
        //     router.push(router.query.callbackUrl as string);
        // }
        if (user?.data?.user) {
            router.push('/');
        }
    });
    let icons = [
        {
            name: 'Google',
            icon: FcGoogle,
        },
        {
            name: 'Github',
            icon: FaGithub,
        },
        {
            name: 'Discord',
            icon: FaDiscord,
        },
    ];
    return (
        <Flex h="100vh" alignItems={'center'} justifyContent="center">
            <Box
                border="1px"
                borderColor="gray.200"
                p={4}
                rounded="xl"
                // translateY={'50%'}
            >
                <VStack>
                    {Object.values(providers).map((provider: any) => (
                        <Button
                            leftIcon={
                                <Icon
                                    as={
                                        icons.find(
                                            (i) =>
                                                i.name.toLowerCase() ===
                                                provider.name.toLowerCase()
                                        ).icon
                                    }
                                />
                            }
                            onClick={async () => signIn(provider.id)}
                            key={provider.id}
                        >{`Sign in with ${provider.name}`}</Button>
                    ))}
                </VStack>
            </Box>
        </Flex>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);
    const providers = await getProviders();
    // console.log(context.query);
    if (session) {
        return {
            redirect: {
                destination: (context?.query?.callbackUrl as string) || '/',
                permanent: false,
            },
        };
    }
    return {
        props: { providers },
    };
};
