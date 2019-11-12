import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
/* import { HttpModule } from '@angular/http' */
import { AppComponent } from './app.component';
import { TemplateComponent } from './components/template/template.component';
import { DataComponent } from './components/data/data.component';
import { TerminosycondicionesComponent } from './components/terminosycondiciones/terminosycondiciones.component';

@NgModule({
  declarations: [
    AppComponent,
    TemplateComponent,
    DataComponent,
    TerminosycondicionesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    /* HttpModule */
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
