import { HttpClient } from '@angular/common/http';
import { Socket } from 'ngx-socket-io';
import { CookieService } from 'ngx-cookie-service';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()

export class WebSocketService extends Socket {

  @Output() outEven: EventEmitter<any> = new EventEmitter();

  meeting:  any;
  constructor(private http: HttpClient,
              private socket: Socket,
              private cookieService: CookieService) {
    
    super({
      url: environment.URL_SOCKET,
      options: {
        query: {
          payload: cookieService.get('user')
        }
        }
      
    });
    this.ioSocket.on('message', res => this.outEven.emit(res));
  }

  emitEvent = (event = 'default', payload = {}) => {
    this.ioSocket.emit('default', {
        cookiePayload:this.cookieService.get('user'),
        event,
        payload
    });
  }

}
