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

  /**
   *
   * @remarks
   * Id is greater than 1 ? yes ? update record. no ? insert record.
   *
   * @body -  
    {
  "id": 0,
  "reimbursementTypeId": 0,
  "employeeId": 0,
  "reviewerEmployeeId": 0,
  "reimbursementStatusId": 0,
  "additionalInfo": "string",
  "totalAmount": 0,
  "transactionDate": "2023-09-28T00:00:00.000Z",
  "approvedDate": "2023-09-28T00:00:00.000Z",
  "requestedDate": "2023-09-28T00:00:00.000Z",
   "isActive": false,
  "reviewerRemarks": "string"
       }
   * @returns STATUS OK / NOTFOUND
   *
   */

  
createOrUpdateEmployeeReimbursement(data: any): Observable<any> {
  let url= `${environment.kineticplaygroundapi}/api/EmployeeReimbursement`;
  
  let body=data;
  return this.http.post(url, body);
}

getEmployeeReimbursementById(id: any) {
  let queryParameter={
      id: id
  }
  let url= `${environment.kineticplaygroundapi}/api/EmployeeReimbursement?id=${queryParameter.id}`
  return this.http.get<any>(url);
}

deleteEmployeeReimbursementById(id: any) {
  let queryParameter={
      id: id
  }
  let url= `${environment.kineticplaygroundapi}/api/EmployeeReimbursement?id=${queryParameter.id}`
  return this.http.delete<any>(url);
}




getWeatherForecast() {
  let url=`${environment.kineticplaygroundapi}/api/WeatherForecast`;
  return this.http.get<any>(url);
}

}