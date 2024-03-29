import {Component, inject, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-weather-search',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './weather-search.component.html',
  styleUrl: './weather-search.component.css',
})
export class WeatherSearchComponent implements OnInit {
  @Input() city: string = '';

  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);

  public searchForm: FormGroup;

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      searchInput: [this.city, Validators.required],
    });
  }

  public onSubmit() {
    const searchCity = this.searchForm.get('searchInput')!.value;
    this.router.navigate([`${searchCity}`]);
  }
}
