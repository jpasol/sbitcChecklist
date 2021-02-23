import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { _closeDialogVia } from '@angular/material/dialog';
import { date } from '@rxweb/reactive-form-validators';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Equipment } from './shared/models/equipment';
import { User } from './shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class VoucherService {

  constructor(private http: HttpClient) { }
  private apiUrl = `${environment.apiURL}/api/vouchers`
  private currentVoucher = '';
  private voucherSubject = new BehaviorSubject<any>(this.currentVoucher)
  
  public async validateVoucher(userid: string, equipid: string){
    var _voucher;
    var _validUser;
    var _validEquip;
    var _validDate;

    await this.getVoucher(userid).toPromise().then(x => {
      var _voucher = x[0]
      _validUser = _voucher.userid == userid;
      _validEquip = _voucher.equipid == equipid;
      _validDate = _voucher.validity > Date.now();
    });

    console.log(_validUser, _validEquip, _validDate)
    return _validUser && _validEquip && _validDate ;
  }

  public get isVoucherValid{
    return this.currentVoucher;
  }

  public loadVoucher(userid:string)
  {
    return this.getVoucher(userid).pipe(take(1)).toPromise().then(x => {
      this.voucherSubject.next(x);
    }).finally(() => {
      this.voucherSubject.complete();
    })
  }

  public getVoucher(id: string){
    return this.http.get<any>(`${this.apiUrl}/${id}`)
  }

  public getVouchers(){
    return this.http.get<any>(`${this.apiUrl}`)
  }

  public postVoucher(userid, equipid){
    var _voucher = {
      userid: userid,
      equipmentid : equipid
    }

    //added headers
    const headers: HttpHeaders = new HttpHeaders();
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post<any>(`${this.apiUrl}`, _voucher, {headers: headers});
  }

  
}
