import {createSlice} from "@reduxjs/toolkit";

export interface GuessesState {
    guesses: string[],
    currentGuess: number,
    isGameOver: boolean,
    isGameWon: boolean,
    errorMessage: string | null,
}

const initialState: GuessesState = {
    guesses: Array(6).fill(Array(0)),
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
        registerTile: (state: GuessesState, action) => {
            const input = action.payload
            switch (input) {
                case 'backspace':
                    state.guesses[state.currentGuess].pop()
                    break;
                case 'enter':
                    if (state.guesses[state.currentGuess].length === 5) {
                        state.currentGuess += 1
                    }else {
                        state.errorMessage = 'Each guess must be 5 characters long.'
                    }
                    break;
                default:
                    if (state.guesses[state.currentGuess].length < 5 && input.length === 1 && input !== ' ') {
                        state.guesses[state.currentGuess].push(input)
                    }
            }
        },
        registerGuess: (state: GuessesState, action) => {
            state.guesses.push(action.payload)
            state.currentGuess += 1
        }
    },
})

export const {registerGuess, registerTile} = guessesSlice.actions;
export default guessesSlice.reducer;