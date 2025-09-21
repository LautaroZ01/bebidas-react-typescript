import { StateCreator } from 'zustand'
import AIService from '../services/AIService'

export type AISlice = {
    recipe: string
    isGeneration: boolean
    generateRecipe: (prompt: string) => Promise<void>
}

export const createAISlice: StateCreator<AISlice> = (set) => ({
    recipe: '',
    isGeneration: false,
    generateRecipe: async (prompt) => {
        set({ recipe: '', isGeneration: true })
        const data = await AIService.generateRecipe(prompt)

        for await (const textPart of data) {
            set((state => ({
                recipe: state.recipe + textPart,
            })))
        }
        set({ isGeneration: false })
    }
})