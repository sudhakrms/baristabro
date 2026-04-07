const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const outputPath = './developer-throughput-report.pdf';

// Create PDF document
const doc = new PDFDocument({
  size: 'A4',
  layout: 'landscape',
  autoFirstPage: false,
  margins: { top: 40, bottom: 0, left: 40, right: 40 }
});

const pageWidth = 11 * 72; // A4 landscape
const pageHeight = 8.5 * 72;
const contentWidth = pageWidth - 80;
const contentHeight = pageHeight - 65;

let pageNum = 0;
let totalPages = 2; // cover + 1 content

// Helper function to add a page with footer
function addPage(title) {
  doc.addPage();
  pageNum++;
  
  // Footer
  doc.fontSize(8).font('Helvetica');
  doc.text(`Generated: ${new Date().toISOString().split('T')[0]}`, 40, pageHeight - 20);
  doc.text(`Page ${pageNum} of ${totalPages}`, pageWidth - 120, pageHeight - 20);
  
  // Title
  if (title) {
    doc.fontSize(16).font('Helvetica-Bold');
    doc.text(title, 40, 40);
  }
}

// Add cover page
addPage();
doc.fontSize(28).font('Helvetica-Bold');
doc.text('Developer Throughput Report', 100, 150, { align: 'center', width: pageWidth - 200 });
doc.fontSize(14).font('Helvetica');
doc.text('Combined Delivery Metric per Engineer', 100, 200, { align: 'center', width: pageWidth - 200 });
doc.fontSize(11);
doc.text(`Generated: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, 100, 300, { align: 'center', width: pageWidth - 200 });

// Add table page
addPage('Developer Throughput - Combined Delivery Metric');

const tableData = [
  ['Developer', 'PRs Merged', 'Work Items\nCompleted', 'Total\nDeliveries'],
  ['Sudhakar Sadasivuni (M)', '0', '0', '0'],
  ['Aparana Gupta (M)', '0', '2', '2'],
  ['aizaz m (M)', '0', '1', '1'],
  ['Lakshmi Kothamasu (M)', '3', '2', '5'],
  ['Apoorv Gupta', '2', '3', '5'],
  ['Amit Kumar', '4', '6', '10'],
  ['Ishika Todwal', '5', '4', '9'],
  ['Team Totals', '14', '18', '32']
];

const colWidths = [200, 120, 140, 140];
const rowHeight = 16;
let startY = 100;
const cellPadding = 4;

// Draw table header
doc.fontSize(8).font('Helvetica-Bold');
let x = 40;
tableData[0].forEach((header, i) => {
  doc.fillColor('#E0E0E0').rect(x, startY, colWidths[i], rowHeight).fill();
  doc.fillColor('#000000');
  doc.text(header, x + cellPadding, startY + cellPadding, { width: colWidths[i] - cellPadding * 2, height: rowHeight - cellPadding * 2 });
  x += colWidths[i];
});

startY += rowHeight;

// Draw table rows
doc.font('Helvetica').fontSize(8);
tableData.slice(1, -1).forEach((row, idx) => {
  x = 40;
  const bgColor = idx % 2 === 0 ? '#FFFFFF' : '#F5F5F5';
  
  row.forEach((cell, i) => {
    doc.fillColor(bgColor).rect(x, startY, colWidths[i], rowHeight).fill();
    doc.strokeColor('#CCCCCC').rect(x, startY, colWidths[i], rowHeight).stroke();
    doc.fillColor('#000000');
    doc.text(cell, x + cellPadding, startY + cellPadding, { width: colWidths[i] - cellPadding * 2, height: rowHeight - cellPadding * 2 });
    x += colWidths[i];
  });
  
  startY += rowHeight;
});

// Draw footer row (totals)
doc.font('Helvetica-Bold').fontSize(8);
x = 40;
const footerRow = tableData[tableData.length - 1];
footerRow.forEach((cell, i) => {
  doc.fillColor('#D0D0D0').rect(x, startY, colWidths[i], rowHeight).fill();
  doc.strokeColor('#999999').rect(x, startY, colWidths[i], rowHeight).stroke();
  doc.fillColor('#000000');
  doc.text(cell, x + cellPadding, startY + cellPadding, { width: colWidths[i] - cellPadding * 2, height: rowHeight - cellPadding * 2 });
  x += colWidths[i];
});

// Add summary section
startY += rowHeight + 20;
doc.font('Helvetica-Bold').fontSize(10);
doc.fillColor('#000000').text('THROUGHPUT METRICS', 40, startY);

startY += 20;
doc.font('Helvetica').fontSize(8);
const summaryText = `Total Combined Deliveries: 32 (14 PRs + 18 Work Items)
Team Composition: 7 members (4 managers, 3 individual contributors)
Average Deliveries per Engineer: 4.57
Top Performer: Amit Kumar (10 deliveries)

KEY INSIGHTS:
• 56.25% of throughput from work items vs 43.75% from PR merges
• Strong contributor concentration in individual contributor cohort
• Engineering managers actively contributing to deliverables`;

doc.text(summaryText, 40, startY, { width: pageWidth - 80 });

// Finalize PDF
const stream = fs.createWriteStream(outputPath);
doc.pipe(stream);
doc.end();

stream.on('finish', () => {
  const stats = fs.statSync(outputPath);
  console.log(`✅ PDF Report Generated Successfully`);
  console.log(`📄 File: ${path.resolve(outputPath)}`);
  console.log(`📊 Size: ${(stats.size / 1024).toFixed(2)} KB`);
  console.log(`📄 Pages: 2`);
});

stream.on('error', (err) => {
  console.error('❌ Error generating PDF:', err);
  process.exit(1);
});
