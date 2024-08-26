'use client'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/store/store";
import Guess from "@/components/Guess/Guess";
import {fetchWordThunk} from "@/store/features/Solution/SolutionSlice";
import {useEffect} from "react";
import {inspect} from "util";
import styles from "./Board.module.scss"
import {registerTile, registerTileBackspace} from "@/store/features/Guesses/GuessesSlice";

export default function Board() {
    const dispatch = useDispatch<AppDispatch>();
    const {word, error, status} = useSelector((state: RootState) => state.solution);
    const {guesses, errorMessage, currentGuess} = useSelector((state: RootState) => state.guesses)

    useEffect(() => {
        dispatch(fetchWordThunk());
    }, [dispatch]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            console.log(event.key.toUpperCase())
            dispatch(registerTile(event.key.toUpperCase()));
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div className={styles.board}>
            Welcome to the board - random word: {word}
            <div>
                <p>Alert: {errorMessage}</p>
            </div>
            <div className={styles.guessWrapper}>
                {JSON.stringify(guesses)}
                {guesses.map((guess, key) => {
                    return <div key={key}>
                        <Guess guess={guess} verify={currentGuess > key} solution={word}/>
                    </div>
                })}
            </div>
        </div>
    )
}