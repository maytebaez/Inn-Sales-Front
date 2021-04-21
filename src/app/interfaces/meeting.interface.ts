export interface Meeting {
    _id: any;
    me_type?:any;
    me_number?: any;
    me_lead?:any;
    me_agent?:any;
    me_video?:any;
    me_audio?:any;
    me_transcript?:any;
    me_date?:any;
    me_timeInCall?:any;
    me_score?:any;
    // me_leadConversation?:any;
    me_leadScore?:any;
    me_leadQualification?:any;
    me_priority?:any;
    me_voiceSentiment?:any;
    me_leadAdvance?:any;
    me_leadTime?: number;
    me_agentTime?: number;
}