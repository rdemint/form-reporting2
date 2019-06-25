import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashLoadingService {
practiceCount: number;
  practiceReq: number;
  practiceIsLoading: boolean;
  providerCount: number;
  providerReq: number;
  provivderIsLoading: boolean;
  specialtyCount: number;
  specialtyReq: number;
  specialtyIsLoading: boolean;

  constructor() { }

  practice() {
    this.practiceCount = 0;
  }

  practiceCountListener() {
    this.practiceCount += 1;
  }

  providerCountReset() {
  	this.providerCount = 0;
  }

  providerCountListener() {
  	this.providerCount += 1;
  }

  providerIs

}
