import { Reporte } from './../_model/reporte';
import { Archivo } from './../_model/archivo';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HOST } from '../_shared/var.constants';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArchivoService {

  url: string = HOST;
  archivoCambio = new Subject<Archivo[]>();
  mensajeCambio = new Subject<string>();

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<Archivo[]>(`${this.url}/archivos`)
  }

  listarReporte() {
    return this.http.get<Reporte[]>(`${this.url}/archivos/reporte`)
  }

  cargarArchivo(data: File) {
    let formdata: FormData = new FormData();
    formdata.append('file', data)
    return this.http.post(`${this.url}/archivos/guardarArchivo`, formdata, {
      responseType: 'text'
    });
  }

  listarPageable(p: number, s: number) {
    return this.http.get(`${this.url}/archivos/pageable?page=${p}&size=${s}`)
  }

  asignarUsuario(archivo: Archivo) {
    return this.http.put(`${this.url}/archivos`, archivo)
  }

  listarPorId(idIncidente: string) {
    return this.http.get<Archivo>(`${this.url}/archivos/${idIncidente}`)
  }

  eliminar(idIncident: number) {
    return this.http.delete(`${this.url}/archivos/${idIncident}`)
  }

}
