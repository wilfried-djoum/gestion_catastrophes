import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.page.html',
  styleUrls: ['./statistiques.page.scss'],
})
export class StatistiquesPage implements OnInit {
  @ViewChild('canvas', { static: false }) public canvas: ElementRef;
  @ViewChild('canvasBar', { static: false }) public canvasBar: ElementRef;
  @ViewChild('canvasLines', { static: false }) public canvasLines: ElementRef;
  chart: any;
  // legendeCatastrophe: any;
  // nbreMort: any = []
  // nomCatastrophe: any = [];
  postsCatastrophe: any[] = [];
  take_catastrophe: string[] = [];
  take_morts: any[] = [];
  take_blesses: any[] = [];
  take_villes: any[] = [];
  // color: string[] = [, ,  '#ecc19c', '#322514', '#b81558', '#ff6840', '#0d1137', '#1e847f', '#7a2048', , ]
  color: string[] = ['#077b8ade', '#000000de', '#374b17de', '#320d3ede', '#C0C0C0de', '#6a1ec0de', '#c01eb3de', '#1e51c0de', '#0000FFde', '#5c3c92de', '#d9138ade', '#FFFF00de', '#00FFFFde', '#7fffd4de', '#FF00FFde', '#201e20de', '#82c01ede'];
  // colorH: string[] = [, , , '', , '']


  constructor(private loadingCtrl: LoadingController, private http: HttpClient) { }

  async ngOnInit() {
    const loading = await this.loadingCtrl.create({
      spinner: 'lines', message: 'Chargement....', mode: 'ios',
      translucent: true
    });
    loading.present();
    // this.chartMethod();

    this.loadCatastrophes()
    // this.loadUser()
    loading.dismiss()
  }


  loadCatastrophes() {
    const API_URI = `${environment.API_URL}catastrophes/`
    this.http.get(API_URI).subscribe((data: any) => {
      this.postsCatastrophe = data;
      this.take_catastrophe = data.map((data: any) => data.nomCatastrophe)
      this.take_morts = data.map((data: any) => data.nombreMort)
      this.take_blesses = data.map((data: any) => data.nombreBlesses)
      this.take_villes = data.map((data: any) => data.ville)

      console.log(this.take_catastrophe);
      console.log(this.take_morts);
      console.log(this.take_blesses);
      console.log(this.take_villes);

      console.log(this.postsCatastrophe)

      //graphe des morts
      this.chart = new Chart(this.canvas.nativeElement, {
        type: 'pie',
        data: {
          labels: this.take_catastrophe,
          datasets: [
            {
              label: 'Blessés',
              // stack: 'Base',
              backgroundColor: this.color,
              // borderAlign: 'inner',
              // borderJoinStyle: 'bevel',
              // borderWidth: 2,
              data: this.take_blesses
            },
          ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            },
          },
        }
      })

      this.chart = new Chart(this.canvasBar.nativeElement, {
        type: 'doughnut',
        data: {
          // labels: [2017, 2018, 2019, 2020, 2021, 2022],
          labels: this.take_catastrophe,
          datasets: [
            {
              // barPercentage: 0.5,
              // barThickness: 'flex',
              label: 'Morts',
              // stack: 'Base',
              backgroundColor: this.color,
              // borderSkipped: 'middle',
              data: this.take_morts
              // data: [10, 20, 30, 32, 40, 10]
            },
          ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            },
          },
        }
      })

      this.chart = new Chart(this.canvasLines.nativeElement, {
        type: 'bar',
        data: {
          labels: this.take_villes,
          datasets: [
            {
              // barPercentage: 0.5,
              // barThickness: 'flex',
              label: 'Morts',
              stack: 'Base',
              backgroundColor: this.color,
              // borderSkipped: 'middle',
              data: this.take_morts
              // data: [10, 20, 30, 32, 40, 10]
            },
          ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            },
          },
        }
      })
    });
  }


  chartMethod() {

  }
  downloadBlesses() {
    const imageLink = document.createElement('a');
    console.log(imageLink);
    const canvas = this.canvas.nativeElement;
    imageLink.download = 'Statistiques_des_blessés.jpg'
    imageLink.href = canvas.toDataURL('image/jpg', 1);
    // window.open(imageLink)
    // document.write('<img src="'+imageLink+'">')
    // console.log(imageLink.href );
    imageLink.click();

  }

  downloadMorts() {
    const imageLink = document.createElement('a');
    console.log(imageLink);
    const canvas = this.canvasBar.nativeElement;
    imageLink.download = 'Statistiques_des_morts.jpg'
    imageLink.href = canvas.toDataURL('image/jpg', 1);
    // window.open(imageLink)
    // document.write('<img src="'+imageLink+'">')
    // console.log(imageLink.href );
    imageLink.click();

  }
  downloadVilles() {
    const imageLink = document.createElement('a');
    console.log(imageLink);
    const canvas = this.canvasLines.nativeElement;
    imageLink.download = 'Statistiques_des_morts_par_ville.jpg'
    imageLink.href = canvas.toDataURL('image/jpg', 1);
    // window.open(imageLink)
    // document.write('<img src="'+imageLink+'">')
    // console.log(imageLink.href );
    imageLink.click();

  }

}
