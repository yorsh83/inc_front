import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HOST } from '../_shared/var.constants';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  url: string = HOST;

  constructor(private http: HttpClient) { }

  contadorTotal() {
    return this.http.get<Number>(`${this.url}/reportes/total`)
  }

  contadorTomados() {
    return this.http.get<Number>(`${this.url}/reportes/tomados`)
  }

  contadoranalisis() {
    return this.http.get<Number>(`${this.url}/reportes/analisis`)
  }

  contadorConstruccion() {
    return this.http.get<Number>(`${this.url}/reportes/construccion`)
  }

  contadorPruebas() {
    return this.http.get<Number>(`${this.url}/reportes/pruebas`)
  }

  contadorLiberacion() {
    return this.http.get<Number>(`${this.url}/reportes/liberacion`)
  }

  contadorRetro() {
    return this.http.get<Number>(`${this.url}/reportes/retro`)
  }

  generarReporte() {
    return this.http.get(`${this.url}/reportes/generarReporte`, {
      responseType: 'blob'
    });
  }
}
