import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-circle-svg',
  templateUrl: './circle-svg.component.html',
  styleUrls: ['./circle-svg.component.css']
})
export class CircleSvgComponent {
  @Input() svgClass: string = ''; // Classe dinâmica para o SVG
}
