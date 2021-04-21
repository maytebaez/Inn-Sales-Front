import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ChartOptions, ChartType } from 'chart.js';
import { Meeting } from '../../../interfaces/meeting.interface';
import { MeetingService } from '../../../services/meeting.service';
import { UserService } from '../../../services/user.service';
import { User } from '../../../interfaces/user.interface';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../../../services/storage.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-meeting-reports',
  templateUrl: './meeting-reports.component.html',
  styleUrls: ['./meeting-reports.component.scss']
})
export class MeetingReportsComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  meetingId: string = '';
  userAuth: User;
  idLead = ''
  playButton = true;
  player = new Audio ();
  meeting: Meeting = {
    _id: '',
    // me_type:'',
    // me_number: '',
    // me_lead: this.idLead,
    // me_agent: this.userAuth._id,
    // me_video:'',
    // me_voice:'',
    me_transcript:'',
    // me_date:'',
    // me_timeInCall:'',
    // me_score:'',
    // me_leadConversation:'',
    // me_leadScore:'',
    // me_leadQualification:'',
    // me_priority:'',
    // me_voiceSentiment:'',
    // me_leadAdvance:'',
    me_number: 1 
  };
  audioFile: any;

  public doughnutChartData: Number[]=[100];

  public doughnutChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
      labels: {
        // This more specific font property overrides the global property
        fontColor: 'black',
        fontSize: 20
      }
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };

  public doughnutChartType: ChartType = 'doughnut';

  public doughnutChartColors = [
    {
      backgroundColor: ['rgba(236,76,64)'],
    },
  ];

  public doughnutChartColors2 = [
    {
      backgroundColor: ['rgba(0,188,213)'],
    },
  ];

  constructor(private userService: UserService,
              private meetingService: MeetingService,
              private activatedRoute: ActivatedRoute,
              private storageService: StorageService) {

     this.userAuth = this.userService.getDataFromStorage('user');
     this.activatedRoute.params.subscribe(params =>{
      this.idLead = params['idLead'];
    });

  }


  ngOnInit() {
    // this.firstFormGroup = this._formBuilder.group({
    //   firstCtrl: ['', Validators.required]
    // });
    // this.secondFormGroup = this._formBuilder.group({
    //   secondCtrl: ['', Validators.required]
    // });
  }

  async uploadFile(event) {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Analyzing audio...',
      heightAuto: false
    });
    Swal.showLoading();
    this.audioFile = event.target.files[0];
    this.meeting.me_lead = this.idLead;
    this.meeting.me_agent = this.userAuth._id;

    this.meetingService.addMeeting(this.meeting).subscribe(async res=>{
      if(res['ok']){
        this.meetingId = res['meeting']._id;
        await this.storageService.uploadFile(this.audioFile, this.meetingId);
        this.meeting = this.storageService.returnMeeting();
        console.log(this.meeting);
        Swal.close();
        Swal.fire({
          allowOutsideClick: false,
          icon: 'success',
          text: 'The analysis has been completed successfully.',
          title: 'Go to step 2!',
          heightAuto: false
        });
      }
    });   
  }

  playAudio() {
    this.player.src = `https://innsalesbackend.herokuapp.com/audios/audio/${this.meeting.me_audio}`;
    this.player.load();
    this.player.play();
    this.playButton = false;
  }

  stopAudio(){
    this.player.pause();
    this.playButton=true;
  }

}
