using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Web;
using System.Web.Http;

namespace CsvExport.api.Controllers.CsvExport
{
    public class CsvExportController : ApiController
    {
        public HttpResponseMessage Get(bool hasError)
        {
            if (!hasError)
            {
                var stream = new MemoryStream();
                var writter = new BinaryWriter(stream);
                var outputText = "a,b,c,d,e,f,g,h,i,j,k";
                var setEncoding = Encoding.GetEncoding("shift-jis");
                writter.Write(setEncoding.GetBytes(outputText));
                writter.Flush();
                stream.Position = 0;
                var retResult = new HttpResponseMessage(System.Net.HttpStatusCode.OK);
                retResult.Content = new StreamContent(stream);
                retResult.Content.Headers.ContentType = new MediaTypeHeaderValue("text/csv");
                retResult.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment") { FileName = "日本語名称.csv" };
                return retResult;
            }
            else
            {
                var retErr = Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "さーばーえらー");
                return retErr;
            }
        }
    }
}