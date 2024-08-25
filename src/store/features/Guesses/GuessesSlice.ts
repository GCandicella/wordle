import {createSlice} from "@reduxjs/toolkit";

export interface GuessesState {
    guesses: number[],
    currentGuess: number,
    isGameOver: boolean,
    isGameWon: boolean,
    errorMessage: string | null,
}

const initialState: GuessesState = {
    guesses: [],
    currentGuess: 0,
    isGameOver: false,
    isGameWon: false,
    errorMessage: null,
}

export const guessesSlice = createSlice({
    // Define state, actions, and reducers here
    name: 'guesses',
    initialState,
    reducers: {
        registerGuess: (state: GuessesState, action) => {
            state.guesses.push(action.payload)
            state.currentGuess += 1
        }
    },
})

export const {registerGuess} = guessesSlice.actions;
export default guessesSlice.reducer;