import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

// Define the shape of the state
interface SolutionState {
    word: string;
    error: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

// Initial state
const initialState: SolutionState = {
    word: '',
    error: null,
    status: 'idle', // idle | loading | succeeded | failed
};

// Async Action Creator using createAsyncThunk
export const fetchWord = createAsyncThunk<string>(
    'solution/fetchWord',
    async () => {
        //const response = await fetch('https://api.frontendexpert.io/api/fe/wordle-words');
        //const words: string[] = await response.json();
        const words = ['Hello', 'World', 'Money'];

        // Select a random word from the array
        return words[Math.floor(Math.random() * words.length)];
    }
);

// Slice
export const solutionSlice = createSlice({
    // Define state, actions, and reducers here
    name: 'solution',
    initialState,
    reducers: {
        // Handle each state of the fetchWord async action
        fetchWordPending: (state) => {
            state.status = 'loading';
        },
        fetchWordFulfilled: (state, action: PayloadAction<string>) => {
            state.status = 'succeeded';
            state.word = action.payload;
            state.error = null;
        },
        fetchWordRejected: (state, action: PayloadAction<string>) => {
            state.status = 'failed';
            state.word = '';
            state.error = action.payload;
        },
    },
})

// Manually dispatch the appropriate actions based on the fetchWord thunk's lifecycle
export const fetchWordThunk = () => async (dispatch: any) => {
    try {
        dispatch(fetchWordPending());
        const word = await dispatch(fetchWord()).unwrap();
        dispatch(fetchWordFulfilled(word));
    } catch (err) {
        dispatch(fetchWordRejected(err.message));
    }
};

export const { fetchWordPending, fetchWordFulfilled, fetchWordRejected } = solutionSlice.actions;
export default solutionSlice.reducer;
