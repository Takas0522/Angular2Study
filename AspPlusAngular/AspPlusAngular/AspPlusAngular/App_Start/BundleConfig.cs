using System.Web;
using System.Web.Optimization;

namespace AspPlusAngular
{
    public class BundleConfig
    {
        // バンドルの詳細については、http://go.microsoft.com/fwlink/?LinkId=301862  を参照してください
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
    }
}
