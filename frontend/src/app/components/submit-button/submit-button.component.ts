import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-submit-button',
  templateUrl: './submit-button.component.html',
  styleUrls: ['./submit-button.component.css']
})
export class SubmitButtonComponent {

  @Input() isLoading: Boolean = false;
  @Input() title: string = '';

  @Output() submitClicked: EventEmitter<any> = new EventEmitter();

  onClick() {
    this.submitClicked.emit();
  }
}
