import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadUniquePageComponent } from './head-unique-page.component';

describe('HeadUniquePageComponent', () => {
  let component: HeadUniquePageComponent;
  let fixture: ComponentFixture<HeadUniquePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeadUniquePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeadUniquePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
