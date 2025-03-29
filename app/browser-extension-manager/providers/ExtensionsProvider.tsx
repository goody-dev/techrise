'use client'

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import { type ExtensionsStore, createExtensionsStore, initExtensionsStore } from "../stores/ExtensionsStore";

export type ExtensionsStoreAPI = ReturnType<typeof createExtensionsStore>

export const ExtensionsStoreContext = createContext<ExtensionsStoreAPI | undefined>(
    undefined,
)

export interface ExtensionsStoreProviderProps {
    children: ReactNode
}

export const ExtensionsStoreProvider = ({
    children
}: ExtensionsStoreProviderProps) => {
    const storeRef = useRef<ExtensionsStoreAPI | null>(null)

    if(!storeRef.current) {
        storeRef.current = createExtensionsStore(initExtensionsStore())
    }

    return (
        <ExtensionsStoreContext.Provider value={storeRef.current}>
            {children}
        </ExtensionsStoreContext.Provider>
    )
}

export const useExtensionsStore = <T,>(
    selector: (store: ExtensionsStore) => T,
): T => {
    const extensionsStoreContext = useContext(ExtensionsStoreContext);
    
    if(!ExtensionsStoreContext) {
        throw new Error(`useExtensionsStore must be used within ExtensionsStoreProvider`)
    }

    return useStore(extensionsStoreContext, selector)
}
