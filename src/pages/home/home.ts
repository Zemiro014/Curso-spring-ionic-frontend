import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds : CredenciaisDTO = 
  {
    email:"",
    senha:""
  }

  constructor(
    public navCtrl: NavController,
    public menu:MenuController,
    public auth: AuthService) {

  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
    }
    
  ionViewDidLeave() {
    this.menu.swipeEnable(true);
    }

    ionViewDidEnter() // Ação (Evento) que gerencia o cíclo de vida: Enquanto o token estiver em ativo, não será preciso fazer login no sistema. A menos que sejá feito o Logout antes.
    {
      this.auth.refreshToken()
      .subscribe(Response => {
        this.auth.successfulLogin(Response.headers.get('Authorization'));
        this.navCtrl.setRoot('CategoriasPage');
      },
      error => {});  
    }

  login(){
    this.auth.authentication(this.creds)
    .subscribe(Response => {
      this.auth.successfulLogin(Response.headers.get('Authorization'));
      this.navCtrl.setRoot('CategoriasPage');
    },
    error => {});  
  }

  signup()
  {
    this.navCtrl.push('SignupPage');
  }
}
