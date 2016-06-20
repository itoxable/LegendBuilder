import 'rxjs/Rx';

import {Injectable, bind} from '@angular/core';
import {BaseResponseOptions, Headers, Http, Response} from '@angular/http';
import {RouteSegment} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import {settings} from '../../../config/settings';

@Injectable()
export class LolApiService {
  public staticServer = settings.staticServer;
  public matchServer = settings.matchServer;

  private realm: Observable<Response>;
  private region: string;

  constructor(private routeSegment: RouteSegment, private http: Http) {}


  public getRealm(): Observable<Response> {
    if (!this.realm) {
      this.realm = this.http.get(this.linkStaticData() + '/realm').map(res => res.json()).cache();
    }
    return this.realm;
  }

  public getRegions() { return this.http.get('http://status.leagueoflegends.com/shards').map(res => res.json()); }

  public getChampions() { return this.http.get(this.linkStaticData() + '/champion?champData=info,tags').map(res => res.json()); }

  public getChampion(championKey: string) {
    return this.http.get(this.linkStaticData() + '/champion/' + championKey + '?champData=allytips,altimages,image,partype,passive,spells,stats,tags').map(res => res.json());
  }

  public getItems() { return this.http.get(this.linkStaticData() + '/item?itemListData=all').map(res => res.json()); }

  public getMasteries() { return this.http.get(this.linkStaticData() + '/mastery?masteryListData=all').map(res => res.json()); }

  public getSummonerId(summonerName: string, championKey: string) { return this.http.get(this.linkMatchData() + '/summoner/' + summonerName + '/' + championKey).map(res => res.json()); }

  public getMatchData(summonerName: string, championKey: string, gameTime: number, samples: number) {
    return this.http.get(this.linkMatchData() + '/match/' + summonerName + '/' + championKey + '?gameTime=' + gameTime + '&samples=' + samples).map(res => res.json());
  }


  private linkStaticData() { return this.linkStaticServer() + '/static-data/' + this.getRegion() + '/v1.2'; }

  private linkMatchData() { return this.linkMatchServer() + '/' + this.getRegion(); }

  private linkStaticServer() { return 'http://' + this.staticServer.host + ':' + this.staticServer.port; }

  private linkMatchServer() { return 'http://' + this.matchServer.host + ':' + this.matchServer.port; }

  private getRegion() {
    if (!this.region) {
      this.region = this.routeSegment.getParam('region').toLowerCase();
    }
    return this.region;
  }
}
