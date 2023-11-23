import { Component, OnInit } from '@angular/core';
import { Carousel } from 'primeng/carousel';

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
    Carousel.prototype.onTouchMove = () => { };
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

  ngOnInit(): void {

    const hiddenElements = document.querySelectorAll(".hidden")
    hiddenElements.forEach(el => this.observer.observe(el))
  }

  observer: IntersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
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