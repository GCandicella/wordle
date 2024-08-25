import {configureStore} from "@reduxjs/toolkit";
import guessesReducer from "@/store/features/Guesses/GuessesSlice";
import solutionReducer from "@/store/features/Solution/SolutionSlice";

export const store = configureStore({
    reducer: {
        guesses: guessesReducer,
        solution: solutionReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
