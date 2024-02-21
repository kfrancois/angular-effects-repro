import { Component, signal } from '@angular/core';
import { PopoverDirective } from './popover-directive';

@Component({
  selector: 'app-working-popover',
  standalone: true,
  imports: [PopoverDirective],
  template: `
    <div
      appPopover
      [isPopoverVisible]="isPopoverVisible()"
      [popoverTemplate]="popoverTemplate"
    >
      Div with popover directive containing NO signals
    </div>

    <br /><br />

    <button (click)="showPopover()">Show popover</button>
    <button (click)="doAsyncStuff()">
      Do async logic to populate popover template
    </button>

    <!-- If we use this template, the 'isPopoverVisible' effect in PopoverDirective will not fire twice -->
    <ng-template #popoverTemplate> Template </ng-template>
  `,
})
export class WorkingPopoverExample {
  isPopoverVisible = signal(false);
  myData = signal<Record<string, unknown> | undefined>(undefined);

  constructor() {
    console.log('=========== WorkingPopoverExample ===========');
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
