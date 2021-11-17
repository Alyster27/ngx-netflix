import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesComponent } from './movies/movies.component'
import { MoviesRoutingModule } from './movies-routing.module';
import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http'
import { MoviesService } from './services/movies.service';
import { ModalComponent } from './modal/modal.component';
import { TrailerService } from './services/trailer.service';
import { YouTubePlayerModule } from '@angular/youtube-player';


@NgModule({
  declarations: [
    MoviesComponent,
    ModalComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    HttpClientModule,
    MoviesRoutingModule,
    YouTubePlayerModule
  ],
  providers: [
    MoviesService,
    TrailerService
  ]
})
export class MoviesModule { }
