import { ElementRef, Injectable } from '@angular/core';
import { ProjectsInterface } from '../interfaces/projects.interface';
import { ReviewsInterface } from '../interfaces/reviews.interface';

@Injectable({
  providedIn: 'root'
})

export class PortfolioService {
  burgerMenuShiftedIn: boolean = false;
  burgerMenuShiftedOut: boolean = false;
  englishActivated: boolean = true;
  germanActivated: boolean = false;
  links = {
    mailAddress: 'mail@oscar-ahlke.de',
    mailIcon: 'assets/images/mail-icon.svg',
    linkedInLink: 'https://www.linkedin.com/in/oscar-ahlke-949a64320/',
    linkedInIcon: 'assets/images/icon-linked-in.svg',
    gitHubLink: 'https://github.com/OAhlke1',
    gitHubIcon: 'assets/images/icon-github.svg'
  }
  projects: ProjectsInterface[] = [
    {
      name: 'Join',
      index: 0,
      pLangs: [
        { pLang: 'HTML', pIconSrc: 'assets/images/html-icon.svg' },
        { pLang: 'CSS', pIconSrc: 'assets/images/css-icon.svg' },
        { pLang: 'JavaScript', pIconSrc: 'assets/images/java-script-icon.svg' },
        { pLang: 'Firebase', pIconSrc: 'assets/images/firebase-icon.svg' }
      ],
      description: {
        english: "A task manager inpsired by the kanban System. Create and organize tasks, using drag and drop functions, assign users and categries.",
        german: "Ein Task-Manager in Form eines Kanban-Systems. Erstellen und organisieren Sie Aufgaben mittels Drag-and-Drop-Funktionen und weisen Sie diesen Aufgaben Teilnehmer und Kategorien zu."
      },
      imageSrc: "assets/images/join.png",
      gitHubLink: "https://github.com/OAhlke1/join.git",
      link: "https://oscar-ahlke.de/join/"
    },
    {
      name: 'Space Jumper',
      index: 1,
      pLangs: [
        { pLang: 'HTML', pIconSrc: 'assets/images/html-icon.svg' },
        { pLang: 'CSS', pIconSrc: 'assets/images/css-icon.svg' },
        { pLang: 'JavaScript', pIconSrc: 'assets/images/java-script-icon.svg' },
      ],
      description: {
        english: "A jump'n'run game, in which you have to to fight against enemies while shooting and jumping in a space-ship.",
        german: "Ein Jump'n'Run-spiel, in welchem man durch Schießen und Springen in einem Raumschiff Gegner besiegen muss."
      },
      imageSrc: "assets/images/space-jumper.png",
      gitHubLink: "https://github.com/OAhlke1/game.git",
      link: "https://oscar-ahlke.de/games/space-jumper"
    },
    {
      name: 'Pokedex',
      index: 2,
      pLangs: [
        { pLang: 'HTML', pIconSrc: 'assets/images/html-icon.svg' },
        { pLang: 'CSS', pIconSrc: 'assets/images/css-icon.svg' },
        { pLang: 'JavaScript', pIconSrc: 'assets/images/java-script-icon.svg' },
      ],
      description: {
        english: "Here you cam generate a list of Pokemon with informations to each.",
        german: "Hier kann man sich eine Liste mit Pokemon generieren lassen mit Informatationen zu jedem."
      },
      imageSrc: "assets/images/pokedex.png",
      gitHubLink: "https://github.com/OAhlke1/pokedex.git",
      link: "https://oscar-ahlke.de/pokedex"
    }
  ];

  reviews:ReviewsInterface[] = [{
    review: "bla bla bla bla bla lorem ipsum, bla.",
    author: "Max Mustermann I",
    isActive: true
  },{
    review: "bla bla bla bla bla lorem ipsum, bla.",
    author: "Max Mustermann II",
    isActive: false
  },{
    review: "bla bla bla bla bla lorem ipsum, bla.",
    author: "Max Mustermann III",
    isActive: false
  },{
    review: "bla bla bla bla bla lorem ipsum, bla.",
    author: "Max Mustermann IIII",
    isActive: false
  },{
    review: "bla bla bla bla bla lorem ipsum, bla.",
    author: "Max Mustermann V",
    isActive: false
  },{
    review: "bla bla bla bla bla lorem ipsum, bla.",
    author: "Max Mustermann VI",
    isActive: false
  },{
    review: "bla bla bla bla bla lorem ipsum, bla.",
    author: "Max Mustermann VI",
    isActive: false
  },{
    review: "bla bla bla bla bla lorem ipsum, bla.",
    author: "Max Mustermann VI",
    isActive: false
  },{
    review: "bla bla bla bla bla lorem ipsum, bla.",
    author: "Max Mustermann VI",
    isActive: false
  },{
    review: "bla bla bla bla bla lorem ipsum, bla.",
    author: "Max Mustermann VI",
    isActive: false
  },{
    review: "bla bla bla bla bla lorem ipsum, bla.",
    author: "Max Mustermann VI",
    isActive: false
  },{
    review: "bla bla bla bla bla lorem ipsum, bla.",
    author: "Max Mustermann VI",
    isActive: false
  },{
    review: "bla bla bla bla bla lorem ipsum, bla.",
    author: "Max Mustermann VI",
    isActive: false
  },{
    review: "bla bla bla bla bla lorem ipsum, bla.",
    author: "Max Mustermann VI",
    isActive: false
  },{
    review: "bla bla bla bla bla lorem ipsum, bla.",
    author: "Max Mustermann VI",
    isActive: false
  },{
    review: "bla bla bla bla bla lorem ipsum, bla.",
    author: "Max Mustermann VI",
    isActive: false
  }];

  constructor() { }

  switchLanguage() {
    if (this.englishActivated) {
      this.englishActivated = false;
      this.germanActivated = true;
    } else if (this.germanActivated) {
      this.englishActivated = true;
      this.germanActivated = false;
    }
  }

  showHideBurgerMenu(event: Event) {
    let target = event.target as HTMLElement;
    if (target.closest('.burger-menu')) {
      if (!this.burgerMenuShiftedIn && !this.burgerMenuShiftedOut) {
        this.burgerMenuShiftedIn = true;
      } else if (this.burgerMenuShiftedIn && !this.burgerMenuShiftedOut) {
        this.burgerMenuShiftedIn = false;
        this.burgerMenuShiftedOut = true;
      } else if (!this.burgerMenuShiftedIn && this.burgerMenuShiftedOut) {
        this.burgerMenuShiftedIn = true;
        this.burgerMenuShiftedOut = false;
      }
    } else if (!target.closest('.burger-menu') && !target.closest('.top-bar-burger-menu')) {
      this.burgerMenuShiftedIn = false;
      this.burgerMenuShiftedOut = true;
    } else if (target.closest('.top-bar-burger-menu')) {
      this.burgerMenuShiftedIn = true;
      this.burgerMenuShiftedOut = false;
    }
  }
}
