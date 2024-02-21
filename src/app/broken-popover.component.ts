import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { PopoverDirective } from './popover-directive';

@Component({
  selector: 'app-broken-popover',
  standalone: true,
  imports: [PopoverDirective, JsonPipe],
  template: `
    <div
      appPopover
      [isPopoverVisible]="isPopoverVisible()"
      [popoverTemplate]="popoverTemplate"
    >
      Div with popover directive containing signals
    </div>

    <br /><br />

    <button (click)="showPopover()">Show popover</button>
    <button (click)="doAsyncStuff()">
      Do async logic to populate popover template
    </button>

    <!-- If we use this template, the 'isPopoverVisible' effect in PopoverDirective will fire twice -->
    <ng-template #popoverTemplate> Template {{ myData() | json }} </ng-template>
  `,
})
export class BrokenPopoverExample {
  isPopoverVisible = signal(false);
  myData = signal<Record<string, unknown> | undefined>(undefined);

  constructor() {
    console.log('=========== BrokenPopoverExample ===========');
  }

  showPopover() {
    this.isPopoverVisible.set(true);
  }

  async doAsyncStuff() {
    console.log('pre');
    await new Promise((res) => setTimeout(() => res(void 0), 500));
    console.log('post');

    this.myData.set({ foo: 'bar' });
  }
}
