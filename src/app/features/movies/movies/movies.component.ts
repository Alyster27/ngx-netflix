import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { IonContent, IonToolbar, ModalController } from '@ionic/angular';
import { ModalComponent } from '../modal/modal.component';
import { MoviesService } from '../services/movies.service';
import { TrailerService } from '../services/trailer.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit, AfterViewInit {

  public trendings!: any[];
  public highlight!: any;
  public discovers!: any[];
  public genres!:{result: any[], name: string}[];
  @ViewChild(IonContent, { static: false }) content!: IonContent;
  @ViewChild(IonToolbar, { read: ElementRef }) toolbar!: ElementRef<IonToolbar>;

  constructor(
    private readonly _api: MoviesService,
    private readonly _trailer: TrailerService,
    private readonly _renderer: Renderer2,
    private readonly _modalCtrl: ModalController
  ) { }

  async ngOnInit() {
    this.trendings = await this._api.load('trending');
    this.highlight = this.trendings.shift();

    this.discovers = await this._api.load('discover');
    this.genres = await this._api.getGenres();
  }

  ngAfterViewInit() {
    if (this.content === undefined) return;
    // enable scroll
    this.content.scrollEvents = true;
  }

  listenScroll($event: any){
    const { detail: { currentY } } = $event;
    if (!currentY) return;
    const alfaY = currentY > 95 ? 1 : currentY / 100;
    // apply background color and class toggle logic
    this._renderer.setStyle(
      this.toolbar?.nativeElement,
      'background-color',
      'rgba(0, 0, 0, ' + alfaY + ')'
    )
  }

  async displayDetails(item: any) {
    // find trailer id
    const trailerId = await this._trailer.findId(item.title);
    // open modal
    const ionModal = await this._modalCtrl.create({
      component: ModalComponent,
      componentProps: {
        selected: { ...item, trailerId }
      },
      cssClass: ['preview-modal'],
    });
    await ionModal.present();
  }
}
