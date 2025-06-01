import { ChangeDetectionStrategy, Component, HostBinding, input } from '@angular/core';

@Component({
  selector: 'calculator-button',
  imports: [],
  templateUrl: './calculator-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'w-1/4 border-r border-b border-indigo-400',
  }
})
export class CalculatorButtonComponent { 
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
}
