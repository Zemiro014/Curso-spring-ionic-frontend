import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CINFIG } from '../../config/api.config';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { StorageService } from '../../services/storage.service';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente: ClienteDTO;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public storage: StorageService,
              public clienteService: ClienteService) {
  }

  ionViewDidLoad() { // É um evento que será ativo quando essa página for carregada
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email)
    {
      this.clienteService.findByEmail(localUser.email)
          .subscribe(response => {
            this.cliente = response;
            // Buscar imagem no buchet S3
            this.getImageIfExist()
          },
          error => {
            if(error.status == 403)
            {
              this.navCtrl.setRoot('HomePage');
            }
          });
    }
    else
    {
      this.navCtrl.setRoot('HomePage');
    }
  }

  getImageIfExist()
  {
    this.clienteService.getImageFromBucket(this.cliente.id)
        .subscribe(response => {
          this.cliente.imageUrl = `${API_CINFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`;          
        },
        error =>{})
  }

}
