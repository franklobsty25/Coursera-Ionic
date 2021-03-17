import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  public contact: string;

  constructor(private activatedRoute: ActivatedRoute,
    private emailComposer: EmailComposer,
    private callNumber: CallNumber) { }

  ngOnInit() {
    this.contact = this.activatedRoute.snapshot.paramMap.get('id');
  }

  sendEmail() {
    let email = {
      to: 'confusion@food.net',
      subject: '[Confusion] Query',
      body: 'Dear Sir/Madam:',
      isHtml: true
    };
    
    this.emailComposer.open(email);

  }

  callConFusion() {
    this.callNumber.callNumber('85287654321', true).then((res) => {
      console.log('Launched dialer!', res)
    })
    .catch((err) => console.log('Error Launching dialer', err));
  }

}
