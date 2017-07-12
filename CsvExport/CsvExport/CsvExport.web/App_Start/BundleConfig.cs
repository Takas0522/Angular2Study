using System.Web;
using System.Web.Optimization;

namespace CsvExport.web
{
    public class BundleConfig
    {
        // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
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
