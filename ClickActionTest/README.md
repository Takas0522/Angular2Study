## 素のAngular2におけるクリックイベントの挙動の確認

iPadのmobileブラウザでボタンクリックイベントが妙にもたついている印象がありました。

と、いうのもタブレットのクリックイベントは

「Touch」から始まりClickが発火する動作となっているようです。

その為、onTouchEndのイベントを補足し、処理を呼び出してやる必要があります。

ただし、onTouchStartのみにイベントを設置するとブラウザのクリックイベントが発火しないので

クリックイベントも対応が必要です。また、Touchイベント後

Clickイベントが発火してますので、それに対する対応も必要です。

@HostLitnerでイベントを補足し、targetのクリックイベントを発火させることで回避を行ってみます。

[素HTML+TypeScript] https://jsfiddle.net/TKS0522/j9bgvm56/2/

* START
```
npm i
npm start
```