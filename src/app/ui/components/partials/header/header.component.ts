import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  public toggleNavbar() {
    let navbar = document.querySelector(".container > .navbar > ul");
    navbar?.classList.toggle("active")
  }

}
