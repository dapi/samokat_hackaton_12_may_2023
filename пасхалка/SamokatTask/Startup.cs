

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;
using SamokatTask.Data.Interfaces;
using SamokatTask.Data.mocks;

namespace SamokatTask
{
    public class Startup
    {
        public void ConfigureServices(IServiceCollection services) {
            services.AddTransient<IRank,MockRanks>();
            services.AddMvc();
            services.AddControllers();
        }

        public void Configure(IApplicationBuilder app, Microsoft.AspNetCore.Hosting.IHostingEnvironment env) {
            app.UseDeveloperExceptionPage();
            app.UseStatusCodePages();
            app.UseStaticFiles();
            app.UseRouting();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

        }
    }
}
