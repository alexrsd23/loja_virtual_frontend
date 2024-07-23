import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cloud-svg',
  templateUrl: './cloud-svg.component.html',
  styleUrls: ['./cloud-svg.component.css']
})
export class CloudSvgComponent {
  @Input() svgClass: string = '';
}
