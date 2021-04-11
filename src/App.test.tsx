import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'

test('renders fox bit nasa test', () => {
  render(<App />)
  const titleElement = screen.getByText(/Foxbit NASA Test/i)
  expect(titleElement).toBeInTheDocument()
})
