import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherTogglerComponent } from './weather-toggler.component';

describe('WeatherTogglerComponent', () => {
  let component: WeatherTogglerComponent;
  let fixture: ComponentFixture<WeatherTogglerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherTogglerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeatherTogglerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
