import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import Todo from "./Todo";

test('renders content', () => {
  const todo = {
    text: 'test todo',
    done: false
  }
  
  const onClickDelete = () => {}
  const onClickComplete = () => {}

  render(<Todo todo={todo} onClickDelete={onClickDelete} onClickComplete={onClickComplete} />)
  
  screen.debug()

  const element = screen.getByText('test todo')
  expect(element).toBeDefined()
})