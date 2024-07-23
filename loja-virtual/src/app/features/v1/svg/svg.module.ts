import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CloudSvgComponent } from './cloud-svg/cloud-svg.component';
import { CircleSvgComponent } from './circle-svg/circle-svg.component';



@NgModule({
  declarations: [CloudSvgComponent, CircleSvgComponent],
  imports: [
    CommonModule
  ],
  exports: [CloudSvgComponent, CircleSvgComponent
  ]
})
export class SvgModule { }
