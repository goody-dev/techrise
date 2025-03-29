import { createStore } from "zustand";
import { extension } from '../page'
import data from '../data.json'


export type ExtensionsState = {
    extensions: extension[]
}
export type ExtensionsActions = {
    activateExtension: (id: extension["id"]) => void
    deactivateExtension: (id: extension["id"]) => void
    deleteExtension: (id: extension["id"]) => void
    addExtension: (id: extension["id"]) => void
}

export type ExtensionsStore = ExtensionsState & ExtensionsActions

export const initExtensionsStore = (): ExtensionsState => {
    return {
        extensions: data,
    }
}

export const defaultInitState: ExtensionsState = {
    extensions: []
}

export const createExtensionsStore = (
    initState: ExtensionsState = defaultInitState,
) => {
    return createStore<ExtensionsStore>()((set) => ({
        ...initState,
        activateExtension: (id: extension["id"]) => set((state) => ({ })),
        deactivateExtension: (id: extension["id"]) => set((state) => ({})),
        addExtension: (id: extension["id"]) => set((state) => ({ })) ,
        deleteExtension: (id: extension["id"]) => set((state) => ({ })),
    }))
}