# CSV Import Instructions for Shopelp Inventory

## How to Import Items via CSV

1. **Download the Template**
   - Click the "⬇️ Download Template" button on the Inventory page
   - This will download `inventory-template.csv` with sample data

2. **Edit the CSV File**
   - Open the file in Excel, Google Sheets, or any spreadsheet software
   - Keep the header row (first row) unchanged
   - Fill in your inventory data starting from row 2

3. **Upload the CSV**
   - Click the "📁 Import CSV" button
   - Select your edited CSV file
   - Wait for the import to complete
   - Review the import results

## CSV Format

The CSV file must have the following columns in this order:

| Column Name | Required | Description | Example |
|-------------|----------|-------------|---------|
| **name** | Yes | Item name | Bada Kamla Pasand |
| **category** | Yes | Category name | Pan Masala |
| **description** | No | Item description | Premium pan masala |
| **stock** | No | Number of boxes | 10 |
| **smallPacketsPerBox** | Yes | Packets per box | 39 |
| **sellingPricePerSmallPacket** | Yes | Price per packet | 6 |
| **unit** | No | Unit of measurement (default: box) | box |

## Example CSV Content

```csv
name,category,description,stock,smallPacketsPerBox,sellingPricePerSmallPacket,unit
Bada Kamla Pasand,Pan Masala,Premium pan masala,10,39,6,box
Chota Kamla Pasand,Pan Masala,Small pack pan masala,15,60,4,box
Badi Rajshree,Pan Masala,Large rajshree pack,8,30,6,box
```

## Important Notes

### ✅ Do's
- Keep the header row exactly as provided
- Use commas (,) as separators
- Ensure required fields are filled
- Use numbers only for numeric fields (stock, smallPacketsPerBox, sellingPricePerSmallPacket)
- Create categories beforehand or use existing ones

### ❌ Don'ts
- Don't use commas within field values (use semicolons if needed)
- Don't leave required fields empty
- Don't use special characters in numbers
- Don't modify the header names
- Don't include duplicate item names in same category

## Field Details

### Required Fields

1. **name**: The display name of the item
   - Must be unique within the same category
   - Example: "Bada Kamla Pasand"

2. **category**: The category name
   - Must match existing categories or will be created
   - Example: "Pan Masala", "Snacks", "Beverages"

3. **smallPacketsPerBox**: Number of small packets in one box
   - Must be a positive number
   - Example: 39, 60, 30

4. **sellingPricePerSmallPacket**: Price per small packet
   - Must be a positive number
   - Example: 6, 4, 5.5

### Optional Fields

1. **description**: Additional details about the item
   - Can be left empty
   - Example: "Premium quality pan masala"

2. **stock**: Initial stock quantity (in boxes)
   - Defaults to 0 if not provided
   - Example: 10, 15, 20

3. **unit**: Unit of measurement
   - Defaults to "box" if not provided
   - Example: box, packet, kg, liter

## Troubleshooting

### Import Failures

If some items fail to import, check:

1. **Missing Required Fields**: Ensure name and category are filled
2. **Duplicate Items**: Item with same name in category already exists
3. **Invalid Numbers**: Check that numeric fields contain only numbers
4. **Format Issues**: Ensure CSV is properly formatted with commas

### Success Tips

- Start with small batches (5-10 items) to test
- Verify categories exist before importing
- Use the template as a reference
- Check the import results carefully
- Items that fail won't be imported, others will succeed

## After Import

After successful import:
- Items will appear in your inventory list
- SKU codes will be auto-generated
- You can edit items individually if needed
- Stock levels can be updated via purchases

## Support

If you encounter any issues with CSV import, please check:
1. CSV file format is correct
2. All required fields are filled
3. Categories exist in the system
4. No special characters in numeric fields

---

**Template Location**: `/public/inventory-template.csv`
**Format**: UTF-8 encoded CSV with comma separator
