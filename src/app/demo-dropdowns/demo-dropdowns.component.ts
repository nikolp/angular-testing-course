import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DropdownService } from '../courses/services/dropdown.service';
import { DropdownOption } from '../courses/services/dropdownoption';

@Component({
  selector: 'demo-dropdowns',
  templateUrl: './demo-dropdowns.component.html',
  styleUrls: ['./demo-dropdowns.component.css']
})
export class DemoDropdownsComponent implements OnInit {

  choices1: DropdownOption[] = [];
  selectedOption1: DropdownOption | null = null;

  choices2: DropdownOption[] = [];
  selectedOption2: DropdownOption | null = null;

  choices3: DropdownOption[] = [];

  constructor(private dropdownService: DropdownService) { }

  ngOnInit() {
    this.dropdownService.getOptions1().subscribe(
      data => {
        console.log("Got data for Dropdown 1: ", data);
        this.choices1 = data;
      }
    );
    this.dropdownService.getOptions2().subscribe(
      data => {
        console.log("Got data for Dropdown 2: ", data);
        this.choices2 = data;
      }
    );
    this.choices3 = [{value: "FOO", label: 'FOO'}];
  }

  onSelectionChange1(option: DropdownOption) {
    this.selectedOption1 = option;
  }

  onSelectionChange2(option: DropdownOption) {
    this.selectedOption2 = option;
  }  
}
