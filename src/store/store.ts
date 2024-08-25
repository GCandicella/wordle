import {configureStore} from "@reduxjs/toolkit";
import guessesReducer from "@/store/features/Guesses/GuessesSlice";

export const store = configureStore({
    reducer: {
        guesses: guessesReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
