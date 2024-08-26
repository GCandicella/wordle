'use client'

import Tile from "@/components/Tile/Tile";
import styles from "./Guess.module.scss";

export default function Guess({guess, solution}) {
    return (
        <div className={styles.guess}>
            {solution.split("").map((letter, i) => {
                if (guess[i] === letter) {
                    return <Tile.Correct key={i} value={guess[i]}/>
                } else if (solution.includes(guess[i])) {
                    return <Tile.Close key={i} value={guess[i]}/>
                } else {
                    return <Tile key={i} value={guess[i]}/>
                }
            })}
        </div>
    )
}