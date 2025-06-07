import { Injectable, signal } from '@angular/core';

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators = ['+', '-', 'x', '÷', '*', '/'];
const specialOperators = ['+/-', '%', '.', '=', 'C', 'Backspace'];

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  resultText = signal('10');
  subResultText = signal('20');
  lastOperator = signal('+');

  constructNumber(value: string): void {
    console.log(value);
    // invalid check
    if (![...numbers, ...operators, ...specialOperators].includes(value)) {
      console.log('Invalid Input');
      return;
    }

    // check =
    if (value === '=') {
      this.calculateResult();
      return;
    }

    // check C
    if (value === 'C') {
      this.resultText.set('0');
      this.subResultText.set('0');
      this.lastOperator.set('+');
      return;
    }

    // check backspace
    if (value === 'Backspace') {
      if (this.resultText() === '0') {
        return;
      }
      // review negative numbers
      if (this.resultText().length === 1) {
        this.resultText.set('0');
        return;
      }
      this.resultText.update((prev) => prev.slice(0, -1));
      return;
    }

    // check operator
    if (operators.includes(value)) {
      this.calculateResult();
      this.lastOperator.set(value);
      this.subResultText.set(this.resultText());
      this.resultText.set('0');
      return;
    }

    // check max lenght
    if (this.resultText().length >= 10) {
      console.log('Max lenght reached');
      return;
    }

    // check .
    if (value === '.' && !this.resultText().includes('.')) {
      if (this.resultText() === '0' || this.resultText() === '') {
        this.resultText.set('0.');
        return;
      }
      this.resultText.update((prev) => prev + '.');
      return;
    }

    // check 0
    if (value === '0' && (this.resultText() === '0' || this.resultText() === '-0')) {
      return;
    }

    // check -
    if (value === '+/-') {
      if (this.resultText().includes('-')) {
        this.resultText.update((prev) => prev.slice(1));
        return;
      }
      this.resultText.update((prev) => '-' + prev);
      return;
    }

    // check number
    if (numbers.includes(value)) {
      if (this.resultText() === '-0') {
        this.resultText.set(`-${value}`);

        return;
      }
      if (this.resultText() === '0') {
        this.resultText.set(value);
        return;
      }
      this.resultText.update((prev) => prev + value);
      return;
    }
  }

  calculateResult(): void {
    const number1 = parseFloat(this.subResultText());
    const number2 = parseFloat(this.resultText());
    let result = 0;
    switch (this.lastOperator()) {
      case '+':
        result = number1 + number2;
        break;
      case '-':
        result = number1 - number2;
        break;
      case '*':
        result = number1 * number2;
        break;
      case '/':
        result = number1 / number2;
        break;
    }
    this.resultText.set(result.toString());
    this.subResultText.set('0');
  }
}
