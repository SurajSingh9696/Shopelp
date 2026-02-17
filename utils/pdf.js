import jsPDF from "jspdf";
import { getCurrencySymbol } from "./currency";

// Helper function to format currency for PDF (uses Rs. instead of symbol)
function formatPDFCurrency(amount) {
  const symbol = getCurrencySymbol();
  const prefix = symbol === "₹" ? "Rs. " : symbol === "$" ? "$ " : "";
  return `${prefix}${Number(amount).toFixed(2)}`;
}

export function generateProfitReport(rows = []) {
  const doc = new jsPDF({ orientation: "landscape" });
  
  // Header
  doc.setFillColor(16, 185, 129); // emerald-500
  doc.rect(0, 0, 297, 25, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text("Profit Margin Report", 14, 12);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(240, 253, 244); // emerald-50
  doc.text(`Generated: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`, 14, 19);

  // Table Header
  let y = 35;
  doc.setFillColor(241, 245, 249); // slate-100
  doc.rect(14, y - 5, 271, 8, "F");
  
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85); // slate-700
  doc.text("ITEM NAME", 16, y);
  doc.text("CATEGORY", 75, y);
  doc.text("PKTS/BOX", 115, y);
  doc.text("PRICE/PKT", 145, y);
  doc.text("COST/BOX", 177, y);
  doc.text("SALE/BOX", 209, y);
  doc.text("PROFIT", 241, y);
  doc.text("MARGIN", 265, y);

  y += 5;

  // Table Rows
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(30, 41, 59); // slate-800
  
  rows.forEach((row, index) => {
    if (y > 185) {
      doc.addPage();
      y = 20;
    }
    
    // Alternate row background
    if (index % 2 === 0) {
      doc.setFillColor(248, 250, 252); // slate-50
      doc.rect(14, y - 4, 271, 7, "F");
    }
    
    doc.text(String(row.name).substring(0, 22), 16, y);
    doc.text(String(row.category || "-").substring(0, 15), 75, y);
    doc.text(String(row.smallPacketsPerBox || "0"), 115, y);
    doc.text(formatPDFCurrency(row.sellingPricePerSmallPacket || 0), 145, y);
    doc.text(formatPDFCurrency(row.costPerBox || 0), 177, y);
    doc.text(formatPDFCurrency(row.sellingPricePerBox || 0), 209, y);
    
    // Profit in green
    doc.setTextColor(22, 163, 74); // green-600
    doc.setFont("helvetica", "bold");
    doc.text(formatPDFCurrency(row.profitPerBox || 0), 241, y);
    
    // Margin
    doc.setTextColor(30, 41, 59);
    doc.setFont("helvetica", "normal");
    doc.text(`${row.margin || 0}%`, 265, y);
    
    y += 7;
  });

  // Footer Summary
  if (rows.length > 0) {
    y += 3;
    doc.setDrawColor(226, 232, 240); // slate-200
    doc.setLineWidth(0.5);
    doc.line(14, y, 285, y);
    y += 8;
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(16, 185, 129); // emerald-500
    const totalProfit = rows.reduce((sum, row) => sum + (row.totalProfit || 0), 0);
    doc.text(`Total Estimated Profit: ${formatPDFCurrency(totalProfit)}`, 14, y);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(148, 163, 184); // slate-400
    doc.text(`Total Items: ${rows.length}`, 220, y);
  }

  doc.save("profit-report.pdf");
}

export function generateInventoryReport(rows = []) {
  const doc = new jsPDF({ orientation: "landscape" });
  
  // Header
  doc.setFillColor(59, 130, 246); // blue-500
  doc.rect(0, 0, 297, 25, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text("Inventory Report", 14, 12);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(239, 246, 255); // blue-50
  doc.text(`Generated: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`, 14, 19);

  // Table Header
  let y = 35;
  doc.setFillColor(241, 245, 249); // slate-100
  doc.rect(14, y - 5, 271, 8, "F");
  
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85); // slate-700
  doc.text("ITEM NAME", 16, y);
  doc.text("CATEGORY", 85, y);
  doc.text("SKU", 135, y);
  doc.text("STOCK", 175, y);
  doc.text("PKTS/BOX", 205, y);
  doc.text("PRICE/BOX", 237, y);
  doc.text("STOCK VALUE", 265, y);

  y += 5;

  // Table Rows
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(30, 41, 59); // slate-800
  
  rows.forEach((row, index) => {
    if (y > 185) {
      doc.addPage();
      y = 20;
    }
    
    // Alternate row background
    if (index % 2 === 0) {
      doc.setFillColor(248, 250, 252); // slate-50
      doc.rect(14, y - 4, 271, 7, "F");
    }
    
    doc.text(String(row.name).substring(0, 28), 16, y);
    doc.text(String(row.category || "-").substring(0, 18), 85, y);
    doc.text(String(row.sku || "-").substring(0, 15), 135, y);
    
    // Stock with low stock warning
    const stock = row.stock || 0;
    if (stock <= 5) {
      doc.setTextColor(220, 38, 38); // red-600
      doc.setFont("helvetica", "bold");
    }
    doc.text(String(stock), 175, y);
    doc.setTextColor(30, 41, 59);
    doc.setFont("helvetica", "normal");
    
    doc.text(String(row.smallPacketsPerBox || "0"), 205, y);
    doc.text(formatPDFCurrency(row.sellingPricePerBox || 0), 237, y);
    
    // Stock value in blue
    doc.setTextColor(37, 99, 235); // blue-600
    doc.setFont("helvetica", "bold");
    doc.text(formatPDFCurrency(row.stockValue || 0), 265, y);
    
    doc.setTextColor(30, 41, 59);
    doc.setFont("helvetica", "normal");
    
    y += 7;
  });

  // Footer Summary
  if (rows.length > 0) {
    y += 3;
    doc.setDrawColor(226, 232, 240); // slate-200
    doc.setLineWidth(0.5);
    doc.line(14, y, 285, y);
    y += 8;
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    const totalValue = rows.reduce((sum, row) => sum + (row.stockValue || 0), 0);
    const totalStock = rows.reduce((sum, row) => sum + (row.stock || 0), 0);
    const lowStock = rows.filter(row => (row.stock || 0) <= 5).length;
    
    doc.setTextColor(59, 130, 246); // blue-500
    doc.text(`Total Stock: ${totalStock} boxes`, 14, y);
    doc.text(`Total Value: ${formatPDFCurrency(totalValue)}`, 90, y);
    
    if (lowStock > 0) {
      doc.setTextColor(220, 38, 38); // red-600
      doc.text(`Low Stock Items: ${lowStock}`, 190, y);
    }
  }

  doc.save("inventory-report.pdf");
}

export function generatePurchaseReport(rows = []) {
  const doc = new jsPDF({ orientation: "landscape" });
  
  // Header
  doc.setFillColor(168, 85, 247); // purple-500
  doc.rect(0, 0, 297, 25, "F");
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(255, 255, 255);
  doc.text("Purchase History Report", 14, 12);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(250, 245, 255); // purple-50
  doc.text(`Generated: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`, 14, 19);

  // Table Header
  let y = 35;
  doc.setFillColor(241, 245, 249); // slate-100
  doc.rect(14, y - 5, 271, 8, "F");
  
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85); // slate-700
  doc.text("DATE", 16, y);
  doc.text("ITEM NAME", 45, y);
  doc.text("CATEGORY", 105, y);
  doc.text("QTY", 145, y);
  doc.text("TOTAL COST", 165, y);
  doc.text("COST/BOX", 203, y);
  doc.text("SALE/BOX", 235, y);
  doc.text("PROFIT", 265, y);

  y += 5;

  // Table Rows
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(30, 41, 59); // slate-800
  
  rows.forEach((row, index) => {
    if (y > 185) {
      doc.addPage();
      y = 20;
    }
    
    // Alternate row background
    if (index % 2 === 0) {
      doc.setFillColor(248, 250, 252); // slate-50
      doc.rect(14, y - 4, 271, 7, "F");
    }
    
    doc.text(String(row.date || "-").substring(0, 10), 16, y);
    doc.text(String(row.itemName).substring(0, 22), 45, y);
    doc.text(String(row.category || "-").substring(0, 15), 105, y);
    doc.text(String(row.quantity || "0"), 145, y);
    doc.text(formatPDFCurrency(row.totalCost || 0), 165, y);
    doc.text(formatPDFCurrency(row.perBoxCost || 0), 203, y);
    doc.text(formatPDFCurrency(row.sellingPricePerBox || 0), 235, y);
    
    // Profit with margin percentage
    const profit = row.profitPerBox || 0;
    const margin = row.profitMargin || 0;
    doc.setTextColor(profit >= 0 ? 22 : 220, profit >= 0 ? 163 : 38, profit >= 0 ? 74 : 38); // green-600 or red-600
    doc.setFont("helvetica", "bold");
    doc.text(`${formatPDFCurrency(profit)} (${margin}%)`, 265, y);
    
    doc.setTextColor(30, 41, 59);
    doc.setFont("helvetica", "normal");
    
    y += 7;
  });

  // Footer Summary
  if (rows.length > 0) {
    y += 3;
    doc.setDrawColor(226, 232, 240); // slate-200
    doc.setLineWidth(0.5);
    doc.line(14, y, 285, y);
    y += 8;
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    const totalCost = rows.reduce((sum, row) => sum + (row.totalCost || 0), 0);
    const totalProfit = rows.reduce((sum, row) => sum + (row.totalProfit || 0), 0);
    const avgMargin = rows.length > 0 ? 
      Math.round(rows.reduce((sum, row) => sum + (row.profitMargin || 0), 0) / rows.length) : 0;
    
    doc.setTextColor(168, 85, 247); // purple-500
    doc.text(`Total Cost: ${formatPDFCurrency(totalCost)}`, 14, y);
    doc.setTextColor(22, 163, 74); // green-600
    doc.text(`Total Profit: ${formatPDFCurrency(totalProfit)}`, 110, y);
    doc.setTextColor(100, 116, 139); // slate-500
    doc.text(`Avg. Margin: ${avgMargin}%`, 210, y);
  }

  doc.save("purchase-report.pdf");
}
