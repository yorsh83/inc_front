import { CatKanban } from './../../_model/kanban';
import { DialogoKanbanComponent } from './dialogo-kanban/dialogo-kanban.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Kanban } from 'src/app/_model/kanban';
import { KanbanService } from 'src/app/_service/kanban.service';
import { MatDialog } from '@angular/material/dialog';
import swal from 'sweetalert2';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent implements OnInit {

  dsAnalisis: MatTableDataSource<Kanban> = null;
  dsConstruccion: MatTableDataSource<Kanban> = null;
  dsPruebas: MatTableDataSource<Kanban> = null;
  dsLiberacion: MatTableDataSource<Kanban> = null;
  dsRetro: MatTableDataSource<Kanban> = null;
  colAnalisis = ['analisis'];
  colConst = ['construccion'];
  colPruebas = ['pruebas'];
  colLib = ['liberacion'];
  colRetro = ['retrospectiva'];
  panelOpenState = false;
  kanban: Kanban;
  selFlujo: string;
  lstTipos: CatKanban[] = [
    { value: '1', viewValue: 'Analisis' },
    { value: '2', viewValue: 'Construccion' },
    { value: '4', viewValue: 'Liberacion' },
    { value: '3', viewValue: 'Pruebas' },
    { value: '6', viewValue: 'Cierre' }
  ];
  elemMostrar = this.lstTipos.slice(0, 3)

  constructor(private kanbanService: KanbanService, private dialog: MatDialog) { }

  ngOnInit() {
    this.lstAnalisisAct();
    this.lstConstruccionAct();
    this.lstPruebasAct();
    this.lstLiberacionesAct();
    this.lstRetroAct();
    this.lstAnalisis();
    this.lstConstruccion();
    this.lstPruebas();
    this.lstLiberacion();
    this.lstRetro();
  }

  lstAnalisisAct() {
    this.kanbanService.analisisCambio.subscribe(datos => {
      this.dsAnalisis = new MatTableDataSource(datos);
    });
  }

  lstConstruccionAct() {
    this.kanbanService.construccionesCambio.subscribe(datos => {
      this.dsConstruccion = new MatTableDataSource(datos);
    });
  }

  lstPruebasAct() {
    this.kanbanService.pruebasCambio.subscribe(datos => {
      this.dsPruebas = new MatTableDataSource(datos);
    });
  }

  lstLiberacionesAct() {
    this.kanbanService.liberacionesCambio.subscribe(datos => {
      this.dsLiberacion = new MatTableDataSource(datos);
    });
  }

  lstRetroAct() {
    this.kanbanService.retrospectivasCambio.subscribe(datos => {
      this.dsRetro = new MatTableDataSource(datos);
    });
  }

  lstAnalisis() {
    this.kanbanService.listarAnalisis().subscribe(datosObt => {
      this.dsAnalisis = new MatTableDataSource(datosObt);
    });
  }

  lstConstruccion() {
    this.kanbanService.listarConstruccion().subscribe(datosObt => {
      this.dsConstruccion = new MatTableDataSource(datosObt);
    });
  }

  lstPruebas() {
    this.kanbanService.listarPruebas().subscribe(datosObt => {
      this.dsPruebas = new MatTableDataSource(datosObt);
    });
  }

  lstLiberacion() {
    this.kanbanService.listarLiberacion().subscribe(datosObt => {
      this.dsLiberacion = new MatTableDataSource(datosObt);
    });
  }

  lstRetro() {
    this.kanbanService.listarRetrospectiva().subscribe(datosObt => {
      this.dsRetro = new MatTableDataSource(datosObt);
    });
  }

  openDetail(kanban: Kanban) {
    //let selIdInc = kanban != null ? kanban : new Kanban();
    this.dialog.open(DialogoKanbanComponent, {
      width: '250px',
      data: kanban
    });
  }

  test(k: Kanban) {
  }

  avanzar(kanban: Kanban) {
    this.kanban = new Kanban();
    this.kanban.id = kanban.id;
    this.kanban.idArchivo = kanban.idArchivo;
    this.kanban.idIncident = kanban.idIncident;
    this.kanban.detail = kanban.detail;
    this.kanban.lastModifiedDate = kanban.lastModifiedDate;
    this.kanban.priority = kanban.priority;
    this.kanban.statusKanban = this.selFlujo;

    //ANALISIS
    if (kanban.statusKanban === '1') {
      this.kanban.statusKanban = '2';
      this.kanbanService.actualizarFlujo(this.kanban).subscribe(data => {
        this.kanbanService.listarAnalisis().subscribe(datos => {
          this.kanbanService.analisisCambio.next(datos);
          this.kanbanService.listarConstruccion().subscribe(datos => {
            this.kanbanService.construccionesCambio.next(datos);
          });
          swal.fire('Flujo avanza', `El incidente pasó a Construccion`, 'success');
        });
      });
      //CONSTRUCCION
    } else if (kanban.statusKanban === '2') {
      this.kanban.statusKanban = '3';
      this.kanbanService.actualizarFlujo(this.kanban).subscribe(data => {
        this.kanbanService.listarConstruccion().subscribe(datos => {
          this.kanbanService.construccionesCambio.next(datos);
          this.kanbanService.listarPruebas().subscribe(datos => {
            this.kanbanService.pruebasCambio.next(datos);
          });
          swal.fire('Flujo avanza', `El incidente pasó a Pruebas`, 'success');
        });
      });
      //PRUEBAS
    } else if (kanban.statusKanban === '3') {
      if (this.kanban.statusKanban === '1') {
        this.kanbanService.actualizarFlujo(this.kanban).subscribe(data => {
          this.kanbanService.listarAnalisis().subscribe(datos => {
            this.kanbanService.analisisCambio.next(datos);
            this.kanbanService.listarPruebas().subscribe(datos => {
              this.kanbanService.pruebasCambio.next(datos);
              swal.fire('Flujo retrocede', `El incidente regresá a Análisis`, 'success');
            });
          });
        });
      } else if (this.kanban.statusKanban === '2') {
        this.kanbanService.actualizarFlujo(this.kanban).subscribe(data => {
          this.kanbanService.listarConstruccion().subscribe(datos => {
            this.kanbanService.construccionesCambio.next(datos);
            this.kanbanService.listarPruebas().subscribe(datos => {
              this.kanbanService.pruebasCambio.next(datos);
              swal.fire('Flujo retrocede', `El incidente regresá a Construcción`, 'success');
            });
          });
        });
      } else if (this.kanban.statusKanban === '4') {
        this.kanbanService.actualizarFlujo(this.kanban).subscribe(data => {
          this.kanbanService.listarPruebas().subscribe(datos => {
            this.kanbanService.pruebasCambio.next(datos);
            this.kanbanService.listarLiberacion().subscribe(datos => {
              this.kanbanService.liberacionesCambio.next(datos);
              swal.fire('Flujo avanza', `El incidente pasó a Liberacion`, 'success');
            });
          });
        });
      }
      //LIBERACION
    } else if (kanban.statusKanban === '4') {
      this.kanban.statusKanban = '5';
      this.kanbanService.actualizarFlujo(this.kanban).subscribe(data => {
        this.kanbanService.listarLiberacion().subscribe(datos => {
          this.kanbanService.liberacionesCambio.next(datos);
          this.kanbanService.listarRetrospectiva().subscribe(datos => {
            this.kanbanService.retrospectivasCambio.next(datos);
            swal.fire('Flujo avanza', `El incidente pasó a Cierre`, 'success');
          });
        });
      });
      //CIERRE
    } else if (kanban.statusKanban === '5') {
      if (this.kanban.statusKanban === '1') {
        this.kanbanService.actualizarFlujo(this.kanban).subscribe(data => {
          this.kanbanService.listarAnalisis().subscribe(datos => {
            this.kanbanService.analisisCambio.next(datos);
            this.kanbanService.listarRetrospectiva().subscribe(datos => {
              this.kanbanService.retrospectivasCambio.next(datos);
              swal.fire('Flujo retrocede', `El incidente regresá a Análisis`, 'success');
            });
          });
        });
      } else if (this.kanban.statusKanban === '2') {
        this.kanbanService.actualizarFlujo(this.kanban).subscribe(data => {
          this.kanbanService.listarConstruccion().subscribe(datos => {
            this.kanbanService.construccionesCambio.next(datos);
            this.kanbanService.listarRetrospectiva().subscribe(datos => {
              this.kanbanService.retrospectivasCambio.next(datos);
              swal.fire('Flujo retrocede', `El incidente regresá a Construcción`, 'success');
            });
          });
        });
      } else if (this.kanban.statusKanban === '3') {
        this.kanbanService.actualizarFlujo(this.kanban).subscribe(data => {
          this.kanbanService.listarPruebas().subscribe(datos => {
            this.kanbanService.pruebasCambio.next(datos);
            this.kanbanService.listarRetrospectiva().subscribe(datos => {
              this.kanbanService.retrospectivasCambio.next(datos);
              swal.fire('Flujo retrocede', `El incidente regresá a Pruebas`, 'success');
            });
          });
        });
      } else {
        this.kanban.statusKanban === '6';
        this.kanbanService.eliminarIncidente(this.kanban.id).subscribe(data => {
          this.kanbanService.listarRetrospectiva().subscribe(datos => {
            this.kanbanService.retrospectivasCambio.next(datos);
            swal.fire('Flujo terminado', `El incidente se ha cerrado`, 'success');
          });
        });
      }
    }
  }

}
