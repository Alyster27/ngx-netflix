import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

const LNG_KEY = 'SELECTED_LANGUAGE';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  selected = '';

  constructor(
    private _translate: TranslateService,
    private _storage: Storage
  ) {

  }

  setInitialAppLanguage() {
    let language: any = this._translate.getBrowserLang();
    this._translate.setDefaultLang(language);

    this._storage.get(LNG_KEY).then(val => {
      if (val) {
        this.setLanguage(val);
        this.selected = val;
      }
    })
  }

  getLanguages() {
    return [
      { text: 'English', value: 'en', img: '../assets/images/britain.png' },
      { text: 'Français', value: 'fr', img: '../assets/images/france.png' },
      { text: 'Deutsch', value: 'de', img: '../assets/images/deutsch.png' },
    ]
  }

  setLanguage(language: string) {
    this._translate.use(language);
    this._storage.set(LNG_KEY, language);
    this.selected = language;
  }

}