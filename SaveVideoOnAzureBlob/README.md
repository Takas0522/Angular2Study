YouTube等の外部Serviceを使用してもいいですが

Privateな環境でVideoのアップロードをしたい場合があります
(業務利用ぐらいしか思いつきませんが。

AzureのMediaService等を使っても良いかもしれませんが

同じくAzureのBlobStorageServiceを使用すれば

手っ取り早くプライベートな環境でビデオのアップロード＆視聴が可能となります。

Angular+ASP.netで動画ファイルのアップロードと視聴ページの作成を行ってみたいと思います。

# Azureの設定
## CORSの設定

CORS(クロスオリジンリソース共有)を設定します。

BLOBのUpdateのための設定です。

参考にしたサイトでは、ソースコードで設定の変更を行っていますが

AzureのPortal上からも変更できるようです。

https://tech-blog.cloud-config.jp/2014/08/15/upload-the-data-to-the-azure-blob-storage-in-javascript/

https://docs.microsoft.com/ja-jp/azure/storage/storage-cors-support

1. リソースグルプでストレージアカウントを選択

![Azureのリソースグループ](./img/1.jpg)

2. ストレージアカウントの設定から「CORS」を選択

![Azureのリソースグループ](./img/2.jpg)

3. CORの設定がないと思うので、「追加」を選択

![Azureのリソースグループ](./img/3.jpg)

4. 上記の参考URLの内容をもとに、CORSの設定を行う

![Azureのリソースグループ](./img/4.jpg)

# ASP.net WebAPIを使用したオブジェクトのAPIへのアップロード

## 前準備

ASP.Netはアップロードファイルの上限がデフォルト4MBとなっているので

受付可能なファイルサイズを拡張して上げる必要があります。

[参考]

http://tarcvf.blogspot.jp/2013/07/aspnet.html

web.config
```
<httpRuntime targetFramework="4.5.2" maxRequestLength="102400" />
```

# Webページからのファイルのアップロード

# WebAPIへのアップロード

inputタグの[type=file accept='video/*']であれば、取得対象が動画ファイルとなります。

(change)でファイル変更時のイベントを補足し、WebAPIにファイルを送る処理を実装します。

[参考]
http://www.c-sharpcorner.com/article/angular-2-file-upload-using-web-api/


``` html
<input type='file' accept='video/*' (change)="onChangeInput($event)" />
```

``` typescript
//component
private onChangeInput(el: any) {
    let file = el.target.files[0];
    let formData = new FormData();
    formData.append('uploadFile', file, file.name);
    this._webapi.putUploadFile(formData).subscribe(data => {
        console.log(data);
    });
}
//----------------------------------------------------------
//webapiに送る処理
putUploadFile(formData: FormData): Observable<any> {
    return this.postFileData<any>("api/FileOperation", formData);
}
```

WebApiではFormデータを送信する

``` typescript
//httpのPostリクエストでファイルを送信
private postFileData<T>(url: string, sendData: FormData) {
    return this.http
        .post(url, sendData, <headersContent>)
        .map(res => res.json())
        .catch(error => {
            alert(error);
            return Observable.throw(error)
        });
}
```

## WebAPIからAzureにBlobデータを登録する

ASPのControllerではPOSTされたデータから

HttpResponseMessageでファイル情報等を抜き出します。

``` csharp
public async Task<HttpResponseMessage> Post()
{
    var response = new HttpResponseMessage();
    var httpRequest = HttpContext.Current.Request;
    var mediaType = Request.Content.Headers.ContentType.MediaType;
    if (httpRequest.Files.Count > 0)
    {
        foreach (string file in httpRequest.Files)
        {
            var postedFile = httpRequest.Files[file];
            /*→Azureの登録処理へ→*/
        }
    }
    return response;
}
```

AzureSDKを使用して、Blobの対象ストレージを選択（なければ作成）します。

``` csharp
var credentials = new StorageCredentials(<ACCOUNT_NAME>, <ACCOUNT_KEY>);
var storageAccount = new CloudStorageAccount(credentials, true);
var blobClient = storageAccount.CreateCloudBlobClient();
container = blobClient.GetContainerReference(<CONTAINER_NAME>);
container.CreateIfNotExists();
```
[参考]

http://gooner.hateblo.jp/entry/2014/03/10/blob/

AzureのAPIはファイルはByte[]引数となりますので

httpRequestのFileのStream型をByte[]型に変換してAzureのAPIに渡します。

GetBlockBlobReferenceでAzureにUpload出来る形にした後

UploadFromByteArrayAsyncでAzureにアップロードします。

``` csharp
var sendByteData = //file.InputStreamをByte[]変換;
//Blobにアップロードする対象のファイルを決定
var blob = container.GetBlockBlobReference(FILE_NAME);
//メディアのタイプを決定
blob.Properties.ContentType = mediaType;
//Blobにアップロード
await blob.UploadFromByteArrayAsync(sendByteData, 0, sendByteData.Length);
```

#SASを付与したURLの生成

では、作成したデータにアクセスするためのアドレスを生成します。

BlobへのアクセスはShared Access Signature (SAS) で作成したURLを返却します。

期間限定で、APIキーの譲渡なしにデータアクセス出来るようになるそうです。

[参考]

http://stackoverflow.com/questions/19655868/streaming-video-from-azure-blob-storage

``` csharp
//コンテナ内のファイルを指定
var blob = container.GetBlockBlobReference(FILE_NAME);
//SASアドレスの作成
var sas = blob.GetSharedAccessSignature(new SharedAccessBlobPolicy()
{
    //読取りのみ
    Permissions = SharedAccessBlobPermissions.Read,
    //１時間だけアクセス可能
    SharedAccessExpiryTime = DateTime.UtcNow.AddHours(1)
});
//BlobのURIとマージしてURKを生成
var Url = string.Format("{0}{1}", blob.Uri, sas);
```

# AngularでVideoのSrcにバインドする

JSONでURLを返却したら、VideoのsourceにURLをバインドします。

下記を参考にしましたが、特殊な例っぽいんで

videoのsrcにバインドするだけでも良いかもしれません（試してないです）

http://stackoverflow.com/questions/42185584/play-only-one-video-simultaneously

``` html
//こんな感じ？
<video width="320" height="240" controls>
    <source [src]="SASのURL" type="video/mp4">
    Your browser does not support the video tag.
</video>
```

# 結果
こんな感じになります。

