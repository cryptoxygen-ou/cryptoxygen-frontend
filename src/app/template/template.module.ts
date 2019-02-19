import { ClipboardModule } from 'ngx-clipboard';
import { policyComponent } from './policy/policy.component';
import { TermsComponent } from './terms/terms.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { NgxPhoneMaskModule } from 'ngx-phone-mask';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '../services/auth-gaurd.service';
import { TemplateRoutingModule } from './template-routing.module';
import { FrontComponent } from './front/front.component';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TemplateComponent } from './template.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingComponent } from './setting/setting.component';
import { FaqComponent } from './faq/faq.component';
import { FeaturesComponent } from './features/features.component';
import { RoadmapComponent } from './roadmap/roadmap.component';
import { ToolsComponent } from './tools/tools.component';
import { BsDropdownModule } from 'ngx-bootstrap';
import { AccountComponent } from './account/account.component';
import { FormsModule } from '@angular/forms';
import {GrowlModule} from 'primeng/growl';
import {MessageService} from 'primeng/components/common/messageservice';
import { PaymentComponent } from './payment/payment.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { VerifymailComponent } from './verifymail/verifymail.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ContactusComponent } from './contactus/contactus.component';
import {TooltipModule} from 'primeng/tooltip';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ParticlesModule } from 'angular-particle';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [
    NgxPhoneMaskModule,
    CollapseModule.forRoot(),
    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
    CommonModule,
    TemplateRoutingModule,
    SharedModule,
    FormsModule,
    GrowlModule,
    TooltipModule,
    PopoverModule.forRoot(),
    ParticlesModule,
    AccordionModule.forRoot(),
    ProgressSpinnerModule,
    ModalModule.forRoot(),

  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    FrontComponent,
    TemplateComponent,
    DashboardComponent,
    SettingComponent,
    FaqComponent,
    FeaturesComponent,
    RoadmapComponent,
    ToolsComponent,
    AccountComponent,
    PaymentComponent,
    ResetpasswordComponent,
    VerifymailComponent,
    FeedbackComponent,
    ContactusComponent,
    TutorialComponent,
    TermsComponent,
    policyComponent
  ],
  providers: [
    AuthGuard,
    MessageService
  ]
})
export class TemplateModule {
  myStyle: object = {};
  myParams: object = {};
  width: number = 100;
  height: number = 100;

  ngOnInit() {
    this.myStyle = {
      'position': 'fixed',
      'width': '100%',
      'height': '100%',
      'z-index': -1,
      'top': 0,
      'left': 0,
      'right': 0,
      'bottom': 0,
    };
  this.myParams = {
    particles: {
        number: {
          value: 200,
        },
        color: {
          value: '#6bafff'
        },
        shape: {
          type: 'triangle',
        },
      }
    };
  }
}