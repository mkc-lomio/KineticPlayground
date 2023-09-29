import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { dateSingleDigitWithLeadingZeros, getISODateTime, getUTCDateTime } from "src/shared/functions/date-func";
import { deepClone } from "src/shared/functions/object-clone";
import { EmployeeReimbursementService } from "src/shared/services/employee-reimbursement.service";

@Component({
  selector: "app-employee-reimbursement-modal",
  templateUrl: "./employee-reimbursement-modal.component.html",
  styleUrls: ["./employee-reimbursement-modal.component.scss"],
})
export class EmployeeReimbursementModalComponent implements OnInit {
  employeReimbursementForm: any;
  reimbursementTypes = [
    {
      id: 1,
      name: "Travel Expenses",
      code: "TER",
    },
    {
      id: 2,
      name: "Meal Expenses",
      code: "MER",
    },
    {
      id: 3,
      name: "Mileage",
      code: "MLR",
    },
    {
      id: 4,
      name: "Travel Expenses Reimbursement",
      code: "TER",
    },
    {
      id: 5,
      name: "Entertainment Expenses",
      code: "EER",
    },
    {
      id: 6,
      name: "Office Supplies and Equipment",
      code: "OSR",
    },
    {
      id: 7,
      name: "Professional Development and Training",
      code: "PDR",
    },
    {
      id: 8,
      name: "Medical Expenses",
      code: "MDR",
    },
    {
      id: 9,
      name: "Miscellaneous",
      code: "MR",
    },
    {
      id: 10,
      name: "Other Reimbursement",
      code: "OR",
    },
  ];

  reimbursementStatus = [
    {
      id: 1,
      name: "Approved",
    },
    {
      id: 2,
      name: "Submitted",
    },
    {
      id: 3,
      name: "Rejected",
    },
    {
      id: 4,
      name: "Cancelled",
    },
  ];

  get reimbursementTypeFormField() {
    return this.employeReimbursementForm.get("reimbursementType");
  }
  get totalAmountFormField() {
    return this.employeReimbursementForm.get("totalAmount");
  }

  formStatus: string = "";
  employeeReimbursementStatus: string = "";
  requestedDate: any;
  requestedMinDate: Date = new Date();
  transactionDate: any;
  transactionMaxDate: Date = new Date();
  employeeReimbursementId: any;
  employeeReimbursementDetails: any;

  constructor(
    private dialogRef: MatDialogRef<EmployeeReimbursementModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _employeeReimbursementService: EmployeeReimbursementService
  ) {
    this.initConstructor();
  }

  ngOnInit(): void {}

  formGroupInit() {
    this.employeReimbursementForm = this.fb.group({
      reimbursementType: new FormControl("", [Validators.required]),
      transactionDate: new FormControl(getISODateTime()),
      requestedDate: new FormControl(getISODateTime()),
      additionalInformation: new FormControl("", []),
      totalAmount: new FormControl(0, [Validators.required]),
    });
  }

  initConstructor() {
    this.formGroupInit();
    this.initFormData();
  }

  initFormData() {
    if (this.data != undefined) {
      this.formStatus = this.data.formStatus;
      if (this.data.empReimbursementFromPaginatedData != undefined) {
        this.employeeReimbursementStatus =
          this.data.empReimbursementFromPaginatedData.status ?? "N/A";
        this.employeeReimbursementId =
          this.data.empReimbursementFromPaginatedData.employeeReimbursementId ??
          "N/A";

        if (this.formStatus === "Update") {
          this.populateFormFieldsForFormUpdate();
        }
      }
    }
  }

  showFormStatus(formStatus: string) {
    if (formStatus === "Create") return "New";
    if (formStatus === "Update") return this.employeeReimbursementStatus;
    return "N/A";
  }

  onSubmit(data?: any) {
    if (data != undefined) {
      let employeeReimbursementPayload =
        this.buildEmployeeReimbursementData(data);

      if (this.formStatus === "Create"){
        this.createEmployeeReimbursement(employeeReimbursementPayload);
     }
      if (this.formStatus === "Update") {
        this.updateEmployeeReimbursement(employeeReimbursementPayload);
      }
    }
    if (this.formStatus === "Delete")
      this.deleteEmployeeReimbursement(this.employeeReimbursementId);
  }

  checkError(controlName: any, errorName: string): any {
    return this.employeReimbursementForm.controls[controlName].hasError(
      errorName
    );
  }

  close() {
    this.dialogRef.close();
  }

  dateChangeHandler(date: Date, type: string) {

    let stringDate: string = `${date.getFullYear()}-${dateSingleDigitWithLeadingZeros(date.getMonth() + 1)}-${dateSingleDigitWithLeadingZeros(date.getDate())}T00:00:00.000Z`
    // toISOString Format - YYYY-MM-ddT00:00:00.000Z example 2023-09-29T00:00:00.000Z 

    if (type === "transactionDate") {
      this.employeReimbursementForm.get("transactionDate").setValue(stringDate);
    }
    if (type === "requestedDate") {
      this.employeReimbursementForm.get("requestedDate").setValue(stringDate);
    }
  }

  buildEmployeeReimbursementData(formData: any) {
    let reimbursementType = this.reimbursementTypes.find(
      (x) => x.code == formData.reimbursementType
    );

    let data = {
      id: this.formStatus === "Create" ? 0 : this.employeeReimbursementId,
      reimbursementTypeId: reimbursementType?.id ?? 0,
      employeeId: 1,
      reviewerEmployeeId: 1,
      reimbursementStatusId: 2,
      additionalInfo: formData.additionalInformation,
      totalAmount: formData.totalAmount,
      transactionDate: formData.transactionDate,
      approvedDate: null,
      isActive: true,
      requestedDate: formData.requestedDate,
      reviewerRemarks: "",
    };
    return data;
  }

  createEmployeeReimbursement(data: any) {
    this._employeeReimbursementService
      .createOrUpdateEmployeeReimbursement(data)
      .subscribe(
        (result) => {
          alert("SUCCESS!");
          this.close();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  updateEmployeeReimbursement(data: any) {
    this._employeeReimbursementService
      .createOrUpdateEmployeeReimbursement(data)
      .subscribe(
        (result) => {
          alert("SUCCESS!");
          this.close();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  deleteEmployeeReimbursement(id: any) {
    this._employeeReimbursementService
      .deleteEmployeeReimbursementById(id)
      .subscribe(
        (result) => {
          alert("SUCCESS!");
          this.close();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  populateFormFieldsForFormUpdate() {
    this._employeeReimbursementService
      .getEmployeeReimbursementById(this.employeeReimbursementId)
      .subscribe(
        (result) => {
          this.employeeReimbursementDetails = result;
          if (
            this.employeeReimbursementDetails != null &&
            this.employeeReimbursementDetails != undefined
          ) {
            let reimbursementType = this.reimbursementTypes.find(
              (x) =>
                x.id === this.employeeReimbursementDetails.reimbursementTypeId
            );
            if (reimbursementType != undefined) {
              this.employeReimbursementForm
                .get("reimbursementType")
                .setValue(reimbursementType.code);

              this.employeReimbursementForm
                .get("transactionDate")
                .setValue(this.employeeReimbursementDetails.transactionDate);


              this.transactionDate =
                this.employeeReimbursementDetails.transactionDate;


              this.employeReimbursementForm
                .get("requestedDate")
                .setValue(this.employeeReimbursementDetails.requestedDate);
  

              this.requestedDate =
                this.employeeReimbursementDetails.requestedDate;

                
              this.employeReimbursementForm
                .get("additionalInformation")
                .setValue(this.employeeReimbursementDetails.additionalInfo);
              this.employeReimbursementForm
                .get("totalAmount")
                .setValue(this.employeeReimbursementDetails.totalAmount);
            }
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
