import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusiclistitemComponent } from './musiclistitem.component';

describe('MusiclistitemComponent', () => {
  let component: MusiclistitemComponent;
  let fixture: ComponentFixture<MusiclistitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusiclistitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusiclistitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
