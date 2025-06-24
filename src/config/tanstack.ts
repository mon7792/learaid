import { QueryClient } from "@tanstack/react-query";

export function makeQueryClient(isServer: boolean = true) {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: isServer ? 0 : 5 * 60 * 1000,
                refetchOnWindowFocus: true
            },
        },
    })
}
