import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { creatRecipeSlice, RecipesSliceType } from './recipeSlice'
import { createFavoriteSlice, FavoriteSliceType } from './favoriteSlice'
import { createNotificationSlice, NotificationSliceType } from './notificationSlice'
import { AISlice, createAISlice } from './aiSlice'

export const useAppStore = create<RecipesSliceType & FavoriteSliceType & NotificationSliceType & AISlice>()(devtools((...a) => ({
    ...creatRecipeSlice(...a),
    ...createFavoriteSlice(...a),
    ...createNotificationSlice(...a),
    ...createAISlice(...a)
})))