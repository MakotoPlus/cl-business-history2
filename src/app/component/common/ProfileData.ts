
export class ProfileData{
  initial : string;
  family_name_kana : string;
  given_name_kana : string;
  sex : string;
  station : string;
  train : string;
  address : string;
  pr : string;
  qualifications : string;
  date_joined : string;
  birthday : {
      year : number
      ,month : number
      ,day : number
  };

  setData( r : any):void{
    if ('initial' in r){
      this.initial = r.initial;
    }
    if ('family_name_kana' in r ){
      this.family_name_kana=r.family_name_kana;
    }
    if ('given_name_kana' in r ){
      this.given_name_kana=r.given_name_kana;
    }
    if ('birthday' in r ){
      if (r.birthday){
        this.birthday = {
          year : r.birthday.year
          ,month : r.birthday.month
          ,day : r.birthday.day
        }
      }
    }
    if ('sex' in r ){
      this.sex = r.sex;
    }
    if ('station' in r ){
      this.station = r.station;
    }
    if ('train' in r ){
      this.train = r.train;
    }
    if ('address' in r ){
      this.address = r.address;
    }
    if ('date_joined' in r ){
      this.date_joined = r.date_joined;
    }
    if ('pr' in r ){
      console.log(r.pr)
      this.pr = r.pr;
    }
    if ('email' in r){
      //this.initial.setValue(r.initial);
    }
    if ('qualifications' in r){
      this.qualifications = r.qualifications;
    }
    if ('company_id' in r ){
      //this.initial.setValue(r.initial);
    }

  }
}
