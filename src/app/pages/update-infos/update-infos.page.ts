import { Component, OnInit } from '@angular/core';
import { Platform, ToastController, LoadingController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource, ImageOptions, Photo } from '@capacitor/camera';
import { Directory, Filesystem } from '@capacitor/filesystem';

// const IMAGE_DIR = 'stored-images';

// interface LocalFile{
//   name: string;
//   Path: string;
//   data: string;
// }

@Component({
  selector: 'app-update-infos',
  templateUrl: './update-infos.page.html',
  styleUrls: ['./update-infos.page.scss'],
})
export class UpdateInfosPage implements OnInit {

  // image :string= "../../../assets/images/bran2.png";
  image;
  constructor(private toastCtrl: ToastController, private platform: Platform, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    // this.loadFiles();
    Camera.requestPermissions({permissions:['photos']})
  }

  // async loadFiles(){
  //   this.image;
  //   const loading = await this.loadingCtrl.create({
  //     message: "Chargement des données..."
  //   });
  //   await loading.present();

  //   Filesystem.readdir({
  //     directory: Directory.Data,
  //     path: IMAGE_DIR
  //   }).then(result =>{
  //     console.log('ICI : ', result)

  //   }, async err =>{
  //     await Filesystem.mkdir({
  //       directory: Directory.Data,
  //       path: IMAGE_DIR
  //     });
  //   }).then(_ =>{
  //     loading.dismiss();
  //   })
  // }

  // async loadFiledata(fileNames: string){
  //   const filePath = `${IMAGE_DIR}`;
  //   const readFile = await Filesystem.readFile({
  //     directory: Directory.Data,
  //     path: filePath
  //   });

  // }

  async modalRedirect(){
    let toast = await this.toastCtrl.create({
      message: 'Informations mises à jour !',
      duration: 3000,
      color: "light",
      position: "top",
      buttons:[
        {
          role: "cancel",
          icon: "close"
        }
      ]
    })
    toast.present()
  }

  async selectImage(){
    var options: ImageOptions={
      source: CameraSource.Photos,
      resultType: CameraResultType.DataUrl
    }
    Camera.getPhoto(options).then((result) =>{
      this.image = result.dataUrl;
    }, (err)=>{
      alert(err);
    })
    // const image = await Camera.getPhoto({
    //   quality: 90,
    //   allowEditing: false,
    //   resultType: CameraResultType.Uri,
    //   source: CameraSource.Photos
    // });
    // console.log(image);

    // if (image){
    //   this.saveImage(image)
    // }
  }

  // async saveImage(photo: Photo){
  //   const base64Data = await this.readAsBase64(photo);
  //   console.log(base64Data);
  //   const fileName = new Date().getTime() + '.jpeg';
  //   const savedFile = await Filesystem.writeFile({
  //     directory: Directory.Data,
  //     path: `${IMAGE_DIR}/${fileName}`,
  //     data: base64Data,
  //   });
  //   console.log('saved : ', savedFile);
  //   this.loadFiles();
  // }

  // async readAsBase64(photo: Photo) {
  //   if (this.platform.is('hybrid')) {
  //     const file = await Filesystem.readFile({
  //       path: photo.path
  //     });

  //     return file.data;
  //   }
  //   else {
  //     const response = await fetch(photo.webPath);
  //     const blob = await response.blob();

  //     return await this.convertBlobToBase64(blob) as string;
  //   }
  // }
  // convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) =>{
  //   const reader = new FileReader;
  //   reader.onerror= reject;
  //   reader.onload = () =>{
  //     resolve(reader.result);
  //   };
  //   reader.readAsDataURL(blob);
  // });
}
