"use client";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react';
import {ReactNode, useState} from "react";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {Toaster} from "react-hot-toast";
import { ChakraProvider } from '@chakra-ui/react';

export default function Providers({ children }: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient())

    return (
        <QueryClientProvider client={queryClient}>
            <SessionProvider>
                <ChakraProvider>
                    <Toaster />
                    {children}
                </ChakraProvider>
            </SessionProvider>
            <ReactQueryDevtools initialIsOpen={true} />
        </QueryClientProvider>
    )
}
