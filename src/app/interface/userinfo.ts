// ユーザ情報インタフェース
export interface IfUserinfo {
  id_user: number;
  user_name: string;
  id_company: number;
  company_name: string;
  authority: number;  // 権限 99:権限 50:パワーユーザ 00:一般
}
