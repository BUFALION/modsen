import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherListWeekComponent } from './weather-list-week.component';

describe('WeatherListWeekComponent', () => {
  let component: WeatherListWeekComponent;
  let fixture: ComponentFixture<WeatherListWeekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherListWeekComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeatherListWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
