'use client'

import Tile from "@/components/Tile/Tile";
import styles from "./Guess.module.scss";

export default function Guess({guess, length}) {
    return (
        <div className={styles.guess}>
            {[...Array(length)].map((e, i) => {
                return <Tile key={i} value={guess[i]}/>
            })}
        </div>
    )
}