# UseFullCalender

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0-beta.32.3.

## FullCalender
https://fullcalendar.io/license/

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## 参考


## jQueyプラグインをAngular2で使いたい(FullCalendar)

Abugularを使用するようになって、jQuery自体は殆ど使用しなくなりました。

Componentベースで考えたときに、jQueryの処理が全体に波及するので使いにくかったんですね。

特に同じComonentを回し使っているときとか。

ただ。jQueryの覇権時代が長いだけに、色々と使えるjQueryプラグインが存在するわけで

それを使いたいなー。という思いもあるわけです。

なので、今回は、jQueryのプラグインをAngularで使用してみたいと思います。

https://gearheart.io/blog/how-to-include-jquery-plugins-in-angular-2-running-via-webpack/

上記の記事の焼き直しみたいな感じになっていますが

今回はangular-cliを使用して、作ってみようと思います。

angular-cliの使い方は下記を参考にどうぞ。

https://www.npmjs.com/package/angular-cli

https://developers.eure.jp/tech/begin_angular_cli/

## npmでパッケージをダウンロード

まずは、モノがないと始まらないので

jQueryと今回使用したいFullCalendarをnpmでダウンロードします。

## 型定義ファイル+αをダウンロード

jQueryとFullCalendarは型定義ファイルが提供されているので

下記の2つの型定義ファイルをダウンロードします。

@types/jquery

@types/fullcalendar

また、fullCalendarの型定義ファイル上で

日付等の指定にmoment.jsの型が指定されているので

moment.jsとその型定義ファイル @types/momentもダウンロードします。

## angular-cli.json

Angular-cliを使用している場合

外部コンポーネント等のCSSやJavascriptを使用しやすいです。

今回、FullCalendarを使用するため、FullCalendarのCSSを別に読み込みます。

``` json
"styles": [
    "../node_modules/fullcalendar/dist/fullcalendar.css"
]
```

## fullCalendarの実装をカキカキ

参考サイトの通り、FullCalendarを使用するComponentを分離して作成します。

Htmlにng-contentを指定し、そこでjQueryのFullCalendarを注入します。

HTML
``` html
<ng-content></ng-content>
```

HTMLにはng-contentしかないので

this.elementRef.nativeElementのみで指定できますね。

型定義ファイルを使用することで型検証されるようになるため

どのような値をつっこめば良いのかわかりやすくなります。

TypeScript
``` typescript
this.calendarElement = jQuery(this.elementRef.nativeElement);
this.calendarElement.fullCalendar({
    editable: true,
    defaultView: 'agendaWeek',
    selectable: true,
    selectHelper: true
});
```

## 仕上げ

あとは上記で作成したComponentを使用し、[ng serve]で実行して動作確認です。

表示するだけでは味気ないので、下記のように書き換えてみました。

日付の表示Formatを変更し、各イベントの処理を実装します。

イベントの引数はFunctionを指定しますが

その場合、calendarElementのobjectが[this]となります。

Angularを使用するうえで色々と使いづらいので、Functionに

thisをbindしてAngularの機能の諸々を使用できるようにしています。

``` typescript
this.calendarElement = jQuery(this.elementRef.nativeElement);
this.calendarElement.fullCalendar({
    allDayText: '終日',
    editable: true,
    defaultView: 'agendaWeek',
    selectable: true,
    selectHelper: true,
    slotDuration: moment.duration(15, 'minutes'),
    slotLabelFormat : 'H:mm',
    buttonText: {
        today: '今日'
    },
    monthNames: ['１月', '２月', '３月', '４月', '５月', '６月', '７月', '８月', '９月', '１０月', '１１月', '１２月'],
    dayNames: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
    dayNamesShort: ['日', '月', '火', '水', '木', '金', '土'],
    views: {
        month: {
            columnFormat: 'ddd'
        },
        week: {
            columnFormat: 'D[(]ddd[)]'
        },
        day: {
            columnFormat: 'D[(]ddd[)]'
        }
    },
    select: this.onSelectFunction,
    eventDragStop: this.onDropFunction,
    eventResize: this.onReSizeFunction,
    eventRender: this.addEventRender
});
```

``` typescript
/*FullCalendarで定義されていないイベントを付与する(ダブルクリック)*/
private addEventRender = function(event: FC.EventObject, element: any){
    element.bind('dblclick', () => {
        alert('onDoubleClickEbent');
        console.log(event);
    });
}
private onSelectFunction = function(start, end){
    let eventTitle = prompt('予定の名称を入力せよ！！');
    let eventData: FC.EventObject = {
        start: start,
        end: end,
        title: eventTitle
    };
    this.calendarElement.fullCalendar('renderEvent', eventData, true);
    this.calendarElement.fullCalendar('unselect');
}.bind(this);

private onDropFunction = function(event: FC.EventObject){
    console.log('Drop!');
    console.log(event);
}.bind(this);

private onReSizeFunction = function(event: FC.EventObject){
    console.log('ReSize!');
    console.log(event);
}.bind(this);
```