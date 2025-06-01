"use client"
import { ThemeProvider } from '@/components/theme-provider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React from 'react'


export const Providers = ({children}:{children:React.ReactNode}) => {
     const queryClient = new QueryClient()
  return (
     <QueryClientProvider client={queryClient}>
        <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        enableColorScheme
        >
            {children}
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
     </QueryClientProvider>
  )
}
