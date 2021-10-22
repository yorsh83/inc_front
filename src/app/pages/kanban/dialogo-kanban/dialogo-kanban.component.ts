import { KanbanService } from 'src/app/_service/kanban.service';
import { Component, Inject, OnInit } from '@angular/core';
import { Kanban } from 'src/app/_model/kanban';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import swal from 'sweetalert2';

@Component({
  selector: 'app-dialogo-kanban',
  templateUrl: './dialogo-kanban.component.html',
  styleUrls: ['./dialogo-kanban.component.css']
})
export class DialogoKanbanComponent implements OnInit {

  kanban: Kanban;

  constructor(private dialogRef: MatDialogRef<DialogoKanbanComponent>, @Inject(MAT_DIALOG_DATA) private data: Kanban,
    private kanbanService: KanbanService) { }

  ngOnInit() {
    this.kanban = new Kanban;
    this.kanban.id = this.data.id;
    this.kanban.idIncident = this.data.idIncident;
    this.kanban.lastModifiedDate = this.data.lastModifiedDate;
    this.kanban.priority = this.data.priority;
    this.kanban.statusKanban = this.data.statusKanban;
    this.kanban.detail = this.data.detail;
  }

  actualizarTexto() {
    if (this.kanban != null && this.kanban.statusKanban === '1') {
      this.kanbanService.actualizarTexto(this.kanban).subscribe(data => {
        this.kanbanService.listarAnalisis().subscribe(datos => {
          this.kanbanService.analisisCambio.next(datos);
          swal.fire('Analisis completo', `Se editó el detalle con exito`, 'success');
        });
      });
    } else if (this.kanban != null && this.kanban.statusKanban === '2') {
      this.kanbanService.actualizarTexto(this.kanban).subscribe(data => {
        this.kanbanService.listarConstruccion().subscribe(datos => {
          this.kanbanService.construccionesCambio.next(datos);
          swal.fire('Construccion completa', `Se editó el detalle con exito`, 'success');
        });
      });
    } else if (this.kanban != null && this.kanban.statusKanban === '3') {
      this.kanbanService.actualizarTexto(this.kanban).subscribe(data => {
        this.kanbanService.listarPruebas().subscribe(datos => {
          this.kanbanService.pruebasCambio.next(datos);
          swal.fire('Pruebas completa', `Se editó el detalle con exito`, 'success');
        });
      });
    } else if (this.kanban != null && this.kanban.statusKanban === '4') {
      this.kanbanService.actualizarTexto(this.kanban).subscribe(data => {
        this.kanbanService.listarLiberacion().subscribe(datos => {
          this.kanbanService.liberacionesCambio.next(datos);
          swal.fire('Liberacion completa', `Se editó el detalle con exito`, 'success');
        });
      });
    } else if (this.kanban != null && this.kanban.statusKanban === '5') {
      this.kanbanService.actualizarTexto(this.kanban).subscribe(data => {
        this.kanbanService.listarRetrospectiva().subscribe(datos => {
          this.kanbanService.retrospectivasCambio.next(datos);
          swal.fire('Retro completa', `Se editó el detalle con exito`, 'success');
        });
      });
    }
    this.dialogRef.close();
  }

  cancelar() {
    this.dialogRef.close();
  }

}
