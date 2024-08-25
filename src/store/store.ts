import {configureStore} from "@reduxjs/toolkit";
import {guessesSlice} from "@/store/features/Guesses/GuessesSlice";

export const store = configureStore({
    reducer: {
        guesses: guessesSlice,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
