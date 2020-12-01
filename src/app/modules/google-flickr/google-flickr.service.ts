import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GoogleFlickrService {

  constructor(private http: HttpClient) { }

  /**
   * flicker api
   */
  getFlickrPhotos(lat, lng, per_page, page_no) {
    const flickrApiUrl = 'http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=YOUR_API_KEY_HERE&user_id=YOUR_USER_ID_HERE&format=json&jsoncallback=JSONP_CALLBACK&accuracy=11&has_geo=1&per_page=' + per_page + '&page=' + page_no + '&lat=' + lat + '&lon=' + lng;
    return this.http.jsonp(flickrApiUrl, 'JSONP_CALLBACK');
  }

}
