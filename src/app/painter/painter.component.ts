import { Component, OnInit } from '@angular/core';
import { Painter } from '../painter';

@Component({
  selector: 'app-painter',
  templateUrl: './painter.component.html',
  styleUrls: ['./painter.component.css']
})
export class PainterComponent implements OnInit {
  canvas: any;
  painter: Painter;
  height: number;
  width: number;
  tool_keys: string[];

  brushes_urls: string[];

  constructor() {
    this.brushes_urls = [
      'http://res.cloudinary.com/drjvh4g6x/image/upload/v1523728123/11_hdrlwt.png',
      'http://res.cloudinary.com/drjvh4g6x/image/upload/v1523783765/tree3s_solurk.png',
      'http://res.cloudinary.com/drjvh4g6x/image/upload/v1523783765/tree2s_nkiwji.png',
      'http://res.cloudinary.com/drjvh4g6x/image/upload/v1523783765/tree1s_hplnim.png',
      'http://res.cloudinary.com/drjvh4g6x/image/upload/v1523965138/tour_lmfv2d.png',
      'http://res.cloudinary.com/drjvh4g6x/image/upload/v1523965121/poor_casle_b8bld0.png',
      'http://res.cloudinary.com/drjvh4g6x/image/upload/v1523965116/light_casle_v8d2xh.png',
      'http://res.cloudinary.com/drjvh4g6x/image/upload/v1523965104/dark_casle_wtcsci.png',
      'http://res.cloudinary.com/drjvh4g6x/image/upload/v1523966109/poor_house_n5q451.png',
      'http://res.cloudinary.com/drjvh4g6x/image/upload/v1523966109/very_poor_house_bm8egu.png',
      'http://res.cloudinary.com/drjvh4g6x/image/upload/v1523966109/dwarf_house_lmg2bp.png',
      'http://res.cloudinary.com/drjvh4g6x/image/upload/v1523966109/big_dark_house_o8t4uu.png',
      'http://res.cloudinary.com/drjvh4g6x/image/upload/v1523966109/red_house_tzlz1p.png',
      'http://res.cloudinary.com/drjvh4g6x/image/upload/v1523966109/mediaum_stown_house_qjifyx.png',

    ]
  }

  ngOnInit() {
    this.canvas = document.getElementById('myCanvas');
    this.painter = new Painter(
      this.canvas.getContext('2d'),
      [document.getElementById('mount-img')],
      [{}]
    )
    this.height = 640;
    this.width = 1024;

    this.canvas.onmousedown = this.painter.penDown;
    this.canvas.onmousemove = this.painter.penMove;
    this.canvas.onmouseup = this.painter.penUp;
  }

  selectBrush = (e, id): void => {
    this.painter.currentBrush = e.srcElement;//document.getElementById(id);
  }

  fill = ():void => {
    this.painter.fill(this.width, this.height);
  }
}
