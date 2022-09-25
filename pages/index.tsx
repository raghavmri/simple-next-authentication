import { Center, VStack, Text, Button } from '@chakra-ui/react';
import { useSession, signIn } from 'next-auth/react';
import React from 'react';

export default function Home() {
    const { data } = useSession();
    return (
        <Center height="100%" my={'10rem'}>
            <VStack>
                <Text fontSize={'2xl'}>
                    Current User: {data?.user?.email || 'None'}{' '}
                </Text>

                {!data?.user && <Button onClick={() => signIn()}>Login</Button>}
            </VStack>
        </Center>
    );
}
