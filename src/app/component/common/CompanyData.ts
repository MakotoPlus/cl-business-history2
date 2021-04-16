export class CompanyData{
  companycd : number;
  uuid : string = '';
  company_name : string= '';
  postalcd : string= '';
  address_1 : string= '';
  address_2 : string= '';
  address_3 : string= '';
  tel : string= '';
  fax : string= '';
  hp : string= '';
  update_date :string= '';
  insert_date : string= '';


  setData( r : any) : void{
    if ('companycd' in r){
      this.companycd = r.companycd;
    }
    if ('uuid' in r){
      this.uuid = r.uuid;
    }
    if ('company_name' in r){
      this.company_name = r.company_name;
    }
    if ('postalcd' in r){
      this.postalcd = r.postalcd;
    }
    if ('address_1' in r){
      this.address_1 = r.address_1;
    }
    if ('address_2' in r){
      this.address_2 = r.address_2;
    }
    if ('address_3' in r){
      this.address_3 = r.address_3;
    }
    if ('tel' in r){
      this.tel = r.tel;
    }
    if ('fax' in r){
      this.fax = r.fax;
    }
    if ('hp' in r){
      this.hp = r.hp;
    }
    if ('update_date' in r){
      this.update_date = r.update_date;
    }
    if ('insert_date' in r){
      this.insert_date = r.insert_date;
    }
  }
}
