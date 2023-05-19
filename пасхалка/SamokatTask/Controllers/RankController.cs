using Microsoft.AspNetCore.Mvc;
using SamokatTask.Data.Interfaces;
using SamokatTask.ViewsModels;

namespace SamokatTask.Controllers
{
    [Route("api/[controller]")]
    public class RankController : Controller
    {
        public readonly IRank _rank;

        public RankController(IRank irank)
        {
            _rank = irank;
        }
        public ViewResult List()
        {
            RankListViewModel obj = new RankListViewModel();
            obj.getAllRanks = _rank.Ranks;
            return View(obj);
        }
    }
}
