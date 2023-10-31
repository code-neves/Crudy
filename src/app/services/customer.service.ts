import { Injectable } from '@angular/core';
import { Customer } from '../model/Customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  customers: Customer[] = []

  constructor() {
  }

  getList(): Customer[] {
    return this.customers;
  }

  getById(id:number){
   return this.customers.find(customer => customer.id === id)
  }

  update(customer: Customer) {
    console.log('updating customer', customer);
    
    let searchCustomer = this.getById(customer.id);

    if (searchCustomer){
      searchCustomer.name = customer.name;
      searchCustomer.dateOfBirth = customer.dateOfBirth;
      searchCustomer.email = customer.email;
    }
  
  }

  delete(id: number) {
    this.customers = this.customers.filter(customer => customer.id !== id);
  }

  create(customer:Customer){
    const maxId:number = this.getMaxId();
    maxId ? customer.id = maxId + 1 : customer.id = 1
    this.customers.push(customer)
  }

  getMaxId():number{
    return this.customers.reduce((maxId, customer) => {
      return customer.id > maxId ? customer.id : maxId;
    }, 0);
  }
}