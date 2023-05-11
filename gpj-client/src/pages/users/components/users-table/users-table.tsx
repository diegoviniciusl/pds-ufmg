import React from 'react';
import {
  Paper, Table, TableContainer,
} from '@mui/material';
import User from '../../../../models/user';
import { SortDirection } from '../../../../interfaces';
import { TableBodySkeleton, TableHeader, TablePagination } from '../../../../shared/components';
import usersTableService from '../../services/users-table-service';
import UsersTableBody from '../user-table-body/user-table-body';

interface Props {
  users: User[];
  loadingUsers: boolean;
  onUpdateUser: (user: User) => void;
}

export default function UserTable({ users, loadingUsers, onUpdateUser }: Props) {
  const [sortDirection, setSortDirection] = React.useState<SortDirection>('asc');
  const [orderByKey, setOrderByKey] = React.useState<keyof User>('name');
  const [page, setPage] = React.useState(0);

  return (
    <Paper>
      <TableContainer style={{ tableLayout: 'fixed' }}>
        <Table
          classes={{ root: 'w-full' }}
          size="medium"
        >
          <TableHeader<User>
            headerCells={usersTableService.headerCells}
            sortDirection={sortDirection}
            orderByKey={orderByKey}
            setOrderByKey={setOrderByKey}
            setSortDirection={setSortDirection}
          />

          {!loadingUsers && (
            <UsersTableBody
              users={users}
              page={page}
              sortDirection={sortDirection}
              orderByKey={orderByKey}
              onUpdateUser={onUpdateUser}
            />
          )}

          {loadingUsers && (
            <TableBodySkeleton
              columnsAmount={usersTableService.columnsAmount}
            />
          )}
        </Table>
      </TableContainer>
      <TablePagination
        recordsAmount={users.length}
        page={page}
        setPage={setPage}
      />
    </Paper>
  );
}
