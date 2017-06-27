import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { Root } from './root';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  declarations: [
    Root
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [Root]
})
export class AppModule {
  
}
