import {NgFor, NgIf} from '@angular/common';
import {Component, EventEmitter, Input, Output} from '@angular/core';

import {ItemBundle} from './item-bundle';
import {ItemComponent} from './item.component';

@Component({
  selector: 'items-from',
  directives: [NgFor, NgIf, ItemComponent, ItemsFromComponent],
  template: `
    <div *ngFor="let bundle of items">
      <hr class="up">
      <item [item]="bundle.item" [attr.title]="bundle.item.name"></item>
      <hr *ngIf="bundle.children" class="down">
      <items-from [items]="bundle.children" (itemSelected)="itemSelected.emit($event)" (itemPicked)="itemPicked.emit($event)"></items-from>
    </div>`
})

export class ItemsFromComponent {
  @Input() items: Array<ItemBundle>;
  @Output() itemSelected: EventEmitter<any> = new EventEmitter<any>();
  @Output() itemPicked: EventEmitter<any> = new EventEmitter<any>();
}
