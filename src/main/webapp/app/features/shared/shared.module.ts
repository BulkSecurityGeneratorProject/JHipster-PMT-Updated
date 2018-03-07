import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './shared.component';

import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AccordionModule, RatingModule, CalendarModule, ButtonModule } from 'primeng/primeng';
import { CardModule } from 'primeng/card';
import { PanelModule} from 'primeng/panel';
import { MegaMenuModule } from 'primeng/megamenu';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { Http } from '@angular/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,
    AccordionModule,
    RatingModule,
    CalendarModule,
    ButtonModule,
    CardModule,
    PanelModule,
    MegaMenuModule,
    MenubarModule,
    TieredMenuModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,
    AccordionModule,
    RatingModule,
    CalendarModule,
    ButtonModule,
    CardModule,
    PanelModule,
    MegaMenuModule,
    MenubarModule,
    TieredMenuModule
  ],
  declarations: [SharedComponent]
})
export class SharedModule { }
