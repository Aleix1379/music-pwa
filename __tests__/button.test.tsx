import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Button from "../components/button";

const icon = 'play'

jest.mock('@fortawesome/react-fontawesome', () => ({
    FontAwesomeIcon: () => <div role="img" data-icon={icon}>icon</div>
}))

test('button component renders correctly', () => {
    render(<Button onClick={() => {
    }} className="test-class" children="test-children"/>)
    expect(screen.getByText('test-children')).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveClass('test-class')
})

test('button component renders correctly with icon', () => {
    render(<Button onClick={() => {
    }} className="test-class" children="test-children" icon={icon}/>)
    expect(screen.getByText('test-children')).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveClass('test-class')
    expect(screen.getByRole('img')).toHaveAttribute('data-icon', icon)
})

test('button component renders correctly with icon', () => {
    const onClick = jest.fn()
    render(<Button onClick={onClick} className="test-class" children="test-children" icon={icon}/>)
    screen.getByRole('button').click()
    expect(onClick).toHaveBeenCalled()
})

test('button component renders the correct children', () => {
    render(<Button onClick={() => {}} className="test-class">test-children</Button>)
    expect(screen.getByText('test-children')).toBeInTheDocument()
})
