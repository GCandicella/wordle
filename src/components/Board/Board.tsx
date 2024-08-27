'use client'
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/store/store";
import Guess from "@/components/Guess/Guess";
import {fetchWordThunk} from "@/store/features/Solution/SolutionSlice";
import {useEffect} from "react";
import styles from "./Board.module.scss"
import {registerTile} from "@/store/features/Guesses/GuessesSlice";
import Message from "@/components/Message/Message";

export default function Board() {
    const dispatch = useDispatch<AppDispatch>();
    const {word, error, status} = useSelector((state: RootState) => state.solution);
    const {guesses, errorMessage, currentGuess, isGameOver, isGameWon} = useSelector((state: RootState) => state.guesses)

    useEffect(() => {
        dispatch(fetchWordThunk());
    }, [dispatch]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            dispatch(registerTile({key: event.key.toUpperCase(), solution: word}));
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [word]);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div className={styles.board}>
            Welcome to the board - random word: {word}
            {errorMessage && <Message>{errorMessage}</Message>}
            {isGameOver && isGameWon && <p>Congratulations!</p>}
            {isGameOver && !isGameWon && <p>End of match</p>}
            <div className={styles.guessWrapper}>
                {guesses.map((guess, key) => {
                    return <div key={key}>
                        <Guess guess={guess} verify={currentGuess > key} solution={word}/>
                    </div>
                })}
            </div>
        </div>
    )
}