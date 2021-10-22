import { element } from 'protractor';
import { KanbanService } from 'src/app/_service/kanban.service';
import { Kanban } from 'src/app/_model/kanban';
import { DialogoComponent } from './dialogo/dialogo.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ArchivoService } from 'src/app/_service/archivo.service';
import { MatTableDataSource } from '@angular/material/table';
import { Archivo } from 'src/app/_model/archivo';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import swal from 'sweetalert2';

@Component({
  selector: 'app-archivo',
  templateUrl: './archivo.component.html',
  styleUrls: ['./archivo.component.css']
})
export class ArchivoComponent implements OnInit {

  archivos: Archivo[] = [];
  archivo: Archivo;
  kanban: Kanban;
  dataSource: MatTableDataSource<Archivo> = null;
  displayedColumns = ['idIncident', 'srid', 'name', 'status', 'priority', 'assignedGroup', 'assignee', 'slmStatus', 'submitDate', 'lastModifiedDate', 'lastResolvedDate', 'detail', 'kanban', 'usuario'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  selectedFiles: FileList;
  currentFileUpload: File;
  labelFile: string;
  cantidad: number;
  loading: boolean;
  loadingUpload: boolean;
  bandera: boolean = false;
  progress: boolean = false;
  lista: Archivo[] = [];
  id: string;
  select: boolean;
  valorBase: string;
  habilitar: boolean = true;
  procesado: boolean;

  constructor(private archivoService: ArchivoService, private route: ActivatedRoute, private dialog: MatDialog,
    private kanbanService: KanbanService) {
    this.loading = true
    this.progress = true
  }

  ngOnInit() {
    this.listar();
    this.listadoActualizado();
    this.kanban = new Kanban();
    this.archivo = new Archivo();
    this.route.params.subscribe((p: Params) => {
      this.id = p['id'];
      this.select = this.id != null;
    });
  }

  listar() {
    this.archivoService.listar().subscribe(datosObt => {
      this.archivos = datosObt;
      this.dataSource = new MatTableDataSource(datosObt);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.loading = false;
    });
    /*
    this.archivoService.listarPageable(0, 10).subscribe((data: any) => {
      let archivos = data.content;
      this.cantidad = data.totalElements;

      this.dataSource = new MatTableDataSource(archivos);
      this.dataSource.sort = this.sort;
    });*/
  }

  listadoActualizado() {
    this.archivoService.archivoCambio.subscribe(datos => {
      this.dataSource = new MatTableDataSource(datos);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  /*avisos() {
    this.archivoService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000
      });
    });
  }*/

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  seleccionarArchivo(e: any) {
    //console.log(e.target.files);
    this.labelFile = e.target.files[0].name;
    this.selectedFiles = e.target.files;
  }

  cargaArchivo() {
    this.loadingUpload = true;
    this.bandera = true;
    this.currentFileUpload = this.selectedFiles.item(0);
    this.archivoService.cargarArchivo(this.currentFileUpload).subscribe(() => {
      this.archivoService.listar().subscribe(data => {
        this.selectedFiles = undefined;
        this.labelFile = undefined;
        this.archivoService.archivoCambio.next(data);
        swal.fire('Completado', `Se actualizó la informacion con exito`, 'success');
        this.loadingUpload = false;
        this.bandera = false;
        //this.archivoService.mensajeCambio.next('SE CARGO LA INFROMACION');
      });
    });
  }

  openDialogDet(archivo: Archivo) {
    this.dialog.open(DialogoComponent, {
      width: '250px',
      data: archivo
    });
  }

  test(archivoRows: Archivo) {
    this.archivoService.listarPorId(archivoRows.idIncident).subscribe(data => {
      console.log("base" + data.idIncident);
      if (archivoRows.idIncident === data.idIncident) {
        console.log("entra");
      } else {
        console.log("no entra");
      }
    });
  }

  cargarKanban(archivoRow: Archivo) {
    this.habilitar = (this.habilitar == true)?false: true
    this.archivoService.listarPorId(archivoRow.idIncident).subscribe(data => {
      this.valorBase = data.idIncident;
      this.progress = false;
      this.archivo.id = archivoRow.id;
      this.archivo.idIncident = archivoRow.idIncident;
      this.archivo.assignedGroup = archivoRow.assignedGroup;
      this.archivo.assignee = archivoRow.assignee;
      this.archivo.detailDescription = archivoRow.detailDescription;
      this.archivo.lastModifiedDate = archivoRow.lastModifiedDate;
      this.archivo.lastResolvedDate = archivoRow.lastResolvedDate;
      this.archivo.name = archivoRow.name;
      this.archivo.priority = archivoRow.priority;
      this.archivo.slmStatus = archivoRow.slmStatus;
      this.archivo.srid = archivoRow.srid;
      this.archivo.status = archivoRow.status;
      this.archivo.submitDate = archivoRow.submitDate;
      this.archivo.usuario = "jl493p";

      this.kanban.idIncident = archivoRow.idIncident;
      this.kanban.priority = archivoRow.priority;
      this.kanban.lastModifiedDate = archivoRow.lastModifiedDate;
      this.kanban.idArchivo = archivoRow.id;

      this.archivoService.asignarUsuario(this.archivo).subscribe(dato => {
        this.archivoService.listar().subscribe(datos => {
          this.archivoService.archivoCambio.next(datos);
          this.kanbanService.insertarKanban(this.kanban).subscribe(() => {
            swal.fire('Proceso completado', `Se cargo en kanban con exito`, 'success');
            this.progress = true;
            this.procesado = true;
          });
        });
      });
    });
  }

  mostrarMas(e: any) {
    this.archivoService.listarPageable(e.pageIndex, e.pageSize).subscribe((data: any) => {
      let archivos = data.content;
      this.cantidad = data.totalElements;
      this.dataSource = new MatTableDataSource(archivos);
      this.dataSource.sort = this.sort;
    });
  }

}
