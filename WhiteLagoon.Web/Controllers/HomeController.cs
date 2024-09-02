using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using WhiteLagoon.Application.Common.Interfaces;
using WhiteLagoon.Application.Common.Utility;
using WhiteLagoon.Web.Models;
using WhiteLagoon.Web.Models.ViewModel;

namespace WhiteLagoon.Web.Controllers
{
    public class HomeController : Controller
    {
        private readonly IUnitOfWork _unitOfWork;
        public HomeController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public IActionResult Index()
        {
            HomeVM vm = new()
            {
                VillaList = _unitOfWork.Villa.GetAll(includeProperties: "VillaAmenity"),
                Nights = 1,
                CheckInDate = DateOnly.FromDateTime(DateTime.Now),
            };

            return View(vm);
        }

        [HttpPost]
        public IActionResult GetVillaByDate(int nights,DateOnly checkInDate)
        {
            var VillaList = _unitOfWork.Villa.GetAll(includeProperties: "VillaAmenity").ToList();
            var villaNumberList = _unitOfWork.VillaNumber.GetAll().ToList();
            var bookedVillas = _unitOfWork.Booking.GetAll(u => u.Status == SD.StatusApproved || u.Status == SD.StatusCheckedIn).ToList();
            foreach (var villa in VillaList)
            {
                int roomAvailable = SD.VillaRoomsAvailable_Count(villa.Id,
                    villaNumberList,checkInDate,nights,bookedVillas);
                villa.isAvailable  = roomAvailable > 0? true : false;
            }
            HomeVM vm = new()
            {
                CheckInDate = checkInDate,
                VillaList = VillaList,
                Nights = nights
            };

            return PartialView("_VillaList",vm);
        }

        public IActionResult Privacy()
        {
            return View();
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
