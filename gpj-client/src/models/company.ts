interface Company {
  companyId: number;
  name: string;
  email: string | null;
  phone: string | null;
  taxNumber: string | null;
  notes: string | null;
  receiptDescription: string | null;
}

export default Company;
