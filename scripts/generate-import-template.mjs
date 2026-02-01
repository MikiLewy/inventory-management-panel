import * as XLSX from 'xlsx';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Sample data
const data = [
  {
    name: 'Nike Air Max 90',
    sku: 'SKU-001',
    size: '42',
    purchasePrice: 150.00,
    purchaseDate: '2024-01-15',
    status: 'IN_STOCK',
    brand: 'Nike',
    category: 'Sneakers',
    purchasePlace: 'StockX',
    sizeUnit: 'EU',
    warehouse: 'Main Warehouse',
  },
  {
    name: 'Adidas Ultraboost',
    sku: 'SKU-002',
    size: '10.5',
    purchasePrice: 180.00,
    purchaseDate: '2024-02-20',
    status: 'IN_DELIVERY',
    brand: 'Adidas',
    category: 'Sneakers',
    purchasePlace: 'GOAT',
    sizeUnit: 'US',
    warehouse: 'Main Warehouse',
  },
];

// Create workbook and worksheet
const workbook = XLSX.utils.book_new();
const worksheet = XLSX.utils.json_to_sheet(data);

// Set column widths
worksheet['!cols'] = [
  { wch: 20 }, // name
  { wch: 12 }, // sku
  { wch: 8 },  // size
  { wch: 14 }, // purchasePrice
  { wch: 14 }, // purchaseDate
  { wch: 12 }, // status
  { wch: 12 }, // brand
  { wch: 12 }, // category
  { wch: 14 }, // purchasePlace
  { wch: 10 }, // sizeUnit
  { wch: 16 }, // warehouse
];

// Add data validations for dropdown columns
// Note: xlsx library has limited support for data validation
// For full dropdown support, you might need to use a different library like exceljs

XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');

// Write to file
const outputPath = join(__dirname, '..', 'public', 'templates', 'product-import-template.xlsx');
XLSX.writeFile(workbook, outputPath);

console.log(`Template generated at: ${outputPath}`);
