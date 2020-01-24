import { Component, OnInit } from '@angular/core';
import { Marcador } from '../../classes/marcador.class';
import {  MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { MapaEditarComponent } from './mapa-editar.component';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styles: []
})
export class MapaComponent implements OnInit {


  title : string = "Mi primer mapa";
  lat: number = 42.84641;
  lng: number = -2.667893;
  zoom : number = 15;

  marcadores : Marcador[] = [];

  constructor(private snack: MatSnackBar, private dialogo: MatDialog) {
      if(localStorage.getItem("marcadores")){
        this.marcadores = JSON.parse(localStorage.getItem("marcadores"));
      }

   }

  ngOnInit() {
  }

  agregarMarcador(e:any){

    const coords : {lat:number,lng:number} = e.coords;
    const nuevoMarcador = new Marcador(coords.lat,coords.lng);
    this.marcadores.push(nuevoMarcador);
    this.guardarStorage();
    this.snack.open('Marcador agregado',"Cerrar",{duration:2000});
  }

  guardarStorage(){
    localStorage.setItem("marcadores",JSON.stringify(this.marcadores));
  }

  borrarMarcador(i:number){
    this.marcadores.splice(i,1);
    this.guardarStorage();
    this.snack.open('Marcador borrado',"Cerrar",{duration:2000});
  }

  editarMarcador(marcador : Marcador){
    const dialogRef = this.dialogo.open(MapaEditarComponent, {
      width: '250px',
      data: {titulo: marcador.titulo, desc: marcador.desc}
    });
    dialogRef.afterClosed().subscribe(result =>{
        if(!result){
          return;
        }
        marcador.titulo = result.titulo;
        marcador.desc = result.desc;

        this.guardarStorage();

        this.snack.open("Marcador guardado correctamente","Cerrar",{
          duration: 3000
        });
    });
  }

}
