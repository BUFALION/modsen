import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherListHourlyComponent } from './weather-list-hourly.component';

describe('WeatherListHourlyComponent', () => {
  let component: WeatherListHourlyComponent;
  let fixture: ComponentFixture<WeatherListHourlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherListHourlyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeatherListHourlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
