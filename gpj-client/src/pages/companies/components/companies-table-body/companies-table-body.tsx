import React from 'react';
import {
  IconButton, TableBody, TableCell, TableRow,
} from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import { SortDirection } from '../../../../interfaces';
import { EmptyRows } from '../../../../shared/components';
import tableHelper from '../../../../shared/utils/table-helper';
import Company from '../../../../models/company';
import companiesTableService from '../../services/companies-table-service';
import useTableContext from '../../../../context/table/context';
import getFormattedPhone from '../../../../shared/utils/get-formatted-phone';
import getFormattedTaxValue from '../../../../shared/utils/company/get-formatted-tax-number';

interface Props {
  companies: Company[];
  sortDirection: SortDirection,
  orderByKey: keyof Company;
  page: number,
  onUpdateCompany: (company: Company) => void;
}

export default function CompaniesTableBody({
  companies, sortDirection, orderByKey, page, onUpdateCompany,
}: Props) {
  const { defaultRowsPerPage } = useTableContext();
  return (
    <TableBody>
      {tableHelper.getTablePageRecords(companies, page, defaultRowsPerPage, sortDirection, orderByKey)
        .map((company, index) => {
          const labelId = `companies-table-${index}`;

          return (
            <TableRow
              hover
              tabIndex={-1}
              key={company.companyId}
            >
              <TableCell id={labelId} align="center">
                {company.companyId}
              </TableCell>
              <TableCell align="left">
                {tableHelper.getLimitedCellTextContent(company.name)}
              </TableCell>
              <TableCell align="left">
                {company.email && tableHelper.getLimitedCellTextContent(company.email)}
              </TableCell>
              <TableCell align="left">
                {company.phone && getFormattedPhone(company.phone)}
              </TableCell>
              <TableCell align="left">
                {company.taxNumber && getFormattedTaxValue(company.taxNumber)}
              </TableCell>
              <TableCell align="center">
                <IconButton onClick={() => onUpdateCompany(company)}>
                  <CreateIcon color="primary" />
                </IconButton>
              </TableCell>
            </TableRow>
          );
        })}

      <EmptyRows
        page={page}
        recordsAmount={companies.length}
        columnsAmount={companiesTableService.columnsAmount}
      />
    </TableBody>
  );
}
