import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
// import { ViewEncapsulation } from '@angular/compiler/src/core';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class ToolsComponent implements OnInit {
  loading = true;
  constructor(@Inject(DOCUMENT) private document: Document,
    private router:Router
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
  goto(path:any){
    this.router.navigate(['/'+path]);
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
