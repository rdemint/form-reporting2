import { Component, OnInit, Input } from '@angular/core';
import { Practice } from '../../models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-practice-list',
  templateUrl: './practice-list.component.html',
  styleUrls: ['./practice-list.component.css']
})
export class PracticeListComponent implements OnInit {
  @Input() practices: Practice[];
  
  constructor(private router: Router) { }

  ngOnInit() {
  }

  navToPractice(practiceSlug) {
    this.router.navigate(['practices/', practiceSlug], {preserveQueryParams: true});
  }

}
