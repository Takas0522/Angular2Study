using AspPlusAngular.Api.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace AspPlusAngular.Api.Controllers
{
    public class FileOperationController : ApiController
    {
        BlobUpload bLobUpdFunc;
        FileOperationController() {
            bLobUpdFunc = new BlobUpload();
        }
        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return bLobUpdFunc.GetBlobFileNameLists();
        }

        // GET api/<controller>/5
        public string Get(string fileName)
        {
            return "";
        }

        // POST api/<controller>
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
                    var name = postedFile.FileName;
                    await bLobUpdFunc.UploadBlobOnAzure(postedFile, name, mediaType);
                }
            }
            return response;
        }

        // PUT api/<controller>/5
        public void Put()
        {

        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}