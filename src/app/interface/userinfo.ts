// ユーザ情報インタフェース
export interface IfUserinfo {
  isLogin : boolean;
  id_user: number;
  email: string,
  family_name: string,
  given_name: string,
  name: string, /* email */
  user_name: string,
  id_company: number,
  sub : string,
  company_name: string;
  authority: number;  // 権限 99:権限 50:パワーユーザ 00:一般
}
