import { DOCUMENT } from '@angular/platform-browser';
import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class policyComponent implements OnInit {
  loading = true;
  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
    if (this.loading = true) {
      this.document.body.classList.add('hide-overflow');
    }
    this.document.body.classList.add('bgWhite');
    window.scrollTo(0, 0);
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
