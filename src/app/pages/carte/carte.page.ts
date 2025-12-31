import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ModalController, LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { environment } from 'src/environments/environment';
import { antPath } from 'leaflet-ant-path'
  ;

@Component({
  selector: 'app-carte',
  templateUrl: './carte.page.html',
  styleUrls: ['./carte.page.scss'],
})
export class CartePage implements OnInit {
  map: L.Map;
  posts: any[] = [];

  constructor(private modalCtrl: ModalController, private loadingCtrl: LoadingController, private http: HttpClient, private router: Router) { }

  async ngOnInit() {
    const loading = await this.loadingCtrl.create({
      spinner: 'lines',
      message: 'Chargement...', mode: 'ios',
      translucent: true
    });
    loading.present();
    loading.dismiss()
  }
  closeModal() {
    this.modalCtrl.dismiss();
  }

  ionViewDidEnter() {
    const API_URI = `${environment.API_URL}catastrophes/`
    this.http.get(API_URI).subscribe((data: any) => {
      this.posts = data;
      // console.log(this.posts)

      this.map = L.map('mapId').setView([4.0379124, 9.7096331], 2);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      }).addTo(this.map);
      for (const marker of this.posts) {
        L.marker([marker.latitude, marker.longitude]).addTo(this.map)
          .bindPopup(`<b>${marker.nomCatastrophe} </b> <br>${marker.ville}<br> ${marker.createdAt}`, {
            closeButton: true
          })
          L.circle([marker.latitude, marker.longitude], {
            color: 'red',
            radius: marker.dimension,
            fillcolor: 'red',
            opacity: .5
          }).addTo(this.map)
          .openPopup();
        // console.log(marker.latitude + ',' + marker.longitude);
        antPath([[marker.latitude, marker.longitude]],
          { color: '#FF0000', weight: 5, opacity: 0.6 })
          .addTo(this.map);
      }
      L.control.locate({
        setView: true,
        drawCircle: true,
        markerClass: L.circleMarker
      }).addTo(this.map);

    });

  }

}
