import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeReimbursementService {

  constructor(private http: HttpClient) { }


  getEmployeeReimbursementPaginatedData(data: any): Observable<any> {
    let url= `${environment.kineticplaygroundapi}/api/EmployeeReimbursement/paginated-data`;
    let body=data;
    return this.http.post(url, body);
}


   
getWeatherForecast() {
  let url=`${environment.kineticplaygroundapi}/api/WeatherForecast`;
  return this.http.get<any>(url);
}

}