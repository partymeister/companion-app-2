import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {StorageService} from '../../services/storage.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  slideOpts = {
    initialSlide: 0,
    speed: 400
  };
  constructor(private router: Router, private storageService: StorageService) { }

  ngOnInit() {
  }

  public async setCookieAndRedirect() {
    await this.storageService.set('intro_visited', true);
    await this.router.navigate(['NewsPage'], {replaceUrl: true});
  }

}
