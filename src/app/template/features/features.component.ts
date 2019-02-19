import { DOCUMENT } from '@angular/platform-browser';
import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class FeaturesComponent implements OnInit {
  loading = true;
  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
    if (this.loading = true) {
      this.document.body.classList.add('hide-overflow');
    }
    this.document.body.classList.add('bgWhite');
  }
  ngOnDestroy(){
    this.document.body.classList.remove('bgWhite');
  }
  ngAfterContentInit(){
    setTimeout( async (router: Router) => {
      await this.loadFormScript3();
      this.loading = false;
      this.document.body.classList.remove('hide-overflow');
      },1500);
  }
  public loadFormScript3(): Promise<any> {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = './assets/js/wave_animation.js';
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    });
  }

}
