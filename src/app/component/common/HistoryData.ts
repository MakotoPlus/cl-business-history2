
export class HistoryData {
  uuid : string;
  rangekey : string;
  work_from : string;
  work_to ?: string;
  industry ?: string;
  details ?: string;
  scale ?: number;
  persons ?: number;
  position ?: string;
  jobname ?: string;
  insert_date?: string;
  update_date?: string;
  // ConstTypeが利用できなおのでハードコーディング
  process_group_list ?: {
    'RD'? : boolean
    ,'BD'? : boolean
    ,'DD'? : boolean
    ,'PG'? : boolean
    ,'UT'? : boolean
    ,'IT'? : boolean
    ,'ST'? : boolean
    ,'OT'? : boolean
    ,'OP'? : boolean
   };
  envGroups ?: [
    {
      'type' : string
      ,'version' : string
      ,'details' : string
    }
  ];

  setData( d : any ) : void{
    console.debug(d);
    if ( 'uuid' in d ){
      this.uuid = d.uuid;
    }
    if ( 'rangekey' in d ){
      this.rangekey = d.rangekey;
    }
    if ( 'work_from' in d ){
      this.work_from = d.work_from;
    }
    if ( 'work_to' in d ){
      this.work_to = d.work_to;
    }
    if ( 'industry' in d ){
      this.industry = d.industry;
    }
    if ( 'details' in d ){
      this.details = d.details;
    }
    if ( 'scale' in d ){
      this.scale = d.scale;
    }
    if ( 'persons' in d ){
      this.persons = d.persons;
    }
    if ( 'position' in d ){
      this.position = d.position;
    }
    if ( 'jobname' in d ){
      this.jobname = d.jobname;
    }
    if ( 'process_group_list' in d ){
      //let grouplist  = d.process_group_list;
      //console.debug(grouplist);
      //
      // ここはループ出来ない。そのまま設定
      this.process_group_list= d.process_group_list;
      //Object.keys(d.process_group_list).forEach( r =>{
      //  this.process_group_list[r] = grouplist[r];
      //});
    }
    if ( 'envGroups' in d ){
      this.envGroups = d.envGroups;
      //d.envGroups.forEach(( env , i )=>{
      //  let envObj = {
      //    "type" : env.type
      //    ,"details" : env.details
      //    ,"version" : env.version
      //  };
      //  this.envGroups.push(envObj);
      //});
    }
    if ( 'update_date' in d ){
      this.update_date = d.update_date;
    }
    if ( 'insert_date' in d ){
      this.insert_date = d.insert_date;
    }
  }
}
