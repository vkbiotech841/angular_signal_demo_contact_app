import { Injectable, computed, inject, signal } from '@angular/core';
import { Contact } from '../models/contact.model';
import { Router } from '@angular/router';
import { Firestore, collectionData, collection, CollectionReference, DocumentReference, addDoc, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private firestore: Firestore = inject(Firestore);

  public dummyContacts: Contact[] = [
    // {
    //   name: 'Vikram Kumar',
    //   email: 'xyz@gmail.com',
    //   phone: '0123456789',
    //   skypeId: ''
    // },
    // {
    //   name: 'test 01',
    //   email: 'test01@gmail.com',
    //   phone: '0123456789',
    //   skypeId: ''
    // },
    // {
    //   name: 'test 02',
    //   email: 'test02@gmail.com',
    //   phone: '0123456789',
    //   skypeId: ''
    // },
  ];

  public maximumContactsLimit: number = 4;

  public contacts = signal<Contact[]>([...this.dummyContacts]);
  public totalContacts = computed(() => this.contacts().length);
  public maxContactsReached = computed(() => this.totalContacts() >= this.maximumContactsLimit);

  constructor() { }

  public router = inject(Router);

  public addContact(newContact: Contact) {

    if (!newContact) return;

    const collectionInstance: CollectionReference = collection(this.firestore, 'students');

    addDoc(collectionInstance, newContact)
      .then((documentReference: DocumentReference) => {
        this.contacts.update((contacts) => ([newContact, ...this.contacts()]));
        this.router.navigate(['']);
        console.log("success");
      })
      .catch((error) => {
        console.log("error", error);
      })
  }

  public getStudentsList(): Observable<any> {
    const collectionInstance: CollectionReference = collection(this.firestore, 'students');
    return collectionData(collectionInstance, { idField: 'id' });
  }

  public updateContact(id: string) {
    const docInstance: DocumentReference = doc(this.firestore, 'students', id);

    const updateData = {
      name: 'updatedData'
    };

    updateDoc(docInstance, updateData)
      .then(() => {
        console.log("success");
      }).catch((error) => {
        console.log("error", error);
      })

  }

  public deleteContactCrud(id: string) {
    const docInstance: DocumentReference = doc(this.firestore, 'students', id);
    deleteDoc(docInstance)
      .then(() => {
        console.log("document deleted")
      })
      .catch((error) => {
        console.log("error", error);
      }
      )

  }







  // public addContact(newContact: Contact) {

  //   setTimeout(() => {

  //     // One method:
  //     // this.contacts.set([newContact, ...this.contacts()]);

  //     // Second method:
  //     this.contacts.update((contacts) => ([newContact, ...this.contacts()]));
  //     this.router.navigate(['']);
  //   }, 1000);
  // }

  public deleteContact(contact: Contact) {

    console.log("contact", contact);
    console.log("contacts", this.contacts());

    setTimeout(() => {
      this.contacts.update((contacts) => contacts.filter(c => c.email !== contact.email));

    }, 1000);
  }
}
