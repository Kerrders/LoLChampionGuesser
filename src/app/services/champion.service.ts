import { Injectable } from '@angular/core';
import championFull from '../../assets/championFull.json';
import { Champion } from '../interfaces/champion.interface';

@Injectable({
  providedIn: 'root',
})
export class ChampionService {
  public imageUrlPrefix =
    'https://ddragon.leagueoflegends.com/cdn/14.6.1/img/champion/';
  public championData: Array<Champion> = this.mapData(championFull);

  public getRandomChampion(): Champion {
    return this.championData[
      Math.floor(Math.random() * this.championData.length)
    ];
  }

  private mapData(champions: Array<Champion>): Array<Champion> {
    return champions.map((champion) => {
      champion.genre = champion.genre.replaceAll(',', ' ');
      return champion;
    });
  }
}
