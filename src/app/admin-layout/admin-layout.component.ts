import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  
  activeIndex: number = -1;

  panelOpened(index: number) {
    this.activeIndex = index;
  }
  
  constructor() { }

  ngOnInit(): void {
  }

}
