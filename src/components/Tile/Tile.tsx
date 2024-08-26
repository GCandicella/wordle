'use client'

import styles from "./Tile.module.scss"

const Tile = ({value}) =>{
    return (
        <div className={styles.tile}>
            {value}
        </div>
    )
}

Tile.Correct = ({value}) => {
    return (
        <div className={`${styles.tile} ${styles.correct}`}>
            {value}
        </div>
    )
}

Tile.Close = ({value}) => {
    return (
        <div className={`${styles.tile} ${styles.close}`}>
            {value}
        </div>
    )
}

export default Tile