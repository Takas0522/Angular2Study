YouTube等の外部Serviceを使用してもいいですが

Privateな環境でVideoのアップロードをしたい場合があります。

MSのMediaService等を使っても良いかもしれませんが

AzureのBlobStorageServiceを使用すれば

手っ取り早く

プライベートな環境でビデオのアップロード＆視聴が可能となります。

# Azureの設定
## CORSの設定

CORS(クロスオリジンリソース共有)を設定します。

下記のサイトでは、ソースコードでゴニョゴニョしてましたが

AzureのPortal上からも変更できます。

https://tech-blog.cloud-config.jp/2014/08/15/upload-the-data-to-the-azure-blob-storage-in-javascript/

https://docs.microsoft.com/ja-jp/azure/storage/storage-cors-support

1. リソースグルプでストレージアカウントを選択

![Azureのリソースグループ](./img/1.jpg)

2. ストレージアカウントの設定から「CORS」を選択

![Azureのリソースグループ](./img/2.jpg)

3. CORの設定がないと思うので、「追加」を選択

![Azureのリソースグループ](./img/3.jpg)

4. 下記URLの内容をもとに、CORSの設定を行う

https://docs.microsoft.com/ja-jp/azure/storage/storage-cors-support

https://tech-blog.cloud-config.jp/2014/08/15/upload-the-data-to-the-azure-blob-storage-in-javascript/

![Azureのリソースグループ](./img/4.jpg)

# Angularを使用したオブジェクトのAPIへのアップロード

http://www.c-sharpcorner.com/article/angular-2-file-upload-using-web-api/

ASP.Netはアップロードファイルの上限がデフォルト4MBとなっているので

受付可能なファイルサイズを拡張して上げる必要があります。

http://tarcvf.blogspot.jp/2013/07/aspnet.html

# AzureBlobへのアップロード

http://gooner.hateblo.jp/entry/2014/03/10/blob/

#SASを付与したURLの生成

http://stackoverflow.com/questions/19655868/streaming-video-from-azure-blob-storage

# AngularでVideoにSrcにバインドする

http://stackoverflow.com/questions/42185584/play-only-one-video-simultaneously