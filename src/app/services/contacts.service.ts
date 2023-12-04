import { Injectable, computed, inject, signal } from '@angular/core';
import { Contact } from '../models/contact.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  public dummyContacts: Contact[] = [
    {
      name: 'Vikram Kumar',
      email: 'xyz@gmail.com',
      phone: '0123456789'
    },
    {
      name: 'test 01',
      email: 'test01@gmail.com',
      phone: '0123456789'
    },
    {
      name: 'test 02',
      email: 'test02@gmail.com',
      phone: '0123456789'
    },
  ];

  public maximumContactsLimit: number = 4;

  public contacts = signal<Contact[]>([...this.dummyContacts]);
  public totalContacts = computed(() => this.contacts().length);
  public maxContactsReached = computed(() => this.totalContacts() >= this.maximumContactsLimit);

  constructor() { }

  public router = inject(Router);

  public addContact(newContact: Contact) {

    setTimeout(() => {

      // One method:
      // this.contacts.set([newContact, ...this.contacts()]);

      // Second method:
      this.contacts.update((contacts) => ([newContact, ...this.contacts()]));
      this.router.navigate(['']);
    }, 1000);
  }

  public deleteContact(contact: Contact) {

    console.log("contact", contact);
    console.log("contacts", this.contacts());

    setTimeout(() => {
      this.contacts.update((contacts) => contacts.filter(c => c.email !== contact.email));

    }, 1000);
  }
}
