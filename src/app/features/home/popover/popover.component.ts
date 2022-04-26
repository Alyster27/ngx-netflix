import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { LanguageService } from '../service/language.service';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent implements OnInit {
  languages: any = [];
  selected = '';

  constructor(
    private _languageService: LanguageService,
    private _popoverController: PopoverController
  ) { }

  ngOnInit() {
    this.languages = this._languageService.getLanguages();
    this.selected = this._languageService.selected;
  }

  select(lng: any) {
    this._languageService.setLanguage(lng);
    this._popoverController.dismiss();
  }

}
