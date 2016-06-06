import {provide} from '@angular/core';
import {Http, BaseRequestOptions} from '@angular/http';
import {RouteSegment} from '@angular/router';

import {it, inject, async, beforeEach, beforeEachProviders} from '@angular/core/testing';
import {MockBackend} from '@angular/http/testing';
import {TestComponentBuilder, ComponentFixture} from '@angular/compiler/testing';

import {LolApiService} from '../../misc/lolapi.service';
import {MasteriesComponent} from './masteries.component';
import {MasteryCategoryComponent} from './mastery-category.component';
import {MasteryTierComponent} from './mastery-tier.component';
import {MasteryComponent, Colors} from './mastery.component';

import {MockRouteSegment} from '../../testing';

const data = {
  id: 0,
  description: ['test6121'],
  image: { full: '6121.png' },
  ranks: 5
};

describe('MasteryComponent', () => {
  beforeEachProviders(() => [
    provide(RouteSegment, { useValue: new MockRouteSegment({ region: 'euw' }) }),

    BaseRequestOptions,
    MockBackend,
    provide(Http, {
      useFactory: (backend, defaultOptions) => {
        return new Http(backend, defaultOptions);
      },
      deps: [MockBackend, BaseRequestOptions]
    }),

    LolApiService,
    MasteriesComponent,
    MasteryCategoryComponent,
    MasteryTierComponent,
    MasteryComponent
  ]);


  let component: MasteryComponent;
  beforeEach(async(inject([TestComponentBuilder], (tcb: TestComponentBuilder) => {
    tcb.createAsync(MasteryComponent).then((fixture: ComponentFixture<MasteryComponent>) => {
      component = fixture.componentInstance;
      component.data = data;
      fixture.detectChanges();
    });
  })));


  it('should disable when there is no data', inject([MasteryComponent], (component) => {
    spyOn(component, 'disable');
    expect(component.disable).not.toHaveBeenCalled();
    component.enabled = false;
    component.data = undefined;
    component.enable();
    expect(component.disable).toHaveBeenCalled();
  }));

  it('should not disable when it has a rank', inject([MasteryComponent], (component) => {
    spyOn(component, 'changed');
    component.rank = 1;
    component.enabled = false;
    expect(component.changed).not.toHaveBeenCalled();
    component.disable();
    expect(component.rank).toBe(1);
    expect(component.enabled).toBeFalsy();
    expect(component.changed).not.toHaveBeenCalled();
  }));


  it('should get max rank zero when there is no data', inject([MasteryComponent], (component) => {
    component.data = undefined;
    expect(component.getMaxRank()).toBe(0);
    component.data = { ranks: undefined };
    expect(component.getMaxRank()).toBe(0);
  }));


  it('should not add a rank when disabled', inject([MasteryComponent], (component) => {
    component.rank = 0;
    component.data = { ranks: 5 };
    component.disable();
    component.rankAdd();
    expect(component.rank).toBe(0);
  }));


  it('should remove rank', () => {
    component.enable();
    component.setRank(2);
    component.unlock();
    component.rankRemove();
    expect(component.getRank()).toBe(1);
  });

  it('should not remove rank when rank is zero', () => {
    component.enable();
    component.setRank(0);
    component.unlock();
    component.rankRemove();
    expect(component.getRank()).toBe(0);
  });

  it('should not remove rank when disabled', () => {
    component.enable();
    component.setRank(2);
    component.enabled = false;
    component.rankRemove();
    expect(component.getRank()).toBe(2);
  });

  it('should not remove rank when locked', () => {
    component.enable();
    component.setRank(2);
    component.lock();
    component.rankRemove();
    expect(component.getRank()).toBe(2);
  });


  it('should set active and color when enabled', () => {
    component.enable();
    component.setRank(1);
    expect(component.active).toBeTruthy();
    expect(component.color).toBe(Colors.yellow);
    component.setRank(0);
    expect(component.active).toBeFalsy();
    expect(component.color).toBe(Colors.blue);
  });
  it('should set active and color when disabled', () => {
    component.disable();
    expect(component.active).toBeFalsy();
    expect(component.color).toBe(Colors.gray);
  });


  it('should trigger tier rankAdd event', () => {
    spyOn(component.rankAdded, 'emit');
    expect(component.rankAdded.emit).not.toHaveBeenCalled();
    component.enabled = true;
    component.rankAdd();
    expect(component.rankAdded.emit).toHaveBeenCalled();
  });

  it('should trigger tier rankRemoved event', () => {
    spyOn(component.rankRemoved, 'emit');
    expect(component.rankRemoved.emit).not.toHaveBeenCalled();
    component.enabled = true;
    component.setRank(1);
    component.rankRemove();
    expect(component.rankRemoved.emit).toHaveBeenCalled();
    expect(component.getRank()).toBe(0);
  });
});
