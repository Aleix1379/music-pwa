import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Album from '../components/album'
import {Album as AlbumType} from '../types/album'

const album: AlbumType = {
    id: 1,
    title: 'album-title',
    artist: {
        id: 1,
        name: 'artist-name',
        picture: 'artist-picture'
    },
    picture: 'album-picture'
}

const imageUrl = 'publicUrl'


jest.mock('@supabase/auth-helpers-react', () => ({
    useSupabaseClient: () => ({
        storage: {
            from: () => ({
                getPublicUrl: () => ({
                    data: {
                        publicUrl: imageUrl
                    }
                })
            })
        }
    })
}))

test('album component renders correctly', () => {
    render(<Album album={album}/>)
    expect(screen.getByText(album.title)).toBeInTheDocument()
    expect(screen.getByText(album.artist.name)).toBeInTheDocument()
    expect(screen.getByRole('img')).toHaveAttribute('src', imageUrl)
})

test('on click album component navigates to album page', () => {
    const {container} = render(<Album album={album}/>)
    expect(container.querySelector('a')).toHaveAttribute('href', `/albums/${album.id}`)
})
