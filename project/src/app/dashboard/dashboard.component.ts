import { Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {AfterViewInit} from "@angular/core";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  percent: number = 90;
  @ViewChild("canvas") canvas: ElementRef;
  constructor() { }

  ngOnInit() {
    console.log(this.canvas);
    console.log(this.canvas.nativeElement.clientHeight);
  }
  ngAfterViewInit() {
    let context: CanvasRenderingContext2D = this.canvas.nativeElement.getContext("2d");
    let W = this.canvas.nativeElement.clientWidth;
    let H = this.canvas.nativeElement.clientHeight;
    let lineWidth = 10;
    let textSize = Math.floor(this.percent/360*100);
    let font = 16;
    let radians = this.percent * Math.PI / 180;

    // happy drawing from here on
    context.clearRect(0, 0, W, H);
    context.beginPath();
    context.strokeStyle = '#a5c1dd';
    context.lineWidth = lineWidth;
    context.arc(W/2, H/2, W/2-lineWidth, 0, Math.PI*2, false);
    context.stroke();
    //Blue circle
    context.beginPath();
    context.strokeStyle = '#01cb67';
    context.arc(W/2, H/2, W/2-lineWidth, 0 - 90*Math.PI/180, radians - 90*Math.PI/180, false);
    context.stroke();
    //Text
    context.fillStyle = "#01cb67";
    context.font = font +"px sans-serif";
    let text = "" + textSize;
    let text_width = context.measureText(text).width;
  console.log(text);
    context.fillText(text, W/2 - text_width/2, H/2 + font/2);
  }

}
