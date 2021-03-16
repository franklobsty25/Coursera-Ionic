import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.page.html',
  styleUrls: ['./reg.page.scss'],
})
export class RegPage implements OnInit {
    image: string = 'assets/images/logo.png';
    register = {};

  constructor(public modalCtrl: ModalController,
    private camera: Camera) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

    onSubmit() {
    console.log(this.register);
    this.modalCtrl.dismiss();
  }

  getPicture() {
    const options: CameraOptions = {
      quality: 100,
      targetHeight: 100,
      targetWidth: 100,
      correctOrientation: true,
      allowEdit: true,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      cameraDirection: this.camera.Direction.FRONT
    };

    this.camera.getPicture(options)
    .then((imageData) => {
      this.image = imageData;
    },
    (err) => { console.log('Error obtaining picture')});
  }

}
