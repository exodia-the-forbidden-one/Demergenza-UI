import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  /**
   *
   */
  constructor(private router: Router) {

  }

  ngOnInit(): void {
    this.responsiveFooter();
    window.addEventListener("resize", () => {
      this.responsiveFooter()
    })

    // scroll to top when navigation
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0)
    });
  }

  responsiveFooter(): void {
    let element: Element | null = document.querySelector(".footer-menu a.logo")
    let footerMenu: Element | null = document.querySelector(".footer-menu")
    let menuGroup: Element | null = document.querySelector(".footer-menu-group.responsive")
    if (window.innerWidth < 1000) {

      menuGroup?.insertBefore(element!, menuGroup.firstChild)
    }
    else {
      footerMenu?.insertBefore(element!, footerMenu.firstChild)
    }

  }
}
