import React from 'react';
import {
  IconButton, TableBody, TableCell, TableRow,
} from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import AvatarImg from '../../../../shared/components/avatar-img';
import User from '../../../../models/user';
import { SortDirection } from '../../../../interfaces';
import { EmptyRows } from '../../../../shared/components';
import usersTableService from '../../services/users-table-service';
import tableHelper from '../../../../shared/utils/table-helper';
import getUserRoleText from '../../../../shared/utils/user/get-user-role-text';
import useTableContext from '../../../../context/table/context';
import getFormattedPhone from '../../../../shared/utils/get-formatted-phone';

interface Props {
  users: User[];
  sortDirection: SortDirection,
  orderByKey: keyof User;
  page: number,
  onUpdateUser: (user: User) => void;
}

export default function UsersTableBody({
  users, sortDirection, orderByKey, page, onUpdateUser,
}: Props) {
  const { defaultRowsPerPage } = useTableContext();

  return (
    <TableBody>
      {tableHelper.getTablePageRecords(users, page, defaultRowsPerPage, sortDirection, orderByKey)
        .map((user, index) => {
          const labelId = `users-table-${index}`;

          return (
            <TableRow
              hover
              tabIndex={-1}
              key={user.userId}
            >
              <TableCell id={labelId} align="center">
                {user.userId}
              </TableCell>
              <TableCell align="center">
                <AvatarImg name={user.name} size={30} />
              </TableCell>
              <TableCell align="center">
                {tableHelper.getLimitedCellTextContent(user.name)}
              </TableCell>
              <TableCell align="center">
                <p className="text-purple-main font-medium">
                  {getUserRoleText(user.role)}
                </p>
              </TableCell>
              <TableCell align="center">
                {tableHelper.getLimitedCellTextContent(user.email)}
              </TableCell>
              <TableCell align="center">
                {user.phone && getFormattedPhone(user.phone)}
              </TableCell>
              <TableCell align="center">
                {!user.active
                        && (
                          <p className="text-yellow-main font-medium">
                            Inativo
                          </p>
                        )}
                {user.active
                        && (
                          <p className="text-green-main font-medium">
                            Ativo
                          </p>
                        )}
              </TableCell>
              <TableCell align="center">
                <IconButton onClick={() => onUpdateUser(user)}>
                  <CreateIcon color="primary" />
                </IconButton>
              </TableCell>
            </TableRow>
          );
        })}

      <EmptyRows
        page={page}
        recordsAmount={users.length}
        columnsAmount={usersTableService.columnsAmount}
      />
    </TableBody>
  );
}
