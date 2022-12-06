// Import the required libraries
const Excel = require('exceljs');
const pdf = require('pdf-lib');

// Read the Excel file
const workbook = new Excel.Workbook();
await workbook.xlsx.readFile('input.xlsx');

// Create a new PDF document
const pdfDoc = await pdf.PDFDocument.create();

// Add a new page to the PDF
const page = pdfDoc.addPage();

// Iterate over each worksheet in the Excel file
for (const worksheet of workbook.worksheets) {
  // Set the page size to match the size of the worksheet
  page.setSize(worksheet.actualColumnCount, worksheet.actualRowCount);

  // Iterate over each row in the worksheet
  for (const row of worksheet.rows) {
    // Iterate over each cell in the row
    for (const cell of row.cells) {
      // Add the cell's text to the page
      page.drawText(cell.text);
    }
  }
}

// Save the PDF to a file
const pdfBytes = await pdfDoc.save();
fs.writeFileSync('output.pdf', pdfBytes);
