
import * as XLSX from 'xlsx';
import { Delegate } from '@/types/delegate';

export const exportDelegatesToExcel = (delegates: Delegate[], filename: string = 'delegates') => {
  // Prepare data for Excel
  const excelData = delegates.map(delegate => ({
    'Contact Name': delegate.contactName,
    'Contact Type': delegate.contactType === 'individual' ? 'Individual' : 'Organization',
    'Membership Type': delegate.membershipType === 'delegate' ? 'Delegate' : 'Member State',
    'Member State': delegate.memberState || 'N/A',
    'Start Date': delegate.startDate,
    'End Date': delegate.endDate || 'Active',
    'Status': delegate.isActive ? 'Active' : 'Inactive',
    'Newsletter Subscribed': delegate.isNewsletterSubscribed ? 'Yes' : 'No'
  }));

  // Create workbook and worksheet
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(excelData);

  // Set column widths
  const columnWidths = [
    { wch: 25 }, // Contact Name
    { wch: 15 }, // Contact Type
    { wch: 15 }, // Membership Type
    { wch: 15 }, // Member State
    { wch: 12 }, // Start Date
    { wch: 12 }, // End Date
    { wch: 10 }, // Status
    { wch: 18 }  // Newsletter Subscribed
  ];
  worksheet['!cols'] = columnWidths;

  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Delegates');

  // Generate filename with timestamp
  const timestamp = new Date().toISOString().split('T')[0];
  const fullFilename = `${filename}_${timestamp}.xlsx`;

  // Save file
  XLSX.writeFile(workbook, fullFilename);
};
