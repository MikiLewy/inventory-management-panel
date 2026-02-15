import * as XLSX from 'xlsx';

export interface ExportRow {
  [key: string]: string | number | undefined;
}

export interface ExportColumn {
  key: string;
  header: string;
  width?: number;
}

export type ExportFormat = 'csv' | 'xlsx';

export function generateExportFile(rows: ExportRow[], columns: ExportColumn[], format: ExportFormat): Buffer {
  const formattedRows = rows.map(row => {
    const formatted: Record<string, string | number | undefined> = {};
    columns.forEach(col => {
      formatted[col.header] = row[col.key];
    });
    return formatted;
  });

  const worksheet = XLSX.utils.json_to_sheet(formattedRows);

  worksheet['!cols'] = columns.map(col => ({
    wch: col.width || 15,
  }));

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');

  if (format === 'csv') {
    const csvContent = XLSX.utils.sheet_to_csv(worksheet);
    const bom = '\uFEFF';

    return Buffer.from(bom + csvContent, 'utf-8');
  } else {
    return Buffer.from(XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' }));
  }
}

export function triggerDownload(base64Data: string, filename: string, mimeType: string): void {
  const byteCharacters = atob(base64Data);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: mimeType });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;

  document.body.appendChild(link);
  link.click();

  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function generateExportFilename(prefix: string, format: ExportFormat): string {
  const date = new Date().toISOString().split('T')[0];

  return `${prefix}-export-${date}.${format}`;
}

export function getExportMimeType(format: ExportFormat): string {
  return format === 'csv'
    ? 'text/csv;charset=utf-8'
    : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
}
