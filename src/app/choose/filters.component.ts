import {Pipe, PipeTransform, Component, Input, Output, EventEmitter} from 'angular2/core';
import {NgModel} from 'angular2/common';


@Pipe({
  name: 'filter', // :[name]:[sort]:[tags]
  pure: false
})

export class FilterPipe implements PipeTransform {
  transform(champions: Array<Object>, args: any[]) {
    if (!champions) {
      return champions;
    }

    champions = champions.filter((champion) => {
      // name
      if (args[0] && this.clean(champion['name']).indexOf(this.clean(args[0])) === -1) {
        return false;
      }

      // tags
      var result = true;
      if (args[2] && args[2].length > 0) {
        champion['tags'] = this.exclude(champion['tags'], 'Melee');
        for (var tag in args[2]) {
          if (champion['tags'].indexOf(args[2][tag]) === -1) {
            result = false;
          }
        }
      }
      return result;
    });

    // sort alphabetical
    champions.sort((a: any, b: any) => {
      return a.name < b.name ? -1 : 1;
    });

    // sort by info
    if (args[1] && args[1].length > 0) {
      champions = champions.sort((a: any, b: any) => {
        if (a.info[args[1]] === b.info[args[1]]) {
          return 0;
        }
        if (a.info[args[1]] < b.info[args[1]]) {
          return 1;
        }
        return -1;
      });
    }

    return champions;
  }

  private clean(value: string): string {
    return value.toLowerCase().replace('\'', '');
  }

  private exclude(array: Array<string>, exclude: string) {
    var index: number = array.indexOf(exclude);
    if (index > -1) {
      array.splice(index, 1);
    }
    return array;
  }
}

@Component({
  selector: 'filters',
  directives: [NgModel],
  template: `
    <div class="left">
      <div class="align-center">
        <label><input type="checkbox" value="Marksman" (change)="tagchanged($event)"/>Marksman</label>
        <label><input type="checkbox" value="Assassin" (change)="tagchanged($event)"/>Assassin</label>
        <label><input type="checkbox" value="Fighter"  (change)="tagchanged($event)"/>Fighter</label>
        <label><input type="checkbox" value="Mage"     (change)="tagchanged($event)"/>Mage</label>
        <label><input type="checkbox" value="Tank"     (change)="tagchanged($event)"/>Tank</label>
        <label><input type="checkbox" value="Support"  (change)="tagchanged($event)"/>Support</label>
      </div>
    </div>
    <div class="center align-center">
      <div>
        <h2>Choose your weapon</h2>
        <input type="text" name="name" placeholder="Name" (keyup)="keyup($event)" (input)="nameChange.next($event.target.value)"/>
      </div>
    </div>
    <div class="right">
      <div class="align-center">
        <label><input type="radio" name="type" value="attack"     (change)="sortChanged($event)"/>Attack Damage</label>
        <label><input type="radio" name="type" value="magic"      (change)="sortChanged($event)"/>Ability Power</label>
        <label><input type="radio" name="type" value="defense"    (change)="sortChanged($event)"/>Defense</label>
        <label><input type="radio" name="type" value="difficulty" (change)="sortChanged($event)"/>Difficulty</label>
      </div>
    </div>`
})

export class FiltersComponent {
  @Input() name: string;
  @Output() nameChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() tags: Array<string> = [];
  @Output() tagsChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() sort: string;
  @Output() sortChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() enterHit: EventEmitter<any> = new EventEmitter<any>();

  private tagchanged(event) {
    if (!event || !event.target) {
      return;
    }
    var input = event.target;
    if (input.checked) {
      this.tags.push(input.value);
    } else {
      var index: number = this.tags.indexOf(input.value);
      if (index > -1) {
        this.tags.splice(index, 1);
      }
    }
    this.tagsChange.next(this.tags);
  }

  private sortChanged(event) {
    if (!event || !event.target) {
      return;
    }
    this.sort = event.target.value;
    this.sortChange.next(this.sort);
  }

  private keyup(event) {
    if (!event || !event.code) {
      return;
    }
    if (event.code === "Enter") {
      this.enterHit.next(null);
    }
  }
}