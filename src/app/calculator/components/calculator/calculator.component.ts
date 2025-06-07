import { ChangeDetectionStrategy, Component, computed, inject, viewChildren } from '@angular/core';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';
import { CalculatorService } from '@/calculator/services/calculator.service';

const keyEquivalents: Record<string, string> = {
  'Enter': '=',
  'Backspace': 'Backspace',
  'Escape': 'C',
  Clear: 'C',
  '÷': '/',
  'x': '*',
}

@Component({
  selector: 'app-calculator',
  imports: [CalculatorButtonComponent],
  templateUrl: './calculator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keyup)': 'handleKeyboardEvent($event)',
  }
})
export class CalculatorComponent {

  private calculatorService = inject(CalculatorService);

  calculatorButtons = viewChildren(CalculatorButtonComponent);

  resultText = computed(() => this.calculatorService.resultText());
  subResultText = computed(() => this.calculatorService.subResultText());
  lastOperator = computed(() => this.calculatorService.lastOperator());



  handleCLick(key: string) {
    this.calculatorService.constructNumber(keyEquivalents[key] ?? key);
  }

  handleKeyboardEvent(event: KeyboardEvent) {
    const key = keyEquivalents[event.key] ?? event.key;
    this.handleCLick(key);
    this.calculatorButtons().forEach((button) => {
      button.keyboardPressedStyle(key);
    })
  }
}
