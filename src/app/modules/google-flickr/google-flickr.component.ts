import { Component, OnInit, AfterViewInit } from '@angular/core';
import { GoogleFlickrService } from './google-flickr.service';
declare var google: any;

@Component({
  selector: 'app-google-flickr',
  templateUrl: './google-flickr.component.html',
  styleUrls: ['./google-flickr.component.scss']
})
export class GoogleFlickrComponent implements OnInit {

  mapOptions: any = {
    center: { lat: 30.7189, lng: 76.8103 },
    zoom: 12,
    zoomControl: true,
  };
  map: any;
  marker: any;
  latlng: any;
  publicPhotos: any = [];
  perPage: number = 5; // showing 5 photos per page
  noOfPages: any;
  selectedPage: any = 0;

  constructor(private googleFlickrService: GoogleFlickrService) { }

  ngOnInit(): void {
    this.intiGoogleMap();
  }

  /**
  * init gmap
  */
  intiGoogleMap(){
    this.map = new google.maps.Map(document.getElementById('map-container'), this.mapOptions);
    this.latlng = new google.maps.LatLng(30.7189, 76.8103);
    this.marker = new google.maps.Marker({
      position: this.latlng,
      map: this.map,
      optimized: false,
      draggable: true
    });
    this.listenMarkerDrag();
    this.getFlickrPhotos(this.latlng);
  }

  /**
  * on marker drag
  */
 listenMarkerDrag() {
    google.maps.event.addListener(this.marker, 'dragend', () => {
      this.selectedPage = 0;
      this.getFlickrPhotos(this.marker.getPosition());
    });
  }

   /**
   * get public flickr photos
   */
  getFlickrPhotos(pos){
    this.googleFlickrService.getFlickrPhotos(pos.lat(), pos.lng(), this.perPage, parseInt(this.selectedPage)+1).subscribe((response: any)=>{
      if(response && response.stat == 'ok'){
        if(response.photos && response.photos.photo && response.photos.total){
          this.publicPhotos = response.photos.photo.map(ele => ({ photo_url:  'https://live.staticflickr.com/' + ele.server + '/' + ele.id + '_' + ele.secret + '.jpg'}));
          this.noOfPages = Array(Math.floor(response.photos.total/this.perPage) + (response.photos.total%this.perPage ? 1 : 0)).fill(0);
        }
      }
    }, (error) => {
      window.alert(error ? error.error : 'Some error occured')
    });
  }

  /**
   * page no change
   */
  getPagePhotos(){
    this.getFlickrPhotos(this.marker.getPosition());
  }

}
