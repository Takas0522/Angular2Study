using System.Web.Http;
using System.Web.Http.ExceptionHandling;

namespace AspPlusAngular.App_Start
{
    public class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "ActionApi",
                routeTemplate: "api/{controller}/{action}"
             );
        }
    }
}