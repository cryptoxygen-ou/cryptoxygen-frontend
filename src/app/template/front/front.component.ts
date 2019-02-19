import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';
import { environment } from './../../../environments/environment';
import { Component, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
// import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
// import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

declare const $: any;
@Component({
  selector: 'app-front',
  templateUrl: './front.component.html',
  styleUrls: ['./front.component.scss'],
})
export class FrontComponent implements OnInit {
  loading = true;
  myStyle: object = {};
  myParams: object = {};
  width: number = 100;
  height: number = 100;
  msgs: Message[] = [];
  constructor(
    public userservice: UserService, 
    private route:ActivatedRoute,
    private messageservice: MessageService,
    private modalService: BsModalService,
  ) { }


  status:any
  coinenddate:any
  totalVgwCollection:any
  softcap:any
  percentage:any
  ico_phase:any
  text:any
  document
  modalRef: BsModalRef;
  dirPath:string=environment.DIRPATH;
  
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'member_modal' })
    );
  }

  ngOnInit() {
    if (this.loading = true) {
      $('body').addClass('hide-overflow');
    }
      let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl')
      if(returnUrl != null){
        setTimeout(() => {
          
          this.messageservice.add({severity:'error', summary:'Login', detail:'You have to be login to access this page.'});
        }, 1000);
      }
      this.userservice.getsoftcap()
      .subscribe(response => {
        //  console.log(response)
        this.status = response.json().success;
        if(this.status == true)
        {
          this.softcap = response.json().data.tokens;
          this.text = response.json().data.text
        // console.log(this.softcap)


        }
      
      });   

      this.userservice.changeValue('home');

      this.userservice.getcoinprice('eth')
      .subscribe(response => {
        //  console.log(response)
        this.status = response.json().success;
        if(this.status == true)
        { 
          this.coinenddate = response.json().data['end_date']; 
          this.ico_phase = response.json().data['ico_phase']  
        }
      });    
      this.userservice.getcoinsum()
      .subscribe(response => {
        this.status = response.json().success;
        if(this.status == true)
        {
          this.totalVgwCollection = response.json().data; 
          // in percent for home page progress bar

          this.percentage = this.totalVgwCollection/this.softcap * 100
          
        
        }  
      });
      // now calculate usd receive as per total amout of all coins

      // this.userservice.getcoinpriceOnline('all')
      // .subscribe(response => {
      //   this.status = response.json().success;
      //   if(this.status != false)
      //   {
        

      //     let onebtctovgw = response.json().data.onebtc_to_vgw;
          
            
      //   }
      
      // });
      this.myStyle = {
        'position': 'absolute',
        'width': '100%',
        'height': '83%',
        'z-index': -1,
        'top': 0,
        'left': 0,
        'right': 0,
        'bottom': 0,
    };

    this.myParams = {
      
      "particles": {
        "number": {
          "value": 50,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#6bafff"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#6bafff"
          },
          "polygon": {
            "nb_sides": 5
          },
          "image": {
            "src": "images/bubbles.png",
            "width":100,
            "height": 100
          }
        },
        "opacity": {
          "value": 1,
          "random": false,
          "anim": {
            "enable": false,
            "speed": 1,
            "opacity_min": 1,
            "sync": false
          }
        },
        "size": {
          "value": 5,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 40,
            "size_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 100,
          "color": "#ffffff",
          "opacity": 0.8,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 3,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
    };


    }

    ngAfterContentInit(){
      setTimeout(async(router: Router) => {
        await this.loadFormScript();
        await this.loadFormScript2();
        await this.loadFormScript3();
        this.loading = false;
        $('body').removeClass('hide-overflow');
        },1500);

  }

  public loadFormScript(): Promise<any> {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = './assets/js/timer.js';
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    });
  }


  public loadFormScript2(): Promise<any> {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = './assets/js/webflow.js';
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    });
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
