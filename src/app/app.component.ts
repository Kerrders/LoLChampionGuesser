import { Component, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ChampionService } from './services/champion.service';
import { Champion } from './interfaces/champion.interface';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ChampionComparePipe } from './pipes/champion-compare.pipe';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    FormsModule,
    DropdownModule,
    ChampionComparePipe,
    TooltipModule,
    ButtonModule,
    CardModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('answerChange', [
      transition('* => *', [
        query(
          '.card',
          [
            style({ transform: 'rotateY(180deg)', opacity: 0 }),
            stagger(200, [
              animate(
                '0.5s',
                style({ transform: 'rotateY(0deg)', opacity: 1 })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class AppComponent {
  public userChampionInput = signal<Champion | null>(null);
  public userSelectableChampions: Array<Champion> = [];
  public userIncorrectChampions: Array<Champion> = [];
  public currentChampion: Champion | undefined;
  public gameWon = false;

  public tableColumnsMapped: Array<{
    fieldName: string;
    dataKey: keyof Champion;
  }> = [
    {
      fieldName: 'genre',
      dataKey: 'genre',
    },
    {
      fieldName: 'energyType',
      dataKey: 'resource',
    },
    {
      fieldName: 'gender',
      dataKey: 'gender',
    },
    {
      fieldName: 'region',
      dataKey: 'region',
    },
    {
      fieldName: 'releaseDate',
      dataKey: 'releaseDate',
    },
  ];

  constructor(public championService: ChampionService) {
    effect(() => {
      const selectedChampion = this.userChampionInput();

      if (!this.currentChampion || !selectedChampion) {
        return;
      }

      if (selectedChampion.id !== this.currentChampion?.id) {
        this.userIncorrectChampions.push(selectedChampion);
        this.userSelectableChampions = this.userSelectableChampions.filter(
          (champion) => champion.id !== selectedChampion.id
        );
        return;
      }
      this.userIncorrectChampions.push(selectedChampion);

      //Do not spoiler the player
      setTimeout(() => {
        this.gameWon = true;
      }, 1000);
    });
  }

  public startGame() {
    this.currentChampion = this.championService.getRandomChampion();
    console.log(this.currentChampion);
    this.userSelectableChampions = this.championService.championData;
  }

  public restartGame() {
    this.currentChampion = undefined;
    this.userIncorrectChampions = [];
    this.gameWon = false;
    this.userSelectableChampions = this.championService.championData;
    this.userChampionInput.set(null);

    this.startGame();
  }
}
