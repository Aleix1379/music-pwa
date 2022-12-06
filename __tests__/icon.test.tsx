import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Icon from "../components/icon"

const icon = 'play'

jest.mock('@fortawesome/react-fontawesome', () => ({
    FontAwesomeIcon: () => <div role="img" data-icon={icon}>icon</div>
}))

test('icon component renders correctly', () => {
    render(<Icon name="play"/>)
    expect(screen.getByRole('img')).toHaveAttribute('data-icon', 'play')
})
