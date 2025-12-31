import { JwtHelperService } from '@auth0/angular-jwt';
import { CatastrophesService } from './../../services/catastrophes.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoadingController, ToastController, ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource, ImageOptions, Photo } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { WebPlugin } from '@capacitor/core';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Catastrophes } from '../accueil/catastrophes.model';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
// Call the element loader after the platform has been bootstrapped
defineCustomElements(window);

@Component({
  selector: 'app-ajouter',
  templateUrl: './ajouter.page.html',
  styleUrls: ['./ajouter.page.scss'],
})
export class AjouterPage implements OnInit {
  inToken: any;
  username: any
  tokenPayload: any;
  expirationDate: any;
  userdatas: any;
  item: any
  @Input() catastrophe: Catastrophes;
  isEditMode = false;
  form: FormGroup

  image: any;
  getCategorie: any[] = [];
  getSousCategorie: any[] = [];
  getContinent: any[] = [];
  getPays: any[] = [];
  latitude: any;
  longitude: any;
  imageDecoded;
  nomImage;

  catastrophe$ = {
    imageUrl: '',
    nomCatastrophe: '',
    localisation: '',
    description: 'Aucune description',
    nombreMort: '',
    nombreBlesses: '',
    ville: '',
    autresVictimes: '',
    sansAbris: '',
    causeCatastrophe: '',
    dimension: '',
    categorie: '',
    souscategorie: '',
    continent: '',
    pays: '',
    lng: '',
    lat: '',
    username: '',
  }

  constructor(private loadingCtrl: LoadingController, private toastCtrl: ToastController, private router: Router, private http: HttpClient, private catastrophesService: CatastrophesService, private modalCrtl: ModalController, private jwtHelper: JwtHelperService, private domSanitizer: DomSanitizer) {

  }


  async ngOnInit() {
    console.log(this.image);

    this.initAddCatastropheForm()
    if (this.catastrophe) {
      this.isEditMode = true;
      this.setFormValues()
    }

    Geolocation.requestPermissions()
    const loading = await this.loadingCtrl.create({ spinner: 'lines', message: 'Chargement....' });
    this.getLocalStorageUserData();
    this.getPosition();
    loading.present();
    this.loadCategories();
    this.loadSousCategories();
    this.loadContinent();
    this.loadPays();
    loading.dismiss()
  }
  closeModal(data = null) {
    this.modalCrtl.dismiss(data)
  }

  setFormValues() {
    this.form.setValue({
      imageUrl: this.catastrophe.imageUrl,
      nomCatastrophe: this.catastrophe.nomCatastrophe,
      localisation: this.catastrophe.localisation,
      description: this.catastrophe.description,
      continent: this.catastrophe.continent.nom,
      pays: this.catastrophe.pays.nom,
      ville: this.catastrophe.ville,
      dimension: this.catastrophe.dimension,
      causeCatastrophe: this.catastrophe.causeCatastrophe,
      longitude: this.catastrophe.longitude,
      latitude: this.catastrophe.latitude,
      categorie: this.catastrophe.categorie.nom,
      souscategorie: this.catastrophe.souscategorie.nom,
      nombreMort: this.catastrophe.nombreMort,
      nombreBlesses: this.catastrophe.nombreBlesses,
      sansAbris: this.catastrophe.sansAbris,
      autresVictimes: this.catastrophe.autresVictimes,
      username: this.catastrophe.username,
    });
    this.form.updateValueAndValidity();
  }

  initAddCatastropheForm() {
    this.form = new FormGroup({
      imageUrl: new FormControl(this.image, [Validators.required]),
      nomCatastrophe: new FormControl(null, [Validators.required]),
      localisation: new FormControl(null, [Validators.required]),
      description: new FormControl("Aucune description"),
      continent: new FormControl(null, [Validators.required]),
      pays: new FormControl(null, [Validators.required]),
      ville: new FormControl(null, [Validators.required]),
      dimension: new FormControl(null, [Validators.required]),
      causeCatastrophe: new FormControl(null, [Validators.required]),
      longitude: new FormControl(this.longitude),
      latitude: new FormControl(this.latitude),
      categorie: new FormControl(null, [Validators.required]),
      souscategorie: new FormControl(null, [Validators.required]),
      nombreMort: new FormControl(null, [Validators.required]),
      nombreBlesses: new FormControl(null, [Validators.required]),
      sansAbris: new FormControl(null, [Validators.required]),
      autresVictimes: new FormControl(null, [Validators.required]),
      username: new FormControl(this.username),
    })
  }

  async getPosition() {
    const position = await Geolocation.getCurrentPosition();
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
    this.catastrophe$.lat = this.latitude
    this.catastrophe$.lng = this.longitude
  }

  loadCategories() {
    const AP_URL = `${environment.API_URL}categories/`
    this.http.get(AP_URL).subscribe((data: any) => {
      this.getCategorie = data
    })
  }

  loadSousCategories() {
    const AP_URL = `${environment.API_URL}souscategories/`
    this.http.get(AP_URL).subscribe((data: any) => {
      this.getSousCategorie = data
    })
  }

  loadContinent() {
    const AP_URL = `${environment.API_URL}continents/`
    this.http.get(AP_URL).subscribe((data: any) => {
      this.getContinent = data
    })
  }

  loadPays() {
    const AP_URL = `${environment.API_URL}pays/`
    this.http.get(AP_URL).subscribe((data: any) => {
      this.getPays = data
    })
  }


  async selectImage() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl
    });
    if (image.dataUrl) {
      this.image = image.dataUrl;
      // this.catastrophe$.imageUrl = this.image
      this.catastrophe$.imageUrl = this.image
      // this.imageDecoded = this.image.split(",")[1]

      const body = {
        "generated_at": new Date().toISOString(),
        "png": this.imageDecoded
      };
      // fetch(`http://127.0.0.1:8000/api/Catastrophes`,{
      //   method: "post",
      //   body: JSON.stringify(body),
      //   headers: {
      //     "Content-type": "multipart/form-data"
      //   }
      // });
      this.imageDecoded = JSON.stringify(body)
    }
    // var options: ImageOptions = {
    //   source: CameraSource.Photos,
    //   resultType: CameraResultType.DataUrl
    // }
    // Camera.getPhoto(options).then((result) => {
    //   this.image = result.dataUrl;
    //   this.catastrophe$.imageUrl = this.image;
    // }, (err) => {
    //   alert(err);
    // })
  }

  toFormData(object: any): FormData {
    const formdata = new FormData();
    // console.log(object.etat);
    for (const prop in object) {
      // skip loop if the property is from prototype
      if (!object.hasOwnProperty(prop)) { continue; }
      formdata.append(prop, object[prop]);

    }
    return formdata;
  }
  changer(event: any){
    this.image = event.target.files[0].name
  }


  async creerCatastrophe() {
    if (this.isEditMode) {
      console.log('Mode édition - Catastrophe:', this.catastrophe);
    }

    const loading = await this.loadingCtrl.create({
      spinner: 'lines', message: 'Enregistrement ....', mode: 'ios',
      translucent: true
    });
    loading.present();

    let data = this.form.value;
    data.continent = 'api/continents/' + data.continent
    data.pays = 'api/pays/' + data.pays
    data.categorie = 'api/categories/' + data.categorie
    data.souscategorie = 'api/souscategories/' + data.souscategorie
    data.latitude = JSON.stringify(this.latitude)
    data.longitude = JSON.stringify(this.longitude)
    // data.username = this.username
    // data.imageUrl = this.imageDecoded
    // data.imageFile = this.image

    let response: Observable<Catastrophes>;
    if (this.isEditMode) {
      response = this.catastrophesService.updateCatastrophes(this.catastrophe.id, data);
      const toast = await this.toastCtrl.create({
        message: "Catastrophe Mise à jour",
        duration: 2000,
        color: 'light',
        position: 'top',
        buttons: [{
          role: "cancel",
          icon: 'close',

        }]
      })
      toast.present()
    } else {
      response = this.catastrophesService.addCatastrophes(data);
    }

    response.pipe(
      take(1)
    ).subscribe(async catastrophe => {
      this.form.reset();
      this.router.navigate(['home']);
      const toast = await this.toastCtrl.create({
        message: "Catastrophe signalée",
        duration: 2000,
        color: 'light',
        position: 'top',
        buttons: [{
          role: "cancel",
          icon: 'close',

        }]
      })
      toast.present()
      loading.dismiss()

      if (this.isEditMode) {
        this.closeModal(catastrophe)
      }

      this.toastCtrl.create({
        message: "Catastrophe signalée...",
        position: 'top',
        duration: 2000,
        color: "light",
        buttons: [
          {
            role: "cancel",
            icon: "close"
          }
        ]
      })
    })
  }

  GetTokenDecoded() {
    console.log(this.jwtHelper.decodeToken(this.inToken))
    this.tokenPayload = JSON.stringify(this.jwtHelper.decodeToken(this.inToken));
  }
  getTokenExpirationDate() {
    this.expirationDate = this.jwtHelper.getTokenExpirationDate(this.inToken);
  }

  getLocalStorageUserData() {
    this.item = localStorage.getItem('currentUser');
    if (this.item != null) {
      this.userdatas = JSON.parse(this.item);
    }
    this.inToken = this.userdatas.token
    this.tokenPayload = JSON.stringify(this.jwtHelper.decodeToken(this.inToken));
    this.username = JSON.parse(this.tokenPayload);
    this.username = this.username.username;
    console.log(this.username);
  }

}
