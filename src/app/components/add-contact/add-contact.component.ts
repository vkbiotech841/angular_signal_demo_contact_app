import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ContactsService } from '../../services/contacts.service';

@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterModule, FormsModule],
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.scss'
})
export class AddContactComponent {

  public name: string = '';
  public email: string = '';
  public phone: string = '';
  public skypeId: string = '';

  public contactsService = inject(ContactsService);

  public save(): void {
    const payload = {
      name: this.name,
      email: this.email,
      phone: this.phone,
      skypeId: this.skypeId
    };

    this.contactsService.addContact(payload);
  }

}
