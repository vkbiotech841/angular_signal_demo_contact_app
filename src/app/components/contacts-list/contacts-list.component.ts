import { CommonModule } from '@angular/common';
import { Component, Signal, inject, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { ContactsService } from '../../services/contacts.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Contact } from '../../models/contact.model';

import { Observable } from 'rxjs';
import { collectionData } from '@angular/fire/firestore';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-contacts-list',
  standalone: true,
  imports: [CommonModule, MatListModule, MatButtonModule, MatIconModule],
  templateUrl: './contacts-list.component.html',
  styleUrl: './contacts-list.component.scss'
})
export class ContactsListComponent {
  public contactSService = inject(ContactsService);
  public contacts: Contact[] = []

  public contacts$: Observable<any[]>;
  public contactsSignal: Signal<any[] | undefined>;

  constructor() {
    this.getStudentsList();
  }

  public deleteContact(contact: Contact): void {
    this.contactSService.deleteContact(contact);
  }

  public getStudentsList() {

    this.contactSService.getStudentsList().subscribe(
      {
        next: (result) => {
          this.contacts = result;
          console.log("getStudentsList", result);
        },
        error: () => { },
        complete: () => { }
      }

    );
    this.contacts$ = this.contactSService.getStudentsList();
    this.contactsSignal = toSignal(this.contacts$, { initialValue: [] });
  }



}
