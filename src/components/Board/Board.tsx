'use client'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/store/store";
import Guess from "@/components/Guess/Guess";
import {fetchWordThunk} from "@/store/features/Solution/SolutionSlice";
import {useEffect} from "react";

export default function Board(){
    const dispatch = useDispatch<AppDispatch>();
    const { word, error, status } = useSelector((state: RootState) => state.solution);
    const guesses = useSelector((state: RootState) => state.guesses.guesses)

    useEffect(() => {
        dispatch(fetchWordThunk());
    }, [dispatch]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            Welcome to the board - random word: {word}
            {guesses.map((guess, key) => {
                return <div key={key}><Guess guess={guess}/></div>
            })}
        </div>
    )
}