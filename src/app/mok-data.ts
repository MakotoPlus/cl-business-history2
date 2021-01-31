//
// ローカルモックデータ
import { IfUserinfo } from './interface/userinfo';
import {AppSettings} from './appsettings';

export const USERINFO : IfUserinfo ={
    id_user: 101,
    user_name:'テスト 太郎',
    id_company: 9001,
    company_name: '企業',
    authority: AppSettings.AUTHORITY_ADMIN
};
