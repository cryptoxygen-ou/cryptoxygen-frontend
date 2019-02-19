import { TutorialComponent } from './tutorial/tutorial.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { FrontComponent } from './front/front.component';
import { TemplateComponent } from './template.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingComponent } from './setting/setting.component';
import { AuthGuard } from '../services/auth-gaurd.service';
import { FaqComponent } from './faq/faq.component';
import { FeaturesComponent } from './features/features.component';
import { RoadmapComponent } from './roadmap/roadmap.component';
import { ToolsComponent } from './tools/tools.component';
import { AccountComponent } from './account/account.component';
import { PaymentComponent } from './payment/payment.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { VerifymailComponent } from './verifymail/verifymail.component';
import { ContactusComponent } from './contactus/contactus.component';
import { policyComponent } from './policy/policy.component';
import { TermsComponent } from './terms/terms.component';
const routes: Routes = [
  {
  path:'',
  component:TemplateComponent,
  children:[
          { 
            path : '',
            component: FrontComponent
          }
        ]
  },
  {
    path:'',
    component:TemplateComponent,
    children:[
            { 
              path : 'dashboard',
              component: DashboardComponent, canActivate: [AuthGuard]
            }
          ]
    },
    {
      path:'',
      component:TemplateComponent,
      children:[
              { 
                path : 'tutorial',
                component: TutorialComponent, canActivate: [AuthGuard]
              }
            ]
      },
    {
      path:'',
      component:TemplateComponent,
      children:[
              { 
                path : 'account',
                component: AccountComponent, canActivate: [AuthGuard]
              }
            ]
      },
      {
        path:'',
        component:TemplateComponent,
        children:[
          { 
            path : 'settings',
            component: SettingComponent, canActivate: [AuthGuard]
          }
        ]
        },
      {
        path:'',
        component:TemplateComponent,
        children:[
                { 
                  path : 'feedback',
                  component: FeedbackComponent, canActivate: [AuthGuard]
                }
              ]
        },
       
      {
        path:'',
        component:TemplateComponent,
        children:[
                { 
                  path : 'payment',
                  component: PaymentComponent, canActivate: [AuthGuard]
                }
              ]
        },
    {
      path:'',
      component:TemplateComponent,
      children:[
              { 
                path : 'faq',
                component: FaqComponent
              }
            ]
      },
      {
        path:'',
        component:TemplateComponent,
        children:[
                { 
                  path : 'contact',
                  component: ContactusComponent
                }
              ]
        },
      {
        path:'',
        component:TemplateComponent,
        children:[
                { 
                  path : 'features',
                  component: FeaturesComponent
                }
              ]
        },
        {
          path:'',
          component:TemplateComponent,
          children:[
                  { 
                    path : 'roadmap',
                    component: RoadmapComponent
                  }
                ]
        },
        {
          path:'',
          component:TemplateComponent,
          children:[
                  { 
                    path : 'tools',
                    component: ToolsComponent
                  }
                ]
        },
        {
          path:'',
          component:TemplateComponent,
          children:[
                  { 
                    path : 'resetpassword/:id',
                    component: ResetpasswordComponent,
                  }
                ]
        },
        {
          path:'',
          component:TemplateComponent,
          children:[
                  { 
                    path : 'verifymail/:id',
                    component: VerifymailComponent,
                  }
                ]
        },
        {
          path:'',
          component:TemplateComponent,
          children:[
                  { 
                    path : 'privacy-policy',
                    component: policyComponent
                  }
                ]
          },
          {
            path:'',
            component:TemplateComponent,
            children:[
                    { 
                      path : 'terms-conditions',
                      component: TermsComponent
                    }
                  ]
            },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],






  exports: [RouterModule]
})
export class TemplateRoutingModule { }
