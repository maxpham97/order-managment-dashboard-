import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import store from '../lib/store/store'

const queryClient = new QueryClient()

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </Provider>
        </BrowserRouter>
    )
}

export default Providers