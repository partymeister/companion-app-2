import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CountryService} from "../../services/country.service";
import {AuthenticationService} from "../../services/authentication.service";
import {AlertController, MenuController} from "@ionic/angular";
import {ContentItem} from "../../models/content_item";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  registrationForm: FormGroup;

  public countries: any[] = [];

  private baseUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private countryService: CountryService,
    private authenticationService: AuthenticationService,
    private menuController: MenuController,
    private alertController: AlertController,
    private activatedRoute: ActivatedRoute
  ) {

    this.countries = countryService.getCountries();

    this.loginForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.required],
      group: [''],
      country_iso_3166_1: ['', Validators.required],
      access_key: ['', Validators.required],
      password: ['', Validators.required],
      password_repeat: ['', Validators.required]
    });

    activatedRoute.queryParams.subscribe(params => {
      this.baseUrl = params.dataUrl;
    });

  }

  openCamera(event) {
    console.log("Clicked on open camera");
  }

  submitLogin() {
    this.authenticationService.loginRequest(this.baseUrl, this.loginForm.value)
      .subscribe(result => {
          this.authenticationService.doLogin(result['data']).then(res => {

            // redirect to start page
            this.menuController.open();
          });
        },
        err => {
          this.presentAlert();
        }
      );
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Login unsuccessful :(',
      message: 'There was a problem with your login credentials. Are you registered yet?',
      buttons: ['OK']
    });
    await alert.present();
  }

  submitRegistration() {
    console.log("Clicked on submit registration");
  }

  ngOnInit() {
  }

}
