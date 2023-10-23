import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/model/Customer';
import { CustomerService } from 'src/app/services/customer.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})

export class CustomerEditComponent implements OnInit {

  id: number = -1;
  isNewCustomer: boolean = true;
  
  
  customer: Customer = {
    id: 0,
    name: "Carlao",
    dateOfBirth: new Date("1900-01-01"),
    email: "Carlao@carlao.com",
    password: "123123"
  }
  router: any;
  constructor(private route: ActivatedRoute, private customerService: CustomerService) {
  }

  ngOnInit(): void {
    const idString = this.route.snapshot.paramMap.get('id');
    if (idString) {
      const id = parseInt(idString, 10);
      this.id = id;
      this.isNewCustomer = false; // Set isNewCustomer to false if an id parameter is present
      this.customerService.getCustomersById(id).subscribe((customers: Customer[]) => {
        this.customer = customers[0];
        console.log("Customer credentials:", this.customer);
      });
    } else {
      this.customerService.generateNewID().subscribe((id: number) => {
        this.customer.id = id; // Set the id property of the customer object with the generated id
        this.isNewCustomer = true; // Set isNewCustomer to true if no id parameter is present
      });
    }
    if (!this.customer) {
      // Use the default customer if the customer object is null
      this.customer = {
        id: 0,
        name: "",
        dateOfBirth: new Date(),
        email: "",
        password: ""
      };
    }
  }

  salvar() {
    if (this.customer.id > 0) {
      // Call the update method in CustomerService to update the existing customer
      this.customerService.update(this.customer);
      this.id = this.customer.id; // Set the id property of the CustomerEditComponent class with the id of the customer being edited
    } else  if(this.customer.name && this.customer.email && this.customer.password != ""){
      // Call the create method in CustomerService to create a new customer with a new id
      this.customerService.generateNewID().subscribe((id: number) => {
        const newCustomer: Customer = {
          id: id, // Set the id property of the new customer object with the generated id
          name: this.customer.name,
          dateOfBirth: this.customer.dateOfBirth,
          email: this.customer.email,
          password: this.customer.password
        };
        this.customerService.AddCustomer(newCustomer);
        this.id = newCustomer.id; // Set the id property of the CustomerEditComponent class with the id of the new customer
      });
    }
    console.log(this.customer);
  }


}
