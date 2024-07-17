import Button, { ButtonSmall } from ".";
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Button', () => {
  test('Render button with correct text', () => {
    render(<Button>Click me</Button>);
    const buttonElement = screen.getByText(/Click me/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test('Render button with correct color', () => {
    render(<Button color="#FFF">Click me</Button>);
    const buttonElement = screen.getByText(/Click me/i);
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveStyle('color: #FFF');
  })

  test("Should show button", () => {
    const { debug } = render(<Button>Ativar</Button>);
    expect(screen.getByRole("button", { name: /ativar/i }));
    debug();
  });

  test("Should show small button", () => {
    const { debug } = render(<ButtonSmall>Ativar</ButtonSmall>);
    expect(screen.getByRole("button", { name: /ativar/i }));
    debug();
  });

  test('Renders small button with correct text', () => {
    render(<ButtonSmall>Click me</ButtonSmall>);
    const buttonElement = screen.getByText(/Click me/i);
    expect(buttonElement).toBeInTheDocument();
  });

  test('Renders small button with correct color', () => {
    render(<ButtonSmall color="#FFF">Click me</ButtonSmall>);
    const buttonElement = screen.getByText(/Click me/i);
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveStyle('color: #FFF');
  });

  test('Renders small button with correct background color', () => {
    render(<ButtonSmall bgcolor="#FFF">Click me</ButtonSmall>);
    const buttonElement = screen.getByText(/Click me/i);
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveStyle('background-color: #FFF');
  });
});
