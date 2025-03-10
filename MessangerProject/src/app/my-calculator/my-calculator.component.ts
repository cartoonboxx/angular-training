import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {KeyValuePipe, NgForOf, NgIf} from '@angular/common';

interface CalcGroup {
  first: CalcVar
  second: CalcVar
  operation: CalcOperations
}

interface CalcVar {
  value: number;
  modifiers: CalcModifiers
}

enum CalcOperations {
  plus = '+',
  minus = '-',
  multiply = '*',
  divide = '/'
}

enum CalcModifiers {
  none = 'none',
  sin = 'sin',
  cos = 'cos',
  square = 'square',
}

@Component({
  selector: 'app-my-calculator',
  imports: [
    FormsModule,
    NgForOf,
    KeyValuePipe,
    NgIf
  ],
  templateUrl: './my-calculator.component.html',
  styleUrl: './my-calculator.component.scss'
})
export class MyCalculatorComponent {
    public calcOperations = CalcOperations

    public calcModifiers = CalcModifiers;

    public calcGroups: CalcGroup[] = [
      {
        first: {
          value: 5,
          modifiers: CalcModifiers.none
        },
        second: {
          value: 5,
          modifiers: CalcModifiers.none
        },
        operation: this.calcOperations.plus
      }
    ]

    public result: number|undefined = undefined;

    public historyCalc: string[] = []

    public operationsBetweenGroups: CalcOperations[] = []

    public addGroup(): void {
        this.calcGroups.push(
          {
            first: {
              value: 0,
              modifiers: this.calcModifiers.none
            },
            second: {
              value: 0,
              modifiers: this.calcModifiers.none
            },
            operation: this.calcOperations.plus
          }
        )

      this.operationsBetweenGroups.push(CalcOperations.plus)
    }

    public removeGroup(index: number): void {
        this.calcGroups.splice(index, 1)
    }

    public calcGroup() {
        let result = 0;
        let tempHistory: string[] = [];

        this.calcGroups.forEach((group, i) => {
            if (i === 0) {
              result = this.calc(this.calcValueWithModif(group.first),
                this.calcValueWithModif(group.second),
                group.operation)
            } else {
              let tempResult = this.calc(this.calcValueWithModif(group.first),
                this.calcValueWithModif(group.second),
                group.operation)
              result = this.calc(result, tempResult, this.operationsBetweenGroups[i - 1])
            }

            tempHistory.push(
              `(
              ${group.first.modifiers !== CalcModifiers.none ? group.first.modifiers : ''}
              ${group.first.value}
              ${group.second.modifiers !== CalcModifiers.none ? group.second.modifiers : ''}
              )`
            )
        })
      tempHistory.push(`= ${result}`)
      this.historyCalc.push(tempHistory.join(' '))

      this.result = result
    }

    public calcValueWithModif(value: CalcVar) {
      switch (value.modifiers) {
        case CalcModifiers.none:
          return value.value;
        case CalcModifiers.cos:
          return Math.cos(value.value);
        case CalcModifiers.sin:
          return Math.sin(value.value);
        case CalcModifiers.square:
          return Math.pow(value.value, 2);
      }
    }

    public calc(first: number, second: number, operation: CalcOperations) {
        switch (operation) {
          case CalcOperations.plus:
            return first + second
          case CalcOperations.minus:
            return first - second
          case CalcOperations.divide:
            return first / second
          case CalcOperations.multiply:
            return first * second
        }

        // this.updateHistory()
    }

    // public updateHistory() {
    //
    // }
}
