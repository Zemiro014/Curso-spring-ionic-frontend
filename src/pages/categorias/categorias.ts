import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CINFIG } from '../../config/api.config';
import { CategoriaDTO } from '../../models/categoria.dto';
import { CategoriaService } from '../../services/domain/categoria.service';

/**
 * Generated class for the CategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  bucketUrl: string = API_CINFIG.bucketBaseUrl; // Recebe a URL base para acessar imagens no meu S3 da 

  items: CategoriaDTO[]; // A variável que irá guardar a minha lista do tipo "CategoriaDTO"
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public categoriaService: CategoriaService) {
  }

  // Quando a página for carregado o codigo dentro do "ionViewDidLoad()" será executado
  ionViewDidLoad() {
    this.categoriaService.findAll()
        .subscribe(response =>{
            this.items = response;
    },
    error => { });

  }
}
