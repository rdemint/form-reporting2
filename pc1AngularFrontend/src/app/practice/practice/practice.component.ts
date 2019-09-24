import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { User } from '../../models';
import { Practice, DailySummary } from '../../models';

import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css'],
})
export class PracticeComponent implements OnInit {
  @Input() practice: Practice;

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
