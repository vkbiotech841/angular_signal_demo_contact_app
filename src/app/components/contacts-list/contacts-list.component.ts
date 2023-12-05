import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, Signal, inject, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { ContactsService } from '../../services/contacts.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Contact } from '../../models/contact.model';

import { BehaviorSubject, Observable, ObservableInput, Subject, takeUntil } from 'rxjs';
import { collectionData } from '@angular/fire/firestore';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-contacts-list',
  standalone: true,
  imports: [CommonModule, MatListModule, MatButtonModule, MatIconModule],
  templateUrl: './contacts-list.component.html',
  styleUrl: './contacts-list.component.scss'
})
export class ContactsListComponent implements OnInit, OnDestroy {
  public contactsService = inject(ContactsService);

  public contacts: Contact[] = []
  public contacts$ = new BehaviorSubject<Contact[]>([]);
  public contactsSignal: Signal<any[] | undefined>;

  public unsubscriber$ = new Subject();

  constructor() {

  }

  ngOnInit(): void {
    this.getStudentsList();
  }

  public getStudentsList() {

    this.contactsService.getStudentsList()
      .pipe(takeUntil(this.unsubscriber$))
      .subscribe(
        {
          next: (result) => {
            this.contacts = result;
            this.contacts$.next(result);
            this.contactsService.contacts.update((contacts) => ([...this.contacts]));
            console.log("getStudentsList", result);
          },
          error: () => { },
          complete: () => { }
        }

      );
  }

  public deleteContact(id: any): void {
    this.contactsService.deleteContactCrud(id)
      .pipe(takeUntil(this.unsubscriber$))
      .subscribe({
        next: (result) => {
          console.log("Deleted");
        },
        error: (error) => { },
        complete: () => { }
      })
  }

  ngOnDestroy(): void {
    this.unsubscriber$.next(null);
    this.unsubscriber$.complete();
  }



}
