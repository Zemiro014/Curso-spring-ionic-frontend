import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CidadeDTO } from '../../models/cidade.dto';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cidadeService: CidadeService,
    public estadoService: EstadoService
    ) {

      this.formGroup = formBuilder.group({
        nome: ['Joaquim',[Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        email: ['joaquim@gmail.com',[Validators.required, Validators.email]],
        tipo: ['1',[Validators.required]],
        cpfOuCnpj: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
        senha: ['', [Validators.required]],
        logradouro: ['', [Validators.required]],
        numero: ['', [Validators.required]],
        complemento: ['',[]],
        bairro: ['', []],
        cep: ['', [Validators.required]],
        telefone1: ['',[Validators.required]],
        telefone2: ['', []],
        telefone3: ['', []],
        estadoId: [null , [Validators.required]],
        cidadeId: [null, [Validators.required]],

      });
  }

  ionViewDidLoad(){
    this.estadoService.findAll()
    .subscribe(response =>{
      this.estados = response;
      this.formGroup.controls.estadoId.setValue(this.estados[0].id);
      this.updateCidades();
    },
    error =>{

    });
  }

  updateCidades()
  {
    let estado_id = this.formGroup.value.estadoId;
    this.cidadeService.findAll(estado_id)
        .subscribe(response =>{
          this.cidades = response;
          this.formGroup.controls.cidadeId.setValue(null);
        },
        error =>{

        });
  }
  signupUser()
  {
    console.log("Enviou o formulário");
  }
}
