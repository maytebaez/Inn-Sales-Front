import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { WebSocketService } from './web-socket.service';

// const URL = environment.URL;
// const socket = io(`${URL}`, {
//   path: "/connections/"
// });

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  messages=[];
  meeting:  any;
  show_message:any;
  input_message:any;

  constructor(private http: HttpClient,
              protected webSocketService: WebSocketService,
              private cookieService: CookieService) {

      webSocketService.outEven.subscribe(res => {
      this.messages.push(res.msg)
    })
    
  }

  ngOnInit() {
    try{
      this.show_message = JSON.parse(this.cookieService.get('user'));
    }catch(e){
      this.show_message = null
    }
 
  }

  sendData = (event) =>{
    this.webSocketService.emitEvent(event,
      {
        message: this.input_message
      })
      this.input_message = null;
   }


  uploadFile(file: any, idMeeting: string){

    console.log(idMeeting);

    const formData: FormData = new FormData();
    formData.append('archivos', file);

    // this.webSocketService.emitEvent("audio-processing", () => {
    //   console.log("Conectado"); // true
    // });   

    this.sendData;

    return new Promise(resolve=>{
      this.http.post(`${URL}/uploads/audio/${idMeeting}`, formData).subscribe(resp =>{
        if(resp['ok']){
          resolve(true);
            
        }else{
          resolve(false);
        }
      });
    });  
  }

  returnMeeting(){
    return this.meeting;
  }
  

}
