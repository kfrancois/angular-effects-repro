import {
  FlexibleConnectedPositionStrategy,
  Overlay,
  OverlayConfig,
  OverlayRef,
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import {
  Directive,
  ElementRef,
  TemplateRef,
  ViewContainerRef,
  effect,
  inject,
  input,
} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appPopover]',
})
export class PopoverDirective {
  isPopoverVisible = input.required<boolean>();
  popoverTemplate = input.required<TemplateRef<any>>();

  private element = inject(ElementRef<HTMLElement>);
  private viewContainerRef = inject(ViewContainerRef);
  private overlay = inject(Overlay);
  private portal?: TemplatePortal;
  private overlayRef: OverlayRef | null = null;
  private scrollStrategy = this.overlay.scrollStrategies.block();

  private popoverOpened = false;

  constructor() {
    effect(() => {
      console.log('isPopoverVisible:', this.isPopoverVisible());
      if (this.isPopoverVisible()) {
        this.openPopOver();
      } else {
        this.destroyPopover();
      }
    });
  }

  openPopOver(): void {
    // only open popover once, until it's destroyed
    if (this.popoverOpened) {
      return;
    }

    const overlayRef = this.createOverlay();
    const overlayConfig = overlayRef.getConfig();

    this.setPosition(
      overlayConfig.positionStrategy as FlexibleConnectedPositionStrategy
    );
    overlayRef.attach(this.getPortal());

    this.popoverOpened = true;
  }

  private destroyPopover() {
    if (!this.overlayRef) {
      return;
    }

    this.overlayRef.detach();

    this.popoverOpened = false;
  }

  /**
   * This method creates the overlay from the provided menu's template and saves its
   * OverlayRef so that it can be attached to the DOM when openMenu is called.
   */
  private createOverlay(): OverlayRef {
    if (!this.overlayRef) {
      const config = this.getOverlayConfig();
      this.overlayRef = this.overlay.create(config);

      // Consume the `keydownEvents` in order to prevent them from going to another overlay.
      // Ideally we'd also have our keyboard event logic in here, however doing so will
      this.overlayRef.keydownEvents().subscribe();
    }

    return this.overlayRef;
  }

  private getOverlayConfig(): OverlayConfig {
    return new OverlayConfig({
      positionStrategy: this.overlay
        .position()
        .flexibleConnectedTo(this.element)
        .withLockedPosition(),
      scrollStrategy: this.scrollStrategy,
    });
  }

  private setPosition(positionStrategy: FlexibleConnectedPositionStrategy) {
    positionStrategy.withPositions([
      { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top' },
    ]);
  }

  /** Gets the portal that should be attached to the overlay. */
  private getPortal(): TemplatePortal {
    if (!this.portal || this.portal.templateRef !== this.popoverTemplate()) {
      this.portal = new TemplatePortal(
        this.popoverTemplate() as TemplateRef<any>,
        this.viewContainerRef
      );
    }

    return this.portal;
  }
}
