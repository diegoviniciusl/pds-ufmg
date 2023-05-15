import React from 'react';
import {
  Paper, Table, TableContainer,
} from '@mui/material';
import { SortDirection } from '../../../../interfaces';
import { TableBodySkeleton, TableHeader, TablePagination } from '../../../../shared/components';
import Company from '../../../../models/company';
import companiesTableService from '../../services/companies-table-service';
import CompaniesTableBody from '../companies-table-body/companies-table-body';

interface Props {
  companies: Company[];
  loadingCompanies: boolean;
  onUpdateCompany: (company: Company) => void;
}

export default function CompanyTable({ companies, loadingCompanies, onUpdateCompany }: Props) {
  const [sortDirection, setSortDirection] = React.useState<SortDirection>('asc');
  const [orderByKey, setOrderByKey] = React.useState<keyof Company>('name');
  const [page, setPage] = React.useState(0);

  return (
    <Paper>
      <TableContainer style={{ tableLayout: 'fixed' }}>
        <Table
          classes={{ root: 'max-w-full whitespace-nowrap' }}
          size="medium"
        >
          <TableHeader<Company>
            headerCells={companiesTableService.headerCells}
            sortDirection={sortDirection}
            orderByKey={orderByKey}
            setOrderByKey={setOrderByKey}
            setSortDirection={setSortDirection}
          />

          {!loadingCompanies && (
            <CompaniesTableBody
              companies={companies}
              page={page}
              sortDirection={sortDirection}
              orderByKey={orderByKey}
              onUpdateCompany={onUpdateCompany}
            />
          )}

          {loadingCompanies && (
            <TableBodySkeleton
              columnsAmount={companiesTableService.columnsAmount}
            />
          )}
        </Table>
      </TableContainer>
      <TablePagination
        recordsAmount={companies.length}
        page={page}
        setPage={setPage}
      />
    </Paper>
  );
}
