import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin_master-layout',
  templateUrl: './admin_master-layout.component.html',
  styleUrls: ['./admin_master-layout.component.css']
})
export class Admin_masterLayoutComponent implements OnInit {

  activeIndex: number = -1;

  constructor() { }

  panelOpened(index: number) {
    this.activeIndex = index;
  }

  ngOnInit() {
  }

}
