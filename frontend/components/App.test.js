import React from "react";
import AppFunctional from "./AppFunctional";
import { render, fireEvent, screen } from "@testing-library/react"

test('renders without errors', () => {
  render(<AppFunctional/>)
})
test('coordinates text renders', () => {
  render(<AppFunctional/>)
  const coordinates = document.querySelector('#coordinates');
  expect(coordinates.textContent).toBeTruthy();
})
test('steps text renders', () => {
  render(<AppFunctional/>)
  const steps = document.querySelector('#steps');
  expect(steps.textContent).toBeTruthy();
})
test('renders 9 squares', () => {
  render(<AppFunctional/>)
  const squares = document.querySelectorAll('.square');
  expect(squares.length).toBe(9)
})
test('typing changes input', () => {
  render(<AppFunctional/>)
  const input = document.querySelector('#email')
  fireEvent.change(input, { target: { value: 'lady@gaga.com' } })
  expect(input.value).toBe('lady@gaga.com')
})