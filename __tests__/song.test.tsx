import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Song from "../components/song"
import {Song as SongType} from "../types/song"

const song: SongType = {
    "id": 10,
    "title": "Pelikaani",
    "duration": 278,
    "track": 10
}

test('song component renders correctly', () => {
    render(<Song song={song} onclick={() => {}}/>)
    expect(screen.getByText(song.track.toString())).toBeInTheDocument()
    expect(screen.getByText(song.title)).toBeInTheDocument()
    expect(screen.getByText('4:38')).toBeInTheDocument()
})

test('test onclick is called with correct id', () => {
    const onclick = jest.fn()
    render(<Song song={song} onclick={onclick}/>)
    screen.getByRole('button').click()
    expect(onclick).toHaveBeenCalledWith(song.id)
})
