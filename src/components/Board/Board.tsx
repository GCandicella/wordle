'use client'
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";

export default function Board(){
    const guesses = useSelector((state: RootState) => state.guesses.guesses)
    return (
        <div>
            Board
            {guesses.length}
        </div>
    )
}