import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatusBar } from '@capacitor/status-bar';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(private router:Router) {

   }

  ngOnInit() {
    StatusBar.setBackgroundColor({ color: '#393E46'});
    StatusBar.setOverlaysWebView({ overlay: false });
    this.navigate();
  }

  navigate()
  {
    setTimeout(() => {
      this.router.navigateByUrl('login');
    }, 4000);
  }
}
