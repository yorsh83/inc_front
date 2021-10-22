import { Kanban } from 'src/app/_model/kanban';
import { Archivo } from 'src/app/_model/archivo';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HOST } from '../_shared/var.constants';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KanbanService {

  url: string = HOST;
  analisisCambio = new Subject<Kanban[]>();
  construccionesCambio = new Subject<Kanban[]>();
  pruebasCambio = new Subject<Kanban[]>();
  liberacionesCambio = new Subject<Kanban[]>();
  retrospectivasCambio = new Subject<Kanban[]>();

  constructor(private http: HttpClient) { }

  listarAnalisis() {
    return this.http.get<Kanban[]>(`${this.url}/kanbans/analisis`)
  }

  listarConstruccion() {
    return this.http.get<Kanban[]>(`${this.url}/kanbans/construccion`)
  }

  listarPruebas() {
    return this.http.get<Kanban[]>(`${this.url}/kanbans/pruebas`)
  }

  listarLiberacion() {
    return this.http.get<Kanban[]>(`${this.url}/kanbans/liberacion`)
  }

  listarRetrospectiva() {
    return this.http.get<Kanban[]>(`${this.url}/kanbans/retrospectiva`)
  }

  insertarKanban(kanban: Kanban) {
    return this.http.post(`${this.url}/kanbans`, kanban)
  }

  actualizarTexto(kanban: Kanban) {
    return this.http.put(`${this.url}/kanbans`, kanban)
  }

  actualizarFlujo(kanban: Kanban) {
    return this.http.put(`${this.url}/kanbans/flujo`, kanban)
  }

  eliminarIncidente(idIncidente: number) {
    return this.http.delete(`${this.url}/kanbans/${idIncidente}`)
  }

}
