import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.scss']
})
export class CabecalhoComponent implements OnInit {

  title = 'StarterPack';
  subtitulo = 'Um slogan incrível!';

  constructor() { }

  ngOnInit(): void {
  }

}
