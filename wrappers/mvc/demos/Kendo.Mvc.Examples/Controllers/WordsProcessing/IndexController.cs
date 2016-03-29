﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;
using Telerik.Windows.Documents.Common.FormatProviders;
using Telerik.Windows.Documents.Flow.FormatProviders.Docx;
using Telerik.Windows.Documents.Flow.FormatProviders.Html;
using Telerik.Windows.Documents.Flow.FormatProviders.Rtf;
using Telerik.Windows.Documents.Flow.FormatProviders.Txt;
using Telerik.Windows.Documents.Flow.Model;

namespace Kendo.Mvc.Examples.Controllers
{
    public class WordsProcessingController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Download_Document(HttpPostedFileBase customDocument, string convertTo)
        {
            IFormatProvider<RadFlowDocument> fileFormatProvider = null;
            IFormatProvider<RadFlowDocument> convertFormatProvider = null;
            RadFlowDocument document = null;
            string mimeType = String.Empty;
            string fileDownloadName = "{0}.{1}";

            if (customDocument != null && Regex.IsMatch(Path.GetExtension(customDocument.FileName), ".docx|.rtf|.html|.txt"))
            {
                switch (Path.GetExtension(customDocument.FileName))
                {
                    case ".docx":
                        fileFormatProvider = new DocxFormatProvider();
                        break;
                    case ".rtf":
                        fileFormatProvider = new RtfFormatProvider();
                        break;
                    case ".html":
                        fileFormatProvider = new HtmlFormatProvider();
                        break;
                    case ".txt":
                        fileFormatProvider = new TxtFormatProvider();
                        break;
                    default:
                        fileFormatProvider = null;
                        break;
                }

                document = fileFormatProvider.Import(customDocument.InputStream);
                fileDownloadName = String.Format(fileDownloadName, Path.GetFileNameWithoutExtension(customDocument.FileName), convertTo);
            }
            else
            {
                fileFormatProvider = new DocxFormatProvider();
                string fileName = Server.MapPath("~/Content/web/wordsprocessing/SampleDocument.docx");
                using (FileStream input = new FileStream(fileName, FileMode.Open))
                {
                    document = fileFormatProvider.Import(input);
                }

                fileDownloadName = String.Format(fileDownloadName, "SampleDocument", convertTo);
            }

            switch (convertTo)
            {
                case "docx":
                    convertFormatProvider = new DocxFormatProvider();
                    mimeType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
                    break;
                case "rtf":
                    convertFormatProvider = new RtfFormatProvider();
                    mimeType = "application/rtf";
                    break;
                case "html":
                    convertFormatProvider = new HtmlFormatProvider();
                    mimeType = "text/html";
                    break;
                case "txt":
                    convertFormatProvider = new TxtFormatProvider();
                    mimeType = "text/plain";
                    break;
                default:
                    convertFormatProvider = new TxtFormatProvider();
                    mimeType = "text/plain";
                    break;
            }

            byte[] renderedBytes = null;

            using (MemoryStream ms = new MemoryStream())
            {
                convertFormatProvider.Export(document, ms);
                renderedBytes = ms.ToArray();
            }

            return File(renderedBytes, mimeType, fileDownloadName);
        }
    }
}
