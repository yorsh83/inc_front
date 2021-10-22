import { ReporteService } from './../../_service/reporte.service';
import { ArchivoService } from './../../_service/archivo.service';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { read } from 'fs';
import { TooltipPosition } from '@angular/material/tooltip';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {

  chart: any;
  tipo: string;
  totalIncidentes: Number;
  totalTomados: Number;
  totalAnalisis: Number;
  totalConstruccion: Number;
  totalPruebas: Number;
  totalLiberacion: Number;
  totalRetro: Number;
  pdfSrc: string = null;
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  constructor(private archivoService: ArchivoService, private reporteService: ReporteService) { }

  ngOnInit() {
    this.dibujar();
    this.total();
    this.tomados();
    this.analisis();
    this.construccion();
    this.pruebas();
    this.liberacion();
    this.retro();
  }

  total() {
    this.reporteService.contadorTotal().subscribe(total => {
      this.totalIncidentes = total;
    })
  }

  tomados() {
    this.reporteService.contadorTomados().subscribe(total => {
      this.totalTomados = total;
    })
  }

  analisis() {
    this.reporteService.contadoranalisis().subscribe(total => {
      this.totalAnalisis = total;
    })
  }

  construccion() {
    this.reporteService.contadorConstruccion().subscribe(total => {
      this.totalConstruccion = total;
    })
  }

  pruebas() {
    this.reporteService.contadorPruebas().subscribe(total => {
      this.totalPruebas = total;
    })
  }

  liberacion() {
    this.reporteService.contadorLiberacion().subscribe(total => {
      this.totalLiberacion = total;
    })
  }

  retro() {
    this.reporteService.contadorRetro().subscribe(total => {
      this.totalRetro = total;
    })
  }

  /*
  cambiar(tipo: string) {
    this.tipo = tipo;
    if (this.chart) {
      this.chart.destroy();
    }
    this.dibujar();
  }*/

  dibujar() {
    this.reporteService.contadoranalisis().subscribe(data => {
      let a = data;
      this.reporteService.contadorConstruccion().subscribe(data => {
        let c = data;
        this.reporteService.contadorPruebas().subscribe(data => {
          let p = data;
          this.reporteService.contadorLiberacion().subscribe(data => {
            let l = data;
            this.reporteService.contadorRetro().subscribe(data => {
              let r = data;
              this.chart = new Chart('canvas', {
                type: "bar",
                data: {
                  labels: ['analisis', 'construccion', 'pruebas', 'liberacion', 'cierre'],
                  datasets: [
                    {
                      label: 'reporte semanal',
                      data: [a, c, p, l, r],
                      fill: false,
                      backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)'
                      ],
                      borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)'
                      ],
                      borderWidth: 1
                    }
                  ]
                },
                options: {
                  legend: {
                    display: true
                  },
                  scales: {
                    xAxes: [{
                      display: true
                    }],
                    yAxes: [{
                      display: true
                    }],
                  }
                }
              });
            });//retro
          });//liberacion
        });//pruebas
      });//construccion
    });//analisis
  }

  generarReporte() {
    this.reporteService.generarReporte().subscribe(data => {
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.pdfSrc = e.target.result;
      }
      reader.readAsArrayBuffer(data);
    });
  }

  descargarReporte() {
    this.reporteService.generarReporte().subscribe(data => {
      const url = window.URL.createObjectURL(data);
      const a = document.createElement('a');
      a.setAttribute('style', 'display:none;');
      a.href = url;
      a.download = 'archivo.pdf'
      a.click();
    });
  }

}
