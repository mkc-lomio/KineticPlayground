import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { EmployeeReimbursementService } from "src/shared/services/employee-reimbursement.service";
import { EmployeeReimbursementModel } from "src/shared/models/employee-reimbursement-model";
import { MatDialog } from "@angular/material/dialog";
import { EmployeeReimbursementModalComponent } from "./employee-reimbursement-modal/employee-reimbursement-modal.component";

@Component({
  selector: "app-pagination",
  templateUrl: "./pagination.component.html",
  styleUrls: ["./pagination.component.scss"]
})
export class PaginationComponent implements OnInit {
  displayedColumns: string[] = [
    "type",
    "totalAmount",
    "status",
    "reviewer",
    "transactionDate",
    "requestedDate",
    "action",
  ];

  empReimbursementData: EmployeeReimbursementModel[] = [];

  dataSource: MatTableDataSource<EmployeeReimbursementModel> =
    new MatTableDataSource();
  @ViewChild("paginator") paginator: any;
  pageSizes = [10, 30, 50, 100];
  pageSize = 10;
  pageNumber = 0;
  search = "";
  sortColumn = "TransactionDate";
  sortType = "DESC";
  dataCount = 0;
  formStatus = "Create";

  constructor(
    private _employeeReimbursementService: EmployeeReimbursementService,
    private _cdr: ChangeDetectorRef,
    public dialog: MatDialog
  ) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.getPaginatedEmployeeReimbursement();
  }

  dataColumnChecker(data: any) {
    if (data == null || data == undefined || data == "") return "N/A";
    return data;
  }

  page(event: any) {
    this.pageNumber = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getPaginatedEmployeeReimbursement();
  }

  buildPaginatedEmployeeReimbursementData() {
    return {
      pageNumber: this.pageNumber + 1,
      pageSize: this.pageSize,
      search: this.search,
      sortColumn: this.sortColumn,
      sortType: this.sortType,
    };
  }

  getPaginatedEmployeeReimbursement() {
    let data = this.buildPaginatedEmployeeReimbursementData();
    this._employeeReimbursementService
      .getEmployeeReimbursementPaginatedData(data)
      .subscribe(
        (result) => {
          this.dataSource = new MatTableDataSource(result.data);
          this.dataCount = result.count;
          this._cdr.detectChanges();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  capitalizeFirstLetter(str: any) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  onSearchChange(event: any) {
    this.getPaginatedEmployeeReimbursement();
  }

  openCUDialog(status: string, data?: any) {
    this.formStatus = status;

    const dialogRef = this.dialog.open(EmployeeReimbursementModalComponent, {
      width: this.formStatus === "Delete" ? "400px" : "500px",
      height: this.formStatus === "Delete" ? "100px" : "700px",
      data: {
        formStatus: this.formStatus,
        empReimbursementFromPaginatedData: data,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getPaginatedEmployeeReimbursement();
      if (result != undefined) {
      }
    });
  }

  showTooltip(emp: any): any {
    let htmlContent: string = ""; 
    if(emp.status === "Approved")
      htmlContent = `<p>Approved Date: ${emp.approvedDate}</p><br />`

     htmlContent = htmlContent + `<p>Remarks: ${emp.reviewerRemarks}</p>`;
    return htmlContent;
  }
}
