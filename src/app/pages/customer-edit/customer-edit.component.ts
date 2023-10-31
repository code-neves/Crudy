import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Customer } from 'src/app/model/Customer';
import { CustomerService } from '../../services/customer.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {

  id: number = -1
  customerForm: FormGroup

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
    private toastr: ToastrService
  ) {
    this.customerForm = new FormGroup({
      name: new FormControl("", [Validators.required, Validators.minLength(3)]),
      dateOfBirth: new FormControl("", [Validators.required, this.dateValidator()]),
      email: new FormControl("", [Validators.required, Validators.email])
    })
  }

  ngOnInit() {
    const getId = this.route.snapshot.paramMap.get('id');

    if (getId) {
      this.id = parseInt(getId);
      const currentCustomer = this.customerService.getById(this.id);

      this.customerForm = new FormGroup({
        name: new FormControl(currentCustomer?.name, [Validators.required, Validators.minLength(3)]),
        dateOfBirth: new FormControl(currentCustomer?.dateOfBirth, [Validators.required, this.dateValidator()]),
        email: new FormControl(currentCustomer?.email, [Validators.required, Validators.email])
      })
    }
  }

  goToCustomerList() {
    this.router.navigate(['customer-list'])
  }

  onSubmit(customer: Customer) {
    if (this.id === -1){

      this.customerService.create(customer)
      console.log('creating customer', customer);
      this.createToast();
    } else {
      customer.id = this.id;
      this.customerService.update(customer)
      console.log('updating customer', customer);
      this.updateToast();
    }
    this.router.navigate(['customer-list'])
  }

  createToast() {
    this.toastr.success('The customer has been created successfully!');
  }
  updateToast() {
    this.toastr.success('The customer was updated.');
  }

  dateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const today = new Date().getTime();
      const valueAsDate = new Date(control.value);

      if(!(control && control.value)) {
        return null;
      }

      if (isNaN(valueAsDate.getTime()) || valueAsDate.getTime() > today) {
        return { 'invalidDate': true };
      }
      return null;
    }
  }
}