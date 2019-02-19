import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalsComponent } from './modals/modals.component';
import { FormsModule } from '@angular/forms';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { GrowlModule } from 'primeng/growl';
import { MessageService } from 'primeng/components/common/messageservice';
import { CoinmodalComponent } from './coinmodal/coinmodal.component';
import { ClipboardModule } from 'ngx-clipboard';
import { HistoryComponent } from './history/history.component';
import { GoogleAuthComponent} from './google-auth/google-auth.component';
import { GoogleAuthDisComponent} from './google-auth-dis/google-auth-dis.component';
import { PricetimerComponent } from './pricetimer/pricetimer.component';
import { ErcComponent } from './erc/erc.component';
import { SmartcontractComponent } from './smartcontract/smartcontract.component';
import { NgxPhoneMaskModule } from 'ngx-phone-mask';
import { RouterModule } from '@angular/router';
import { GoogleService } from '../services/google.service';
import { TooltipModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    NgxPhoneMaskModule,
    FormsModule,
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    CommonModule,
    GrowlModule,
    ClipboardModule,
    RouterModule,
    TooltipModule.forRoot(),
  ],
  declarations: [ModalsComponent, CoinmodalComponent, HistoryComponent, PricetimerComponent, ErcComponent, SmartcontractComponent,GoogleAuthComponent,GoogleAuthDisComponent],
  exports: [
    HistoryComponent,
    GoogleAuthComponent,
    GoogleAuthDisComponent,
    ModalsComponent,
    CoinmodalComponent,
    PricetimerComponent,
    ErcComponent,
    SmartcontractComponent,
    ClipboardModule
  ],
  providers:[BsModalService,MessageService,GoogleService]
})
export class SharedModule { }
