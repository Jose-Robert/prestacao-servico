import { Injectable } from '@angular/core';

import { isNullOrUndefined } from 'util';

/**
 * @see angular2-if-media-query-directive <https://gist.github.com/davidmarquis/80e6d1ada3a024022f985a587b587825>
 */
@Injectable()
export class MediaQueryService {

  private mediaQueryList: MediaQueryList;

  setMediaQuery(newMediaQuery: string) {
    this.mediaQueryList = window.matchMedia(newMediaQuery);
  }

  get matches(): boolean {
    if (isNullOrUndefined(this.mediaQueryList)) {
      return;
    }

    return this.mediaQueryList.matches;
  }
}
