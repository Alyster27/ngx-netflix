import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '../service/language.service';
import { Storage } from '@ionic/storage';
import { AlertController, PopoverController } from '@ionic/angular';
import { PopoverComponent } from '../popover/popover.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  selected = '';
  languages: any = [];

  constructor(
    private _popoverController: PopoverController,
    private readonly _router: Router,
    private _storage: Storage,
    private _translate: TranslateService,
    private _languageService: LanguageService,
    private alertController: AlertController
  ) { }

  async ngOnInit() {
    // this._languageService.setInitialAppLanguage();
    await this._storage.create();
    this.languages = this._languageService.setInitialAppLanguage();
    this.selected = this._languageService.selected;
  }

  async showAlert() {
    const alert = await this.alertController.create({
      header: this._translate.instant('ALERT.HEADER'),
      message: this._translate.instant('ALERT.MESSAGE'),
      buttons: ['OK']
    });

    await alert.present();
  }

  async openPopover(ev: any) {
    const popover = await this._popoverController.create({
      component: PopoverComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }

  backHome() {
    this._router.navigate(['./']);
  }

  select(lng: any) {
    this._languageService.getLanguages();
    this.selected = lng;
  }

}