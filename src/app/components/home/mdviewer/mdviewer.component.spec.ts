import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MDViewerComponent } from './mdviewer.component';

describe('MDViewerComponent', () => {
  let component: MDViewerComponent;
  let fixture: ComponentFixture<MDViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MDViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MDViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
