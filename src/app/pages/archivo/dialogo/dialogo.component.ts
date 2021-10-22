import { ArchivoService } from 'src/app/_service/archivo.service';
import { Archivo } from 'src/app/_model/archivo';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogo',
  templateUrl: './dialogo.component.html',
  styleUrls: ['./dialogo.component.css']
})
export class DialogoComponent implements OnInit {

  archivo: Archivo;

  constructor(private dialogRef: MatDialogRef<DialogoComponent>, @Inject(MAT_DIALOG_DATA) private data: Archivo,
    private archivoService: ArchivoService) { }

  ngOnInit() {
    this.archivo = new Archivo();
    this.archivo.detailDescription = this.data.detailDescription;
  }

  operar() {
    /*
    this.archivoService.modificar(this.archivo).subscribe(data => {
      this.archivoService.listar().subscribe(archivos => {
        this.archivoService.archivoCambio.next(archivos);
        this.archivoService.mensajeCambio.next("ACTUALIZADO");
      });
    });
    */
  }

  aceptar() {
    this.dialogRef.close();
  }

}
