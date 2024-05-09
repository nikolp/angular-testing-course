import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import for making http requests
import { Observable, of } from 'rxjs';
import { DropdownOption } from './dropdownoption';


@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(/*private http: HttpClient*/) { } // Inject HttpClient for API calls

  getOptions1(): Observable<DropdownOption[]> {
    return of([{value: "abc", label: "abc"}, {value: "xyz", label: "xyz"}]);
    // return this.http.get<DropdownOption[]>('api/dropdown/options');
  }

  getOptions2(): Observable<DropdownOption[]> {
    return of([{value: "1", label: "1"}, {value: "2", label: "2"}]);
    // return this.http.get<DropdownOption[]>('api/dropdown/options');
  }
}