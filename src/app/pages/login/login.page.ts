import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CountryService} from '../../services/country.service';
import {AuthenticationService} from '../../services/authentication.service';
import {AlertController, MenuController} from '@ionic/angular';
import {ContentItem} from '../../models/content_item';
import {ActivatedRoute, Router} from '@angular/router';
import {BarcodeService} from "../../services/barcode.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  registrationForm: FormGroup;

  public countries: any[] = [];
  success = false;
  private baseUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private countryService: CountryService,
    private authenticationService: AuthenticationService,
    private menuController: MenuController,
    private alertController: AlertController,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private barcodeService: BarcodeService
  ) {

    this.countries = countryService.getCountries();

    this.loginForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      group: [''],
      country_iso_3166_1: ['DE', Validators.required],
      access_key: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      password: ['', Validators.required],
      password_repeat: ['', Validators.compose([Validators.required, Validators.minLength(3)])]
    }, {validator: LoginPage.matchPasswords});

    this.registrationForm.valueChanges.subscribe(data => {
      this.registrationForm.patchValue({access_key: data.access_key.toUpperCase()}, {onlySelf: true, emitEvent: false});
    });

    activatedRoute.queryParams.subscribe(params => {
      this.baseUrl = params.dataUrl;
    });

  }

  static matchPasswords(cg: FormGroup): {[err: string]: any} {
    const pwd1 = cg.get('password');
    const pwd2 = cg.get('password_repeat');
    const rv: {[error: string]: any} = {};
    if ((pwd1.touched || pwd2.touched) && pwd1.value !== pwd2.value) {
      rv.passwordMismatch = true;
    }

    return rv;
  }

  async openCamera(event) {
    event.stopPropagation();
    const barcode = await this.barcodeService.startScan();
    this.registrationForm.patchValue({access_key: barcode.toUpperCase()}, {onlySelf: true, emitEvent: false});
    this.success = true;
    await this.barcodeService.stopScan();
    setTimeout(() => {
      this.success = false;
    }, 3000);
  }

  submitLogin() {
    this.authenticationService.loginRequest(this.baseUrl, this.loginForm.value)
      .subscribe(result => {
          this.authenticationService.doLogin(result['data']).then(res => {

            // redirect to start page
            this.router.navigate(['/NewsPage'], {replaceUrl: true}).then(() => {
              this.menuController.open();
            });
          });
        },
        err => {
          this.presentLoginAlert();
        }
      );
  }

  async presentLoginAlert() {
    const alert = await this.alertController.create({
      header: 'Login unsuccessful :(',
      message: 'There was a problem with your login credentials. Are you registered yet?',
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentRegistrationAlert() {
    const alert = await this.alertController.create({
      header: 'Registration unsuccessful :(',
      message: 'Looks like this access key or this handle was already used before',
      buttons: ['OK']
    });
    await alert.present();
  }

  submitRegistration() {
    console.log('Clicked on submit registration');
    this.authenticationService.registrationRequest(this.baseUrl, this.registrationForm.value)
      .subscribe(result => {
          this.authenticationService.doLogin(result['data']).then(res => {

            // redirect to start page
            this.router.navigate(['/NewsPage'], {replaceUrl: true}).then(() => {
              this.menuController.open();
            });
          });
        },
        err => {
          this.presentRegistrationAlert();
        }
      );
  }

  ngOnInit() {
    //this.barcodeService.prepare();
  }

}
