import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  ngOnInit(): void {
    this.responsiveFooter();
    window.addEventListener("resize", () => {
      this.responsiveFooter()
    })
  }

  responsiveFooter(): void {
    let element: Element | null = document.querySelector(".footer-menu a.logo")
    let footerMenu: Element | null = document.querySelector(".footer-menu")
    let menuGroup: Element | null = document.querySelector(".footer-menu-group.responsive")
    if (window.innerWidth < 1000) {

      menuGroup?.insertBefore(element!, menuGroup.firstChild)
    }
    else {
footerMenu?.insertBefore(element!, footerMenu.firstChild )
    }

  }
}
