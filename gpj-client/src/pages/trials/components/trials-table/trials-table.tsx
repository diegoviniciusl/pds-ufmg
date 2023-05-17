import React from 'react';
import {
  Paper, Table, TableContainer,
} from '@mui/material';
import { SortDirection } from '../../../../interfaces';
import { TableBodySkeleton, TableHeader, TablePagination } from '../../../../shared/components';
import TrialsTableBody from '../trials-table-body/trials-table-body';
import { Trial } from '../../../../models';
import trialsTableService from '../../services/trials-table-service';

interface Props {
  trials: Trial[];
  loadingTrials: boolean;
  onSelectTrial: (trial: Trial) => void;
  sortDirection: SortDirection;
  setSortDirection: (sortDirection: SortDirection) => void;
  orderByKey: keyof Trial;
  setOrderByKey: (orderByKey: keyof Trial) => void;
}

export default function TrialsTable({
  trials, loadingTrials, onSelectTrial, sortDirection, orderByKey, setSortDirection, setOrderByKey,
}: Props) {
  const [page, setPage] = React.useState(0);

  return (
    <Paper>
      <TableContainer style={{ tableLayout: 'fixed' }}>
        <Table
          classes={{ root: 'max-w-full whitespace-nowrap' }}
          size="medium"
        >
          <TableHeader<Trial>
            headerCells={trialsTableService.headerCells}
            sortDirection={sortDirection}
            orderByKey={orderByKey}
            setOrderByKey={setOrderByKey}
            setSortDirection={setSortDirection}
          />

          {!loadingTrials && (
            <TrialsTableBody
              trials={trials}
              page={page}
              onSelectTrial={onSelectTrial}
            />
          )}

          {loadingTrials && (
            <TableBodySkeleton
              columnsAmount={trialsTableService.columnsAmount}
            />
          )}
        </Table>
      </TableContainer>
      <TablePagination
        recordsAmount={trials.length}
        page={page}
        setPage={setPage}
      />
    </Paper>
  );
}
