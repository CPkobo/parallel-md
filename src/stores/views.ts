import { defineStore } from "pinia";

interface ViewsState {
    isDark: boolean;
    isInputing: boolean;
    isTable: boolean;
}

const data: ViewsState = {
    isDark: false,
    isInputing: true,
    isTable: false
}

export const useViews = defineStore('views', {
    state: () => data,
})