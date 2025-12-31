import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  constructor(private router : Router) { }

  ngOnInit() {
  }
  retourAccueil(){
    this.router.navigate(['home'])
  }
}
