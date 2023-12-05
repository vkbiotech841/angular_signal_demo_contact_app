import { Injectable, computed, inject, signal } from '@angular/core';
import { Contact } from '../models/contact.model';
import { Router } from '@angular/router';
import { Firestore, collectionData, collection, CollectionReference, DocumentReference, addDoc, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private firestore: Firestore = inject(Firestore);
  public router = inject(Router);


  public contacts = signal<Contact[]>([]);
  public totalContacts = computed(() => this.contacts().length);
  public maxContactsReached = computed(() => this.totalContacts() >= this.maximumContactsLimit);

  public maximumContactsLimit: number = 4;

  constructor() { }



  public addContact(newContact: Contact): Observable<any> {
    const collectionInstance: CollectionReference = collection(this.firestore, 'students');
    return from(addDoc(collectionInstance, newContact));
  }

  public getStudentsList(): Observable<any> {
    const collectionInstance: CollectionReference = collection(this.firestore, 'students');
    return collectionData(collectionInstance, { idField: 'id' });
  }

  public updateContact(id: string, updateData: any): Observable<any> {
    const docInstance: DocumentReference = doc(this.firestore, 'students', id);
    return from(updateDoc(docInstance, updateData));
  }

  public deleteContactCrud(id: string): Observable<any> {
    const docInstance: DocumentReference = doc(this.firestore, 'students', id);
    return from(deleteDoc(docInstance));
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

  // public deleteContact(contact: Contact) {

  //   console.log("contact", contact);
  //   console.log("contacts", this.contacts());

  //   setTimeout(() => {
  //     this.contacts.update((contacts) => contacts.filter(c => c.email !== contact.email));
  //   }, 1000);
  // }
}
