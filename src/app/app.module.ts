import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MainComponent} from "./main/main.component";
import {HeaderComponent} from "./header/header.component";
import { HttpClientModule} from "@angular/common/http";
import {CardComponent} from "./common/card/card.component";
import {FormsModule} from "@angular/forms";
import {PortalModule} from '@angular/cdk/portal';
import { PortalComponent } from './components/cdk/portal/portal.component'

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HeaderComponent,
    CardComponent,
    PortalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    PortalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
