import { LoginComponent } from './login/login.component';
import { KanbanComponent } from './pages/kanban/kanban.component';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { ArchivoComponent } from './pages/archivo/archivo.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'archivo', component: ArchivoComponent, children: [
      { path: 'archivo/:id', component: ArchivoComponent }
    ]
  },
  { path: 'reporte', component: ReporteComponent },
  { path: 'kanban', component: KanbanComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
