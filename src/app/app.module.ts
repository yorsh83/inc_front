import { DialogoKanbanComponent } from './pages/kanban/dialogo-kanban/dialogo-kanban.component';
import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ArchivoComponent } from './pages/archivo/archivo.component';
import { HttpClientModule } from '@angular/common/http';
import { DialogoComponent } from './pages/archivo/dialogo/dialogo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { ValidarDatosComponent } from './_validation/validar-datos/validar-datos.component';
import { KanbanComponent } from './pages/kanban/kanban.component';
import { FooterComponent } from './_footer/footer/footer.component';
import { LoginComponent } from './login/login.component';

import { PdfViewerModule } from 'ng2-pdf-viewer';

@NgModule({
  declarations: [
    AppComponent,
    ArchivoComponent,
    DialogoComponent,
    ReporteComponent,
    ValidarDatosComponent,
    KanbanComponent,
    DialogoKanbanComponent,
    FooterComponent,
    LoginComponent
  ],
  entryComponents: [
    DialogoComponent,
    DialogoKanbanComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    PdfViewerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
