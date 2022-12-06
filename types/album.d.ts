import {Artist} from "./artists";

export interface Album {
    id: number
    title: string
    picture: string
    artist: Artist
}
