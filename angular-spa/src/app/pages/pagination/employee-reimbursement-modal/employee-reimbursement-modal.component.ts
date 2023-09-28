import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { getUTCDateTime } from 'src/shared/functions/date-func';
import { EmployeeReimbursementService } from 'src/shared/services/employee-reimbursement.service';

@Component({
  selector: 'app-employee-reimbursement-modal',
  templateUrl: './employee-reimbursement-modal.component.html',
  styleUrls: ['./employee-reimbursement-modal.component.scss']
})
export class EmployeeReimbursementModalComponent implements OnInit {

  employeReimbursementForm: any;
  reimbursementTypes = [
    {
      id: 1,
      name: "Travel Expenses",
      code: "TER"
    },
    {
      id: 2,
      name: "Meal Expenses",
      code: "MER"
    },
    {
      id: 3,
      name: "Mileage",
      code: "MLR"
    },
    {
      id: 4,
      name: "Travel Expenses Reimbursement",
      code: "TER"
    },
    {
      id: 5,
      name: "Entertainment Expenses",
      code: "EER"
    },
    {
      id: 6,
      name: "Office Supplies and Equipment",
      code: "OSR"
    },
    {
      id: 7,
      name: "Professional Development and Training",
      code: "PDR"
    },
    {
      id: 8,
      name: "Medical Expenses",
      code: "MDR"
    },
    {
      id: 9,
      name: "Miscellaneous",
      code: "MR"
    },
    {
      id: 10,
      name: "Other Reimbursement",
      code: "OR"
    }
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
    }
  ];

  get reimbursementTypeFormField(){ return this.employeReimbursementForm.get('reimbursementType'); }
  get totalAmountFormField(){ return this.employeReimbursementForm.get('totalAmount'); }

  formStatus: string = "";
  employeeReimbursementStatus: string = "";
  requestedDate: any;
  transactionDate: any;
  employeeReimbursementId: any;
  
  constructor(private dialogRef: MatDialogRef<EmployeeReimbursementModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _employeeReimbursementService: EmployeeReimbursementService) { 
      this.initConstructor();
    }


    ngOnInit():void{

    }
    

  formGroupInit(){
    this.employeReimbursementForm = this.fb.group(
      {
        reimbursementType: new FormControl("", [
          Validators.required
        ]),
        transactionDate: new FormControl(getUTCDateTime()),
        requestedDate: new FormControl(getUTCDateTime()),
        additionalInformation: new FormControl("", []),
        totalAmount: new FormControl(0, [
          Validators.required
        ]),
      }
    );

  }

    initConstructor(){
      if(this.data != undefined){
        this.formStatus = this.data.formStatus;
        if(this.data.empReimbursementFromPaginatedData != undefined){
          this.employeeReimbursementStatus = this.data.empReimbursementFromPaginatedData.status ?? "N/A"
          this.employeeReimbursementId =  this.data.empReimbursementFromPaginatedData.employeeReimbursementId ?? "N/A";
        }
      }
      this.formGroupInit();
    }

    showFormStatus(formStatus: string){
      if(formStatus === "Create")
         return "New"
      if(formStatus === "Update")
         return this.employeeReimbursementStatus
      return "N/A"
    }

    onSubmit(data?:any){
      console.log(data)
      if(data != undefined){
        let employeeReimbursementPayload = this.buildEmployeeReimbursementData(data);
        if(this.formStatus === "Create")
         this.createEmployeeReimbursement(employeeReimbursementPayload)
        if(this.formStatus === "Update")
         this.updateEmployeeReimbursement(employeeReimbursementPayload)
      }
       if(this.formStatus === "Delete")
        this.deleteEmployeeReimbursement(this.employeeReimbursementId);

    }


    checkError(controlName: any, errorName: string): any {
      return this.employeReimbursementForm.controls[controlName].hasError(errorName);
    }

    close(){
      this.dialogRef.close();
    }

    transactionDateChangeHandler(date: Date) {
    const stringDate: string = `${
      date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()}`;
    this.employeReimbursementForm.get("transactionDate").setValue(stringDate);
  }

  requestedDateChangeHandler(date: Date) {
    const stringDate: string = `${
      date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()}`;
    this.employeReimbursementForm.get("requestedDate").setValue(stringDate);
  }
  
   buildEmployeeReimbursementData(formData: any){

    let reimbursementType = this.reimbursementTypes.find(x => x.code == formData.reimbursementType)
    let data = {
      "id": this.formStatus === "Create" ? 0 : this.employeeReimbursementId,
      "reimbursementTypeId": reimbursementType?.id ?? 0,
      "employeeId": 1,
      "reviewerEmployeeId": 1,
      "reimbursementStatusId": 2,
      "additionalInfo": formData.additionalInformation,
      "totalAmount": formData.totalAmount,
      "transactionDate":  new Date(formData.transactionDate),
      "approvedDate": null,
      "isActive": true,
      "requestedDate": new Date(formData.requestedDate),
      "reviewerRemarks": ""
           }
     return data;
   }

   createEmployeeReimbursement(data: any){
    this._employeeReimbursementService.createOrUpdateEmployeeReimbursement(data).subscribe(result => {
     alert("SUCCESS!")
     this.close()
    }, error => {
      console.log(error)
    })
   }
   
   updateEmployeeReimbursement(data: any){
    this._employeeReimbursementService.createOrUpdateEmployeeReimbursement(data).subscribe(result => {
      alert("SUCCESS!")
      this.close()
    }, error => {
      console.log(error)
    })
   }

   deleteEmployeeReimbursement(id: any){
    this._employeeReimbursementService.deleteEmployeeReimbursementById(id).subscribe(result => {
      alert("SUCCESS!")
      this.close()
    }, error => {
      console.log(error)
    })
   }

   getEmployeeReimbursement(id: any){
    this._employeeReimbursementService.getEmployeeReimbursementById(id).subscribe(result => {
     console.log(result)
    }, error => {
      console.log(error)
    })
}

}
