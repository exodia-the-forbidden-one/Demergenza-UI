import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public screenWidth: any;
  /**
   *
   */
  constructor() {
    this.heroItems = [
      {
        imageSrc: '../../../../assets/img/hero-pizza.jpg',
        imageWidth: '270px',
        alt: 'Description for Image 1',
        title: 'Title 1',
        titleSrc: './../../../assets/img/logo-title.jpg',
        subtitle: 'Lezzetli İtalyan pizzalarımız, Napolinin sıcak esintilerini sofranıza getiriyor. Taze malzemeler ve nefis soslarla dolu pizza keyfi sizi bekliyor!',
        top: '270px',
      },
      {
        imageSrc: '../../../../assets/img/hero-hamburger.jpg',
        imageWidth: '270px',
        alt: 'Description for Image 2',
        title: 'Title 2',
        titleSrc: "./../../../assets/img/logo-title.jpg",
        subtitle: 'Sıradan hamburgerlerin ötesinde, en sevdiğiniz lezzetleri buluşturuyoruz. Özel baharatlı etimiz ve çeşitli garnitürlerle unutulmaz bir hamburger deneyimi sunuyoruz.',
        top: '270px',
      },
      {
        imageSrc: '../../../../assets/img/hero-pasta.jpg',
        imageWidth: '270px',
        alt: 'Description for Image 3',
        title: 'Title 3',
        titleSrc: "./../../../assets/img/logo-title.jpg",
        subtitle: 'Taze makarnalarımız, özenle hazırlanmış soslar ve enfes malzemelerle buluşuyor. Makarna keyfini bir üst seviyeye taşımak için hazır mısınız?',
        top: '270px',
      }

    ]

  }
  public heroItems: HeroItems[];

  responsiveOptions: any[] = [
  ];

  screenWidthSubject: BehaviorSubject<number> = new BehaviorSubject<number>(window.innerWidth);

  get screenWidth$(): Observable<number> {
    return this.screenWidthSubject.asObservable();
  }

  ngOnInit(): void {

    this.screenWidth = window.innerWidth;

    window.addEventListener('resize', () => {
      this.screenWidthSubject.next(window.innerWidth);
    })

    const hiddenElements = document.querySelectorAll(".hidden")
    hiddenElements.forEach(el => this.observer.observe(el))
  }

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      console.log(entry)
      if (entry.isIntersecting) {
        entry.target.classList.add("show")
      }
      else {
        entry.target.classList.remove("show")
      }
    })
  })
}



export interface HeroItems {
  imageSrc: string;
  imageWidth: string;
  alt?: string;
  title?: string;
  titleSrc?: string;
  subtitle?: string;
  top?: string;
  left?: string;
}