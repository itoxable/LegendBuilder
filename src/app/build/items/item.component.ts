import {Component, Input} from 'angular2/core';
import {NgIf} from 'angular2/common';

import {DDragonDirective} from '../../misc/ddragon.directive';

@Component({
  selector: 'item',
  directives: [NgIf, DDragonDirective],
  template: `
    <img [ddragon]="'item/' + item.image.full">
    <div *ngIf="name">
      <p class="name">{{name}}</p>
      <div class="gold">
        <img [ddragon]="'ui/gold.png'">
        <p>{{item.gold.total ? item.gold.total : 'Free'}}</p>
      </div>
    </div>
    <p *ngIf="!name" class="gold">{{item.gold.total ? item.gold.total : ''}}</p>`
})

export class ItemComponent {
  @Input() item;
  @Input() name;
}
