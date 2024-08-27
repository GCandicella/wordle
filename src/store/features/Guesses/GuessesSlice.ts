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

const checkGameStatus = (state: GuessesState, solution: string) => {
    let total = 0
    state.guesses.map((guess, index) => {
        if (guess.join('') === solution) {
            state.isGameWon = true
            state.isGameOver = true
            return false; // game over
        }else {
            total += guess.length
        }
    })
    if(total === state.guesses.length * 5){
        state.isGameOver = true
        return false; // game over
    }
    return true;
}

export const guessesSlice = createSlice({
    // Define state, actions, and reducers here
    name: 'guesses',
    initialState,
    reducers: {
        registerTile: (state: GuessesState, action) => {
            const input = action.payload.key
            console.log(action)
            switch (input) {
                case 'BACKSPACE':
                    state.guesses[state.currentGuess].pop()
                    break;
                case 'ENTER':
                    if (state.guesses[state.currentGuess].length === 5) {
                        if (checkGameStatus(state, action.payload.solution)) {
                            state.currentGuess += 1
                        }
                    } else {
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