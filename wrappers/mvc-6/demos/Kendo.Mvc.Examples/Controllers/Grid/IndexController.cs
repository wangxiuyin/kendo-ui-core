﻿using System.Collections.Generic;
using Kendo.Mvc.Examples.Models;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace Kendo.Mvc.Examples.Controllers
{
	public partial class GridController : Controller
    {
		private ProductService productService;

		public GridController()
		{
			productService = new ProductService(new SampleEntitiesDataContext());
		}

		protected override void Dispose(bool disposing)
		{
			productService.Dispose();

			base.Dispose(disposing);
		}

		public IActionResult Index()
        {
            return View();
        }

		public IActionResult Customers_Read([DataSourceRequest] DataSourceRequest request)
		{
			return Json(GetCustomers().ToDataSourceResult(request));
		}

		private static IEnumerable<CustomerViewModel> GetCustomers()
		{
			var northwind = new SampleEntitiesDataContext();
			return northwind.Customers.ToList().Select(customer => new CustomerViewModel
			{
				CustomerID = customer.CustomerID,
				CompanyName = customer.CompanyName,
				ContactName = customer.ContactName,
				ContactTitle = customer.ContactTitle,
				Address = customer.Address,
				City = customer.City,
				Region = customer.Region,
				PostalCode = customer.PostalCode,
				Country = customer.Country,
				Phone = customer.Phone,
				Fax = customer.Fax,
				Bool = customer.Bool
			});
		}

		public ActionResult Orders_Read([DataSourceRequest]DataSourceRequest request)
		{
			return Json(GetOrders().ToDataSourceResult(request));
		}

		private static IEnumerable<OrderViewModel> GetOrders()
		{
			var northwind = new SampleEntitiesDataContext();

			var customers = northwind.Customers.ToList();

            return northwind.Orders.ToList().Select(order => new OrderViewModel
			{
				ContactName = customers.First(c => c.CustomerID == order.CustomerID).ContactName,
				Freight = order.Freight,
				OrderDate = order.OrderDate,
				ShippedDate = order.ShippedDate,
				OrderID = order.OrderID,
				ShipAddress = order.ShipAddress,
				ShipCountry = order.ShipCountry,
				ShipName = order.ShipName,
				ShipCity = order.ShipCity,
				EmployeeID = order.EmployeeID,
				CustomerID = order.CustomerID
			});
		}

        public ActionResult Products_Read([DataSourceRequest] DataSourceRequest request)
        {
            return Json(productService.Read().ToDataSourceResult(request));
        }
    }
}
