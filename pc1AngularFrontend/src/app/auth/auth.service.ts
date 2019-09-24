import { Injectable, OnInit } from '@angular/core';
import { User, Practice, Entity } from '../models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Router, NavigationExtras } from '@angular/router';
import { CollectionService} from '../services/collection.service';
import { environment } from '../../environments/environment';
import { DateService } from '../services/date.service';
import { EntityService } from '../services/entity.service';
import { PracticeService } from '../services/practice.service';
import { OrganizationTypeService } from '../services/organization-type.service'
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
  export class AuthService implements OnInit {
    queryParams: any;
    errors: any = [];
    isAuthenticated: boolean = false;
    authHeader: any;
    month: string;
      year: string;

    constructor(
      private http: HttpClient,
      private router: Router,
      private dateService: DateService,
      private practiceService: PracticeService,
      private entityService: EntityService,
      private userService: UserService,
      private orgService: OrganizationTypeService,
      private collectionService: CollectionService
      ) {
          this.year = this.dateService.currentYear;
        this.month = this.dateService.currentMonth;
    }

    ngOnInit() {
    }

    signup(user) {  }

    login(credentials) {
        return this.http.post<any>(environment['authUrl'], credentials);
    }

    logout() {
      this.errors = [];
      this.isAuthenticated = false;
    }

    updateData(data) {
      this.userService.selectUser({
        id: data['user_id'],
          email: data['email'],
          user_type: data['user_type'],
        });

      // if admin, see all entity data
        if (data['org_type']=="entity") {
          this.orgService.selectOrgType('entity');
          this.orgService.selectOrgName(data['entity_name'])
          this.orgService.selectOrgId(data['entity_id']);
        }
        // else, only see data related to a particular practice
        else {
        this.orgService.selectOrgType('practice');
        this.orgService.selectOrgName(data['practice_name']);
          this.orgService.selectOrgId(data['practice_id']);

        }
      localStorage.setItem('token', data['token']);
      this.errors = [];
      this.authHeader = new HttpHeaders().set("Authorization", "Token " + localStorage['token']);
    }

    navigateByUserType(data){
      this.isAuthenticated = true;
      let navExtras: NavigationExtras = { queryParams: {} }
      navExtras['queryParams'] = {
        year: this.year,
        month: this.month,
        }
      if (data['user_type'] == "admin") {
        this.router.navigate(
          ['home/entities', data['entity_slug']], navExtras
        );
      }
      else if (data['user_type']=="manager") {
        this.router.navigate(
          ['home/practices', data['practice_slug'], 'dashboard'], navExtras
        );
      }

      else {
        this.router.navigate(
          ['home/practices', data['practice_slug'], 'reporting'], {queryParams: {year: this.year, month: this.month}})
      }
      }


  }



