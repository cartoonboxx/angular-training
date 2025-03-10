import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MyCalculatorComponent} from './my-calculator/my-calculator.component';

@Component({
  selector: 'app-root',
  imports: [
    MyCalculatorComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public title = 'I love angular';

  protected tooltip = 'Крутая подсказка';

  public showMessage() {
    alert("Hello world")
  }
}
