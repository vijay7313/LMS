import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthcontrolService } from 'src/app/services/authcontrol.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  @Output()
    filterCategory=new EventEmitter<string>();
  userName : any;

  constructor(public auth: AuthcontrolService) { }

  ngOnInit(): void {
    this.userName = this.auth.getUserName();
  }

  selected(category:string) { 
    this.filterCategory.emit(category)
  }
}