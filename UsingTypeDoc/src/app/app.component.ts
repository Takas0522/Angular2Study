import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';

  /** テスト用のファンクションです */
  testFunction(): string {
    return 'aaa';
  }

  private _propertySt: string;
  get propertySt(): string {
    return this._propertySt;
  }
  set propertySt(value: string) {
    this._propertySt = value;
  }

  /**
   * テスト用のファンクションです
   * @param num1 引数1
   * @param st1 引数2
   * @param bo1 引数3
   */
  testFunction2(num1: number, st1: string, bo1: boolean): string {
    return 'aaa';
  }

  /**　メソッド */
  voidMethod() {
    console.log('aa');
  }

  /**
   * プライベートなやつ
   * @param num1 数値1
   * @param num2 数値2
   */
  private privateFunc(num1: number, num2: number) {

  }
}
