import { Pipe, PipeTransform } from '@angular/core';
import { Champion } from '../interfaces/champion.interface';

@Pipe({
  standalone: true,
  name: 'championCompare',
})
export class ChampionComparePipe implements PipeTransform {
  transform(
    champion1: Champion,
    champion2: Champion,
    field: keyof Champion
  ): string {
    if (field === 'genre') {
      const mainChampionGenres = champion2.genre.split(' ');
      let foundGenreCount = 0;
      for (const genre of champion1.genre.split(' ')) {
        if (mainChampionGenres.includes(genre)) {
          foundGenreCount++;
        }
      }

      if (foundGenreCount >= mainChampionGenres.length) {
        return 'green';
      } else if (foundGenreCount > 0) {
        return 'orange';
      }
      return 'red';
    }

    if (champion1[field] === champion2[field]) {
      return 'green';
    }
    return 'red';
  }
}
