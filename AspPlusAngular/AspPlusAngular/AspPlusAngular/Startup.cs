using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(AspPlusAngular.Startup))]
namespace AspPlusAngular
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
        }
    }
}
