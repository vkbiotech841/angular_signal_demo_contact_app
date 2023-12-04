import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ContactsService } from './services/contacts.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatToolbarModule, MatButtonModule, MatIconModule, RouterModule, MatSnackBarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular_signal_contact_app';

  public contactService = inject(ContactsService);
  public snackBar = inject(MatSnackBar);
  public maxContactReached = this.contactService.maxContactsReached;

  constructor() {
    effect(() => {

      if (this.maxContactReached()) {
        this.snackBar.open("You've reached your maximum Contact limit.Please remove some contact before adding a new contact!")

      }

    })

  }

  public totalContacts = this.contactService.totalContacts;

}
