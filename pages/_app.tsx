import { SessionProvider } from 'next-auth/react';
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}) {
    return (
        <SessionProvider session={session}>
            <ChakraProvider>
            <Component {...pageProps} />
            </ChakraProvider>
        </SessionProvider>
    );
}
