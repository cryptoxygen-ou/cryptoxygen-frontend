import { UserService } from './../../services/user.service';
import { DOCUMENT } from '@angular/platform-browser';
import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { AccordionConfig } from 'ngx-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],  
  encapsulation:ViewEncapsulation.None,
  providers: [{ provide: AccordionConfig, useFactory: getAccordionConfig }]
})
export class FaqComponent implements OnInit {
  text:any;
  oneAtATime: boolean = true;
  loading = true;

  constructor(@Inject(DOCUMENT) private document: Document,
      public userservice:UserService
) { }

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

export function getAccordionConfig(): AccordionConfig {
  return Object.assign(new AccordionConfig(), { closeOthers: true });
  
}



