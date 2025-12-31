import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manuel',
  templateUrl: './manuel.page.html',
  styleUrls: ['./manuel.page.scss'],
})
export class ManuelPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  closeModal(){
    this.modalCtrl.dismiss()
  }

}
