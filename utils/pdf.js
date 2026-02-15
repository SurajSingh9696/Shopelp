import jsPDF from "jspdf";
import { getCurrencySymbol } from "./currency";

export function generateProfitReport(rows = []) {
  const currencySymbol = getCurrencySymbol();
  const doc = new jsPDF({ orientation: "landscape" });
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Profit Margin Report", 14, 15);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`Generated: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`, 14, 22);

  let y = 35;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("Item", 14, y);
  doc.text("Category", 70, y);
  doc.text("Pkts/Box", 105, y);
  doc.text("Price/Pkt", 130, y);
  doc.text("Cost/Box", 160, y);
  doc.text("Sale/Box", 190, y);
  doc.text("Profit", 220, y);
  doc.text("Margin%", 245, y);
  doc.text("Stock", 270, y);

  y += 2;
  doc.line(14, y, 285, y);
  y += 6;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  
  rows.forEach((row) => {
    if (y > 190) {
      doc.addPage();
      y = 20;
    }
    
    doc.text(String(row.name).substring(0, 20), 14, y);
    doc.text(String(row.category || ""), 70, y);
    doc.text(String(row.smallPacketsPerBox || ""), 105, y);
    doc.text(`${currencySymbol}${(row.sellingPricePerSmallPacket || 0).toFixed(2)}`, 130, y);
    doc.text(`${currencySymbol}${(row.costPerBox || 0).toFixed(2)}`, 160, y);
    doc.text(`${currencySymbol}${(row.sellingPricePerBox || 0).toFixed(2)}`, 190, y);
    doc.text(`${currencySymbol}${(row.profitPerBox || 0).toFixed(2)}`, 220, y);
    doc.text(`${row.margin || 0}%`, 245, y);
    doc.text(String(row.stock || 0), 270, y);
    y += 7;
  });

  if (rows.length > 0) {
    y += 5;
    doc.line(14, y, 285, y);
    y += 6;
    doc.setFont("helvetica", "bold");
    const totalProfit = rows.reduce((sum, row) => sum + (row.totalProfit || 0), 0);
    doc.text(`Total Estimated Profit: ${currencySymbol}${totalProfit.toFixed(2)}`, 14, y);
  }

  doc.save("profit-report.pdf");
}

export function generateInventoryReport(rows = []) {
  const currencySymbol = getCurrencySymbol();
  const doc = new jsPDF({ orientation: "landscape" });
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Inventory Report", 14, 15);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`Generated: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`, 14, 22);

  let y = 35;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("Item Name", 14, y);
  doc.text("Category", 80, y);
  doc.text("SKU", 130, y);
  doc.text("Stock", 170, y);
  doc.text("Pkts/Box", 195, y);
  doc.text("Price/Box", 225, y);
  doc.text("Stock Value", 260, y);

  y += 2;
  doc.line(14, y, 285, y);
  y += 6;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  
  rows.forEach((row) => {
    if (y > 190) {
      doc.addPage();
      y = 20;
    }
    
    doc.text(String(row.name).substring(0, 25), 14, y);
    doc.text(String(row.category || ""), 80, y);
    doc.text(String(row.sku || ""), 130, y);
    doc.text(String(row.stock || 0), 170, y);
    doc.text(String(row.smallPacketsPerBox || 0), 195, y);
    doc.text(`${currencySymbol}${(row.sellingPricePerBox || 0).toFixed(2)}`, 225, y);
    doc.text(`${currencySymbol}${(row.stockValue || 0).toFixed(2)}`, 260, y);
    y += 7;
  });

  if (rows.length > 0) {
    y += 5;
    doc.line(14, y, 285, y);
    y += 6;
    doc.setFont("helvetica", "bold");
    const totalValue = rows.reduce((sum, row) => sum + (row.stockValue || 0), 0);
    const totalStock = rows.reduce((sum, row) => sum + (row.stock || 0), 0);
    doc.text(`Total Stock: ${totalStock} boxes | Total Value: ${currencySymbol}${totalValue.toFixed(2)}`, 14, y);
  }

  doc.save("inventory-report.pdf");
}

export function generatePurchaseReport(rows = []) {
  const currencySymbol = getCurrencySymbol();
  const doc = new jsPDF({ orientation: "landscape" });
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Purchase History Report", 14, 15);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`Generated: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`, 14, 22);

  let y = 35;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("Date", 14, y);
  doc.text("Item", 40, y);
  doc.text("Category", 95, y);
  doc.text("Qty", 130, y);
  doc.text("Total Cost", 150, y);
  doc.text("Cost/Box", 185, y);
  doc.text("Sale/Box", 215, y);
  doc.text("Profit/Box", 245, y);
  doc.text("Margin%", 270, y);

  y += 2;
  doc.line(14, y, 285, y);
  y += 6;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  
  rows.forEach((row) => {
    if (y > 190) {
      doc.addPage();
      y = 20;
    }
    
    doc.text(String(row.date || ""), 14, y);
    doc.text(String(row.itemName).substring(0, 18), 40, y);
    doc.text(String(row.category || ""), 95, y);
    doc.text(String(row.quantity || 0), 130, y);
    doc.text(`${currencySymbol}${(row.totalCost || 0).toFixed(2)}`, 150, y);
    doc.text(`${currencySymbol}${(row.perBoxCost || 0).toFixed(2)}`, 185, y);
    doc.text(`${currencySymbol}${(row.sellingPricePerBox || 0).toFixed(2)}`, 215, y);
    doc.text(`${currencySymbol}${(row.profitPerBox || 0).toFixed(2)}`, 245, y);
    doc.text(`${(row.profitMargin || 0)}%`, 270, y);
    y += 7;
  });

  if (rows.length > 0) {
    y += 5;
    doc.line(14, y, 285, y);
    y += 6;
    doc.setFont("helvetica", "bold");
    const totalCost = rows.reduce((sum, row) => sum + (row.totalCost || 0), 0);
    const totalProfit = rows.reduce((sum, row) => sum + (row.totalProfit || 0), 0);
    doc.text(`Total Cost: ${currencySymbol}${totalCost.toFixed(2)} | Total Profit: ${currencySymbol}${totalProfit.toFixed(2)}`, 14, y);
  }

  doc.save("purchase-report.pdf");
}
