import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormCheckerService {

  constructor() { }

  CheckEmail(event) {
    console.log('HELLO SERVICE');
    // const email_message = document.getElementById("email_message");
    // var email = (document.getElementById("newEmail") as HTMLInputElement).value; 

    // if (/^[a-z0-9\_\.\-]{2,20}\@[a-z0-9\_\-]{2,20}\.[a-z]{2,9}$/.test(email)) {
    //   email_message.innerHTML = "✓ Valid email format";
    //   email_message.style.color = "green";
    // } else {
    //   email_message.innerHTML = "✗ Wrong email format";
    //   email_message.style.color = "red";
    // }
  }
}
