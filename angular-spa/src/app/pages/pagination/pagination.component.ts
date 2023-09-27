import { ChangeDetectorRef, Component, OnInit,ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeReimbursementService } from 'src/shared/services/employee-reimbursement.service';
import { MatPaginator } from '@angular/material/paginator';
import { EmployeeReimbursementModel } from 'src/shared/models/employee-reimbursement-model';
import {capitalizeFirstLetter} from 'src/shared/functions/helper-functions';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  
  displayedColumns: string[] = [
    'type',
    'totalAmount',
    'status',
    'reviewer',
    'transactionDate',
    'requestedDate',
     "action"
  ];

  empReimbursementData: EmployeeReimbursementModel[] = [];

  dataSource: MatTableDataSource<EmployeeReimbursementModel> = new MatTableDataSource();
  @ViewChild('paginator') paginator: any;
  pageSizes = [10, 30, 50, 100];
  pageSize = 10;
  pageNumber = 0;
  search = "";
  sortColumn = "TransactionDate"
  sortType = "ASC"
  dataCount = 0;

  constructor(private _employeeReimbursementService: EmployeeReimbursementService,
    private _cdr: ChangeDetectorRef){

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  ngOnInit(){
    console.log("Hello World")
    this.getPaginatedEmployeeReimbursement();
  }

  dataColumnChecker(data: any){
    if(data == null || data == undefined || data == "")
    return "N/A"
   return data
  }

  page(event: any){
    console.log(event)
    this.pageNumber = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getPaginatedEmployeeReimbursement();
  }

  getPaginatedEmployeeReimbursement(){
    let data = {
      "pageNumber": this.pageNumber + 1,
      "pageSize": this.pageSize,
      "search": this.search,
      "sortColumn": this.sortColumn,
      "sortType": this.sortType
    }
    this._employeeReimbursementService.getEmployeeReimbursementPaginatedData(data).subscribe(result => {
     this.dataSource = new MatTableDataSource(result.data);
     this.dataCount = result.count;
     this._cdr.detectChanges();
     console.log(result)
    }, error => {
      console.log(error);
    })
  }
  
  capitalizeFirstLetter(str: any){
    return str.charAt(0).toUpperCase() + str.slice(1);
   }

   onSearchChange(event: any){
    this.getPaginatedEmployeeReimbursement();
   }
 
}
