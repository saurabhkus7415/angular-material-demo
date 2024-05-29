import { A11yModule, FocusOrigin } from '@angular/cdk/a11y';
import {
  ChangeDetectorRef,
  Component,
  Inject,
  NgZone,
  OnDestroy,
  AfterViewInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ElementRef,
} from '@angular/core';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { FormsModule } from '@angular/forms';
import {
  Dialog,
  DialogRef,
  DIALOG_DATA,
  DialogModule,
} from '@angular/cdk/dialog';
import { OverlayModule } from '@angular/cdk/overlay';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { Subject } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { takeUntil } from 'rxjs/operators';
import { CdkListbox, CdkOption } from '@angular/cdk/listbox';
import { CdkContextMenuTrigger, CdkMenuItem, CdkMenu } from '@angular/cdk/menu';
import {
  getSupportedInputTypes,
  Platform,
  supportsPassiveEventListeners,
  supportsScrollBehavior,
} from '@angular/cdk/platform';
import {
  ComponentPortal,
  DomPortal,
  Portal,
  TemplatePortal,
  PortalModule,
} from '@angular/cdk/portal';
export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-cdk',
  standalone: true,
  imports: [
    A11yModule,
    CdkAccordionModule,
    DialogModule,
    FormsModule,
    ClipboardModule,
    CdkDrag,
    CdkListbox,
    CdkOption,
    CdkContextMenuTrigger,
    CdkMenu,
    CdkMenuItem,
    OverlayModule,
    PortalModule,
  ],
  templateUrl: './cdk.component.html',
  styleUrl: './cdk.component.scss',
})
export class CdkComponent implements OnDestroy {
  destroyed = new Subject<void>();
  isOpen = false;
  currentScreenSize!: string;
  @ViewChild('templatePortalContent')
  templatePortalContent!: TemplateRef<unknown>;
  @ViewChild('domPortalContent') domPortalContent!: ElementRef<HTMLElement>;

  selectedPortal!: Portal<any>;
  componentPortal!: ComponentPortal<ComponentPortalExample>;
  templatePortal!: TemplatePortal<any>;
  domPortal!: DomPortal<any>;
  features = ['Hydrodynamic', 'Port & Starboard Attachments', 'Turbo Drive'];
  // Create a map to display breakpoint names for demonstration purposes.
  displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    [Breakpoints.Small, 'Small'],
    [Breakpoints.Medium, 'Medium'],
    [Breakpoints.Large, 'Large'],
    [Breakpoints.XLarge, 'XLarge'],
  ]);
  animal: string | undefined;
  name!: string;
  supportedInputTypes = Array.from(getSupportedInputTypes()).join(', ');
  supportsPassiveEventListeners = supportsPassiveEventListeners();
  supportsScrollBehavior = supportsScrollBehavior();
  value =
    `Did you ever hear the tragedy of Darth Plagueis The Wise? I thought not. It's not ` +
    `a story the Jedi would tell you. It's a Sith legend. Darth Plagueis was a Dark Lord ` +
    `of the Sith, so powerful and so wise he could use the Force to influence the ` +
    `midichlorians to create life… He had such a knowledge of the dark side that he could ` +
    `even keep the ones he cared about from dying. The dark side of the Force is a pathway ` +
    `to many abilities some consider to be unnatural. He became so powerful… the only ` +
    `thing he was afraid of was losing his power, which eventually, of course, he did. ` +
    `Unfortunately, he taught his apprentice everything he knew, then his apprentice ` +
    `killed him in his sleep. Ironic. He could save others from death, but not himself.`;
  elementOrigin = this.formatOrigin(null);
  subtreeOrigin = this.formatOrigin(null);
  items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
  expandedIndex = 0;
  constructor(
    public platform: Platform,
    private _ngZone: NgZone,
    private _cdr: ChangeDetectorRef,
    public dialog: Dialog,
    breakpointObserver: BreakpointObserver,
    private _viewContainerRef: ViewContainerRef
  ) {
    breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(takeUntil(this.destroyed))
      .subscribe((result) => {
        for (const query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this.currentScreenSize =
              this.displayNameMap.get(query) ?? 'Unknown';
          }
        }
      });
  }
  formatOrigin(origin: FocusOrigin): string {
    return origin ? origin + ' focused' : 'blurred';
  }
  ngAfterViewInit() {
    this.componentPortal = new ComponentPortal(ComponentPortalExample);
    this.templatePortal = new TemplatePortal(this.templatePortalContent, this._viewContainerRef);
    this.domPortal = new DomPortal(this.domPortalContent);
  }
  // Workaround for the fact that (cdkFocusChange) emits outside NgZone.
  markForCheck() {
    this._ngZone.run(() => this._cdr.markForCheck());
  }
  openDialog(): void {
    const dialogRef = this.dialog.open<string>(CdkDialogOverviewExampleDialog, {
      width: '250px',
      data: { name: this.name, animal: this.animal },
    });

    dialogRef.closed.subscribe((result) => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
  projectContentChanged() {
    console.log('hit!');
  }
  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
@Component({
  selector: 'cdk-dialog-overview-example-dialog',
  templateUrl: '../cdk/cdk-dialog-overview-example-dialog.html',
  styleUrl: '../cdk/cdk-dialog-overview-example-dialog.css',
  standalone: true,
  imports: [FormsModule],
})
export class CdkDialogOverviewExampleDialog {
  constructor(
    public dialogRef: DialogRef<string>,
    @Inject(DIALOG_DATA) public data: DialogData
  ) {}
}
@Component({
  selector: 'component-portal-example',
  template: 'Hello, this is a component portal',
  standalone: true,
})
export class ComponentPortalExample {}