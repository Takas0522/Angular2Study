# ASP.net MVC4 + Angular v2 + webpack

以前にASP.Net４＋Angularで記事を書いたことがありましたが

当時、R.C版だったこともあるので、現在のVer.で作り直してみようと思います。

といっても前回より環境や情報が整ったこともあり、そんなに難しい内容にはならないと思います。

ただ割と無茶な作り方をしているので、素直にCoreかMVC5を使用することをオススメします。

ASP.net MVC4 + Angular v2についても、公式にガイドが出ています。

https://angular.io/docs/ts/latest/cookbook/visual-studio-2015.html

ただ、EmptyなプロジェクトにAngularを乗っけるものなので簡易気味です。

簡易な状態でとりあえず動かしてみたい！ということであれば

公式のガイド通りにやったほうが良いとおもいます。


前半は、AngularのWebpackのIntroductionリファレンスの通りに進みます

https://angular.io/docs/ts/latest/guide/webpack.html

その後、ASP．netMVC4で使用できるよう調整していきます。

# Angularのソースを構築する

https://angular.io/docs/ts/latest/guide/webpack.html

上記のtutorialの内容をすべて行います。

記事作成時点だとチュートリアルの内容は古かったようなので

WebpackBuild時点でエラーが発生した場合は、下記URLの内容を試してみましょう。

http://stackoverflow.com/questions/42213631/errors-while-using-webpack

また、下記のようなエラーが発生する場合はnode.jsがv6.9.4以下の状態の可能性があります。

```
outputOptions.children = options.map(o => o.stats);
```

そして、VisualStudioのタスクランナーで上記のエラーが発生している場合は下記URLの対策を行います。

https://github.com/madskristensen/NpmTaskRunner/issues/47

チュートリアルで行っている主たるところは下記の内容ですね。

それぞれの内容については今回言及することではないともうので省きます。

* TypeScript開発環境の構築：tsConfigの設定

* Webpackビルド設定(Webpack.config)

* Unitテストシステムの構築(karima.conf)

チュートリアルを行った上で、Angular単体でビルドがうまくいっているか確認してみましょう。

VisualStudioのBuildでななく、コンソールで「webpack」を実行し確認します。

# VisualStudioの画面で「のみ」TypeScriptソースでエラーが出ているときは

AngularのBuild時点でエラーが発生していないが

VisualStudioのエラー一覧でエラーが発生している場合、VisualStudio側の構成に原因があることがあります。

AngularのBuild時はプロジェクトのnode_module内のTypeScriptを参照してくれますが

VisualStudioではnode_moduleの設定を見ずに、VisualStudioが持っているTypeScriptのVer.で

エラー判断を行っていることがあるようです。

そんな場合は、下記のそれぞれを行うことで解消できる可能性があります。

## TypeSript2.xのダウンロード

使用するTypeSCriptのVer.とVisualStudioのTypeScriptのVer.が一致していない可能性があります。

VisualStudioのTypeScriptExtensionをインストールしましょう。

https://www.microsoft.com/ja-jp/download/details.aspx?id=48593

## プロジェクトファイルのTypeScriptVerの修正

TypeScriptの旧Verが使用されている環境でプロジェクトを作成した場合

プロジェクトで使用されるTypeScriptVersionがプロジェクト内に残っている場合があります

.cproj内のTypeScriptVersionを変更します。

```
<TypeScriptToolsVersion>2.x</TypeScriptToolsVersion>
```

## 環境変数に残存するTypeSrript情報の削除

VisualStudioの古いTypeScriptバージョン情報が、環境変数に残っている可能性があります。

下記記事の内容をもとに、環境変数の情報を修正しましょう。

http://kiyokura.hateblo.jp/entry/2015/10/13/224800

# ASP.netで使うためのソースの修正

## Webpackの修正

現在、バンドルされたファイルは[dist]ディレクトリに格納されています。

VisualStudioの初期配置のパス上には[dist]は存在しないのでちょいと使いづらいです。

[Scripts]ディレクトリに変更しましょう。

webpack.dev.js
``` javascript
output: {
-   path: helpers.root('dist'),
+   path: helpers.root('Scripts'),
    publicPath: 'http://localhost:8080/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
}
```

## ASP側のRouting設定の変更

クライアントはSPA構成で作成することになるので、ASP側のルーティング等は現状必要ありません。

また、Angularのルーティングで生成されたURLで404を吐かないようにする必要があります。

Web.configで404をが発生した場合、ベースページに飛ばすのも良いかもしれませんが

リダイレクトが発生しまくるので得策ではないかと思われます。

ASPのルーティングとうまく組み合わせて使えば、簡易なLazyLoadingとしても使えるような気がします

（Angular＋WebPackでLazyLoadingする機能はありますが…）

ひとまず、ベースとなるページを残して、あとは潰してしまい、それに合わせてRoutingの設置を変更します。

RouteConfig.cs
``` csharp
public static void RegisterRoutes(RouteCollection routes)
{
    routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
-   routes.MapRoute(
-       name: "Default",
-       url: "{controller}/{action}/{id}",
-       defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
-   );
+   routes.MapRoute(
+       name: "Default",
+       url: "{*url}",
+       defaults: new { controller = "Home", action = "Index" }
+   );
}
```
## BundleConfigの変更

バンドルして生成された3種のJavascriptファイルは、BundleConfigでBundleして出力します。

起点をindex.htmlではなくしたので、ComponenntのStylesに関しては、今回の場合は使用し辛いので

CSSもComponentで取り込まず、外部から直接使用します。

app.component.ts
``` typescript
@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
-   styles: ['./app.component.css']
})
```

なのでCSSもSCSS等でまとめて作っちゃうのがいいかもしれませんね。

今回はチュートリアルで作成したCSSをSCSSで作成し直し、Styles.scssで作り直し

生成されたStyles.cssをバンドルします。

``` csharp
public static void RegisterBundles(BundleCollection bundles)
{
    bundles.Add(new ScriptBundle("~/bundles/src").Include(
                "~/Scripts/polyfills.js",
                "~/Scripts/vendor.js",
                "~/Scripts/app.js"
                ));
    bundles.Add(new StyleBundle("~/public/css").Include(
                "~/public/css/styles.css"));
}
```

## _Layout.cshtmlの変更

_Layout.cshtmlの構成をAngularのindex.html同様の構成に変更してきます

``` html
<!DOCTYPE html>
<html>
<head>
    <base href="/">
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@ViewBag.Title - Sample</title>
    @Styles.Render("~/public/css")
</head>
<body>
    <div class="container body-content">
        @RenderBody()
    </div>
    @Scripts.Render("~/bundles/src")
    @RenderSection("scripts", required: false)
</body>
</html>
```

## Home.cshtmlを変更
 
 Angularの起点をHome.cshtmlに作成します。

 ``` html
<my-app>NOW LOADING...</my-app>
 ```

 ## App_Start系の変更

App_start等のIdentity等々を潰してまわります。

まぁ残しておいても良いですが。

## Angularソースの変更

webconfigを使用した場合、相対ファイルパスで表示するimg等のオブジェクトデータは

Webconfigバンドル時によしなにしてScriptファイルにつっこまれます。

つまり、今回のようにASP.netのcshtmlに乗っける場合は非常に使いにくいです。

例えば下記のようにHTMLを記述してもAngularのBuild時点で存在しないとして怒られて終了します。

```html
<img src = "Script/assets/hogehoge" />
```

なのでバインド変数を使用します。

app.component.ts
``` typescript
export class AppComponent {
    private angularPng: string = "public/images/angular.png";
}
```

app.component.html
``` html
<main>
    <h1>Hello from Angular App with Webpack</h1>
    <img [src]="angularPng"/>
</main>
```

# VisualStudioでデバッグしましょう
通りましたね？

# Advanced
root配下に切ったディレクトリにWebAppを配置したばあい

Angularで設定するBASE_HREFを[/]で設定していたら

切ったディレクトリ内に配置していても、AngularのRoutingはRootから生成されます。

そうなった場合、ASP.netのAPIやimage等のObjectの使用に難が生じますので

BASE_HREFを動的に変更させる必要があります。

そしてそのHREFをAngularで取得すれば

API等とのやりとり等に使用できるようになります。

http://stackoverflow.com/questions/38112891/set-base-href-dynamically-angular-2

http://stackoverflow.com/questions/39287444/angular2-how-to-get-app-base-href-programatically

# 最後に

一応、今回作成したものは、下記に乗せています。