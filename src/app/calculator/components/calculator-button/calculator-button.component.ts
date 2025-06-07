import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, input, output, signal, viewChild } from '@angular/core';

@Component({
  selector: 'calculator-button',
  imports: [],
  templateUrl: './calculator-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'w-1/4 border-r border-b border-indigo-400',
    '[class.bg-indigo-500]': 'isCommand()',
    '[class.bg-opacity-10]': 'isCommand()',
    '[class.text-2xl]': 'isCommand()',
    '[class.w-2/4]': 'isLongButton()',
  }
})
export class CalculatorButtonComponent { 

  isPressed = signal(false);

  onClick = output<string>();

  viewContent = viewChild<ElementRef<HTMLButtonElement>>('button');

  isCommand = input( false, {
    transform: (value: boolean | string) => typeof value === 'string' ? value === '' : value,
  } );
  isLongButton = input( false, {
    transform: (value: boolean | string) => typeof value ==='string'? value === '' : value,
  } );

  @HostBinding('class') get customsClass() {
    return{
      'bg-indigo-500': this.isCommand(),
      'bg-opacity-10': this.isCommand(),
      'text-2xl': this.isCommand(),
      'w-2/4' : this.isLongButton(),
    };
  } 

  handleClick(){
    if(!this.viewContent()?.nativeElement) return;
    const value = this.viewContent()?.nativeElement?.innerText ?? '';
    this.onClick.emit(value);
  }

  keyboardPressedStyle(key: string) {
    if(!this.viewContent()?.nativeElement) return;
    const value = this.viewContent()?.nativeElement?.innerText;
    if(value === key) {
      this.isPressed.set(true);
      setTimeout(() => {
        this.isPressed.set(false);
      }, 100);
    }
  }
}
