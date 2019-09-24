import { HttpParams } from '@angular/common/http';

export function setDateParams(view, currentYear, currentMonth) {
  if (view=='ytd') {
    return new HttpParams()
      .append('year', currentYear);
  }

  else if (view =='mtd') {
    return new HttpParams()
      .append('year', currentYear)
      .append('month', currentMonth);
  }

}

export function setPYDateParams(view, previousYear, currentMonth) {
  if (view == 'ytd') {
    return new HttpParams()
      .append('year', this.dateService.previousYear);
  }

  else if (view == 'mtd') {
    return new HttpParams()
      .append('year', this.dateService.previousYear)
      .append('month', this.dateService.currentMonth);
    }
}
