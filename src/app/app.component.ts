import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-app',
  styleUrls: ['./app.component.css'],
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  //listData: Array<any> = [];
  listData: Array<any> = [
    {
      id: 1,
      title: 'LOREM IPSUM',
      product: 'Lorem ipsum dolor sit amet'
    },
    {
      id: 2,
      title: 'HODOR IPSUM',
      product: 'Hodor. Hodor hodor, hodor'
    },
    {
      id: 3,
      title: 'TRUMP IPSUM',
      product: 'Lorem Ipsum is the single greatest threat'
    },
    {
      id: 4,
      title: 'HIPSTER IPSUM',
      product: 'Lorem ipsum dolor amet mustache'
    },
    {
      id: 5,
      title: 'ZOMBIE IPSUM',
      product: 'Zombie ipsum reversus ab viral'
    },
    {
      id: 6,
      title: 'BACON IPSUM',
      product: 'Bacon ipsum dolor amet short'
    },
    {
      id: 7,
      title: 'CUPCAKE IPSUM',
      product: 'Cupcake ipsum dolor'
    },
    {
      id: 8,
      title: 'DELOREAN IPSUM',
      product: 'Just say anything, George'
    },
    {
      id: 9,
      title: 'SPACE IPSUM',
      product: 'Space, the final frontier'
    },
    {
      id: 10,
      title: 'BUSEY IPSUM',
      product: 'Busey ipsum dolor sit amet'
    },
    {
      id: 11,
      title: 'VEGGIE IPSUM',
      product: 'Nori grape silver beet broccoli'
    },
    {
      id: 12,
      title: 'SAMUEL L. IPSUM',
      product: 'Well, the way they make shows is'
    },
    {
      id: 13,
      title: 'POMMY IPSUM',
      product: 'Pommy ipsum smeg head whizz'
    },
    {
      id: 14,
      title: 'HAIRY IPSUM',
      product: 'Sportacus andrew weatherall'
    },
    {
      id: 15,
      title: 'POKEIPSUM',
      product: 'Bulbasaur Lorem ipsum dolor sit amet'
    }
  ];
  itensPerPage: number;
  compareItensPerPage: number;
  pages: number[];
  numberOfItens: number = 0;
  arrPages: any[] = [];
  currentPosition: number = 0;
  previousPosition: number = 0;
  showPagination: boolean = false;
  numberOfPages: number = 0;
  nextPage: number = 0;
  itensShowPerPage: number;
  accumulatedItems: number = 0;
  totalItens: number;

  constructor() {
    this.pages = [];
    this.numberOfItens = this.listData.length;
    this.itensPerPage = 4;
    this.compareItensPerPage = this.itensPerPage;
  }

  ngOnInit() {
    if (this.numberOfItens > this.itensPerPage) {
      this.setAccumulatedItens(this.itensPerPage);
      this.setTotalItens(this.numberOfItens);
      this.initPagination();
      this.assembleList();
      this.validationPagination();
    } else {
      this.setFlagShowPagination();
    }
  }

  assembleList(page: number = 0): void {
    for (
      let index = 0;
      index < this.numberOfItens;
      index += this.itensPerPage
    ) {
      this.arrPages.push(this.listData.slice(index, index + this.itensPerPage));
    }

    this.currentPosition = page;

    if (this.arrPages[page] != undefined) {
      this.setItensPerPage(this.arrPages[page].length);
      //Could use .flat() method too
      //this.listData = this.arrPages[page].flat();
      this.listData = this.arrPages[page].map((element: any) => {
        return element;
      });
    }
  }

  initPagination(): void {
    this.setFlagShowPagination(true);
    this.pages = [];
    this.numberOfPages = this.numberOfItens / this.itensPerPage;

    for (let i = 0; i < this.numberOfPages; i++) {
      this.pages[i] = i;
    }
  }

  validationPagination(): void {
    if (this.currentPosition == this.pages[0]) {
      this.previousPosition = -1;
    } else {
      this.previousPosition = this.currentPosition - 1;
    }

    if (this.currentPosition == this.pages[this.pages.length - 1]) {
      this.nextPage = -1;
    } else {
      this.nextPage = this.currentPosition + 1;
    }
  }

  setFlagShowPagination(flag: boolean = false): boolean {
    return (this.showPagination = flag);
  }

  updatePage(page: number): void {
    this.assembleList(page);
    this.validationPagination();
    this.calcAccumulatedItens(this.itensPerPage, page + 1);
  }

  isCurrentPage(i: number): boolean {
    return i == this.currentPosition;
  }

  setAccumulatedItens(itens: number) {
    return (this.accumulatedItems = itens);
  }

  setTotalItens(itens: number) {
    return (this.totalItens = itens);
  }

  setItensPerPage(itens: number) {
    return (this.itensPerPage = itens);
  }

  calcAccumulatedItens(itensPerPage: number, currentPage: number) {
    this.setAccumulatedItens(itensPerPage * currentPage);
    if (this.itensPerPage < this.compareItensPerPage) {
      this.setAccumulatedItens(this.totalItens);
    }
  }
}
