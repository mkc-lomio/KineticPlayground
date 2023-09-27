import { Component, OnInit } from '@angular/core';
import { EmployeeReimbursementService } from 'src/shared/services/employee-reimbursement.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  
  constructor(private _employeeReimbursementService: EmployeeReimbursementService){

  }

  ngOnInit(){
    console.log("Hello World")
    this._employeeReimbursementService.getWeatherForecast().subscribe(result => {
     console.log(result)
    }, error => {
      console.log(error);
    })
  }
}
