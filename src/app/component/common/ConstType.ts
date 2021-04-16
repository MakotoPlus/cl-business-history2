
export class ConstType {
  public static readonly  TYPE = {
    SUCCESS : 'success'
    ,INFO : 'info'
    ,WARNING : 'warning'
    ,DANGER : 'danger'
    ,PRAIMARY : 'praimary'
    ,SECONDARY : 'secondary'
    ,LIGHT : 'light'
    ,DARK : 'dark'
  };
}

export namespace HistoryType{
  export const LANGUAGE = {value: '言語', name:'言語' };
  export const FRAMEWORK = {value:'F/W', name:'F/W'};
  export const DB = {value:'DB', name:'DB'};
  export const OS = {value:'OS', name:'OS'};
}
export namespace ProcessType{
  export const RD = { key : 'RD', name : '要件・調査'};
  export const BD = { key : 'BD', name : '基本設計'};
  export const DD = { key : 'DD', name : '詳細設計'};
  export const PG = { key : 'PG', name : '製造設計'};
  export const UT = { key : 'UT', name : '単体テスト'};
  export const IT = { key : 'IT', name : '結合テスト'};
  export const ST = { key : 'ST', name : 'システムテスト'};
  export const OT = { key : 'OT', name : '運用テスト'};
  export const OP = { key : 'OP', name : '運用保守'};
}

//export namespace ON_OFF{
//  export const
//}
