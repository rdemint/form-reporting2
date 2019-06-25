import { Component, OnInit, Input } from '@angular/core';
import { Entity, Practice } from '../../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-practice-list',
  templateUrl: './practice-list.component.html',
  styleUrls: ['./practice-list.component.css']
})
export class PracticeListComponent implements OnInit {
  @Input() practices: Practice[];
  @Input() org: Entity | Practice;
  constructor(private router: Router) { }
  childInitRequired:number;
  childInitCount: number;

  ngOnInit() {
    this.childInitRequired = this.practices.length;
    this.childInitCount = 0;
  }

  navToPractice(practiceSlug) {
    this.router.navigate(['practices/', practiceSlug], {preserveQueryParams: true});
  }

  resetChildInitCount() {
    this.childInitCount = 0;
  }

  childInitialized() {
    this.childInitCount += 1;
  }
    

}
