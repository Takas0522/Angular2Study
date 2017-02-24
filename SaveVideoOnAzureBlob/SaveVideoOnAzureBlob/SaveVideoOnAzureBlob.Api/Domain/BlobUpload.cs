using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using Microsoft.Azure;
using System.Web.Http;
using System.Threading.Tasks;
using System.IO;
using AspPlusAngular.Api.ConstParam;
using Microsoft.WindowsAzure.Storage.Auth;

namespace AspPlusAngular.Api.Domain
{
    public class BlobUpload
    {
        private readonly string CONTAINER_NAME = "test";
        private CloudBlobContainer container;
        public BlobUpload()
        {
            var azureInfo = new AzureConstParameter();
            //ACCOUNT_NAMEとACCOUNT_KEYはAzureのポータルから取得
            var credentials = new StorageCredentials(azureInfo.ACCOUNT_NAME, azureInfo.ACCOUNT_KEY);
            var storageAccount = new CloudStorageAccount(credentials, true);
            var blobClient = storageAccount.CreateCloudBlobClient();
            this.container = blobClient.GetContainerReference(CONTAINER_NAME);
            this.container.CreateIfNotExists();
        }

        public IEnumerable<string> GetBlobFileNameLists()
        {
            return container.ListBlobs(null, false).Select(
                x => GetSasVideoUri(GetUriToFileName(x.Uri.AbsolutePath))
            );
        }

        private string GetUriToFileName(string uri) {
            var pathSplit = uri.Split('/');
            var length = pathSplit.Length - 1;
            return pathSplit[length];
        }

        public async Task UploadBlobOnAzure(HttpPostedFile file, string fileName, string mediaType) {
            var sendByteData = ReadBinaryData(file.InputStream);
            var blob = this.container.GetBlockBlobReference(fileName);
            blob.Properties.ContentType = mediaType;
            await blob.UploadFromByteArrayAsync(sendByteData, 0, sendByteData.Length);
        }
        static public byte[] ReadBinaryData(Stream st)
        {
            byte[] buf = new byte[st.Length];
            using (MemoryStream ms = new MemoryStream())
            {
                while (true)
                {
                    int read = st.Read(buf, 0, buf.Length);
                    if (read > 0)
                    {
                        ms.Write(buf, 0, read);
                    }
                    else
                    {
                        break;
                    }
                }
                return ms.ToArray();
            }
        }
        private string GetSasVideoUri(string fileName) {
            var blob = container.GetBlockBlobReference(fileName);
            var sas = blob.GetSharedAccessSignature(new SharedAccessBlobPolicy()
            {
                Permissions = SharedAccessBlobPermissions.Read,
                SharedAccessExpiryTime = DateTime.UtcNow.AddHours(1)
            });
            return string.Format("{0}{1}", blob.Uri, sas);
        }
    }
}
