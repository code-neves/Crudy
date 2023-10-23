import { Injectable } from '@angular/core';
import { Customer } from '../model/Customer';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class CustomerService {


  customers: Customer[] = []

  constructor() {

    const customer:Customer = {
      id: 1,
      name: "Carlos",
      email: "carlos@gmail.com",
      dateOfBirth: new Date("1984-06-18"),
      password: "123"
    }

    this.customers.push(customer);


  }

  getList() : Customer[]{
    return this.customers;
  }

  getCustomersById(id: number): Observable<Customer[]> {
    return of(this.customers.filter((customer: Customer) => customer.id === id));
  }

  update(customer: Customer): void {
    console.log('updating user');
    
    const index = this.customers.findIndex(c => c.id === customer.id);
    if (index !== -1) {
      this.customers[index] = customer;
    }
  }

  delete(id:number){
    console.log('deleting user');
    
    this.customers = this.customers.filter(customer => customer.id !== id);
  }

  AddCustomer(customer: Customer): void {
    const index = this.customers.findIndex(c => c.id === customer.id);
    if (index === -1) {
      this.customers.push(customer);
    } else {
      this.customers[index] = customer;
    }

    console.log('creating');
    
  }
  
  // Method to generate a new unique ID by finding the maximum current ID and adding 1
  generateNewID(): Observable<number> {
    return of(this.customers).pipe(
      map((customers: Customer[]) => Math.max(...customers.map((customer: Customer) => customer.id)) + 1)
    );
  }
  

}
