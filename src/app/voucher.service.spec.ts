import { _ViewRepeaterOperation } from '@angular/cdk/collections';
import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { VoucherService } from './voucher.service';

describe('VoucherService', () => {
  let service: VoucherService;
  let xVoucher;
  let cVoucher
  beforeEach( () => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule]
    });
    service = TestBed.inject(VoucherService);

    xVoucher = {
      userID:'jacob',
      equipmentID:'SS02',
      // validity: new Date(Date.now() - 24*60*60*1000) 
      validity: Date.now() - 24*60*60*1000
    }

    cVoucher = {
      userID:'jacob',
      equipmentID:'SS02',
      // validity: new Date(Date.now() + 24*60*60*1000)
      validity: Date.now() + 24*60*60*1000
    }

    // spyOn(service,'getVoucher').and.callFake(() => {
    //   return of(_voucher)
    // })
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //ignored due to testing for connection purpose
  //integration test
  xit('should get vouchers', async () => {
    var _voucher
    // service.getVoucher('tosadmin').subscribe(x => _voucher = x).add(console.log('sub finished'))
    await service.getVoucher('tosadmin').toPromise().then(x => {
      _voucher = x
    });
    expect(_voucher).toBeTruthy();


  })

  //ignored due to testing for connection purpose
  //integration test
  xit('should save voucher', async (done) => {
    const user = 'tosadmin';
    const equip = 'SS01'
    
    var _postMsg;
    var _voucher;
    await service.postVoucher(user , equip).toPromise().then(x => _postMsg = x);
    await service.getVoucher(user).toPromise().then(x => _voucher = x[0])
    expect(Date.parse(_voucher.validity)).toBeGreaterThan(Date.now());
    done();
  })

  it('should validate valid voucher validity', () => {
    expect(service.validateVoucher(cVoucher,'jacob','SS02')).toBeTruthy();
  })

  it('should validate valid userid and equipid voucher', () => {
    expect(service.validateVoucher(cVoucher,'jacob', 'SS02')).toBeTruthy();
  })

  it('should validate voucher validity', () => {
    expect(service.validateVoucher(xVoucher,'jacob','SS02')).toBeFalsy();
  })

  it('should validate userid when validating voucher', () => {
    expect(service.validateVoucher(xVoucher,'ian', 'SS02')).toBeFalsy();
  })

  it('should validate equipld when validating voucher', () => {
    expect(service.validateVoucher(xVoucher,'jacob','SS01')).toBeFalsy();
  })

  it('shoud abort validation from vouchers with non-existent properties', () => {
    let voucher = ''
    expect(service.validateVoucher(voucher,'jacob','SS01')).toBeFalsy();
  })

  it('shoud abort validation from null vouchers', () => {
    let voucher = null
    expect(service.validateVoucher(voucher,'jacob','SS01')).toBeFalsy();
  })
});
