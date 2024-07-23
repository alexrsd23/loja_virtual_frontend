import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloudSvgComponent } from './cloud-svg.component';

describe('CloudSvgComponent', () => {
  let component: CloudSvgComponent;
  let fixture: ComponentFixture<CloudSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloudSvgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CloudSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
