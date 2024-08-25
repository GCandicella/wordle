'use client'

import styles from "./Tile.module.scss"

export default function Tile({value}){
    return (
        <div className={styles.tile}>
            {value}
        </div>
    )
}