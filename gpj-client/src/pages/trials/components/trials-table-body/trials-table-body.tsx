import React from 'react';
import { TableBody, TableCell, TableRow } from '@mui/material';
import AvatarImg from '../../../../shared/components/avatar-img';
import { EmptyRows } from '../../../../shared/components';
import tableHelper from '../../../../shared/utils/table-helper';
import useTableContext from '../../../../context/table/context';
import { Trial } from '../../../../models';
import getTaskTypeLabel from '../../../../shared/utils/get-task-type-label';
import trialsTableService from '../../services/trials-table-service';
import getTrialSideLabel from '../../../../shared/utils/get-trial-side-label';
import TrialsStatusLabel from '../trials-status-label/trials-status-label';
import trialsTableBodyService from '../../services/trials-table-body-service';
import DeadlineDate from '../deadline-date/deadline-date';
import formatTrialNumber from '../../../../shared/utils/trial/format-trial-number';

interface Props {
  trials: Trial[];
  page: number,
  onSelectTrial: (trial: Trial) => void,
}

export default function TrialsTableBody({
  trials, page, onSelectTrial,
}: Props) {
  const { defaultRowsPerPage } = useTableContext();

  return (
    <TableBody>
      {tableHelper.getTablePageRecords(trials, page, defaultRowsPerPage)
        .map((trial, index) => {
          const labelId = `trials-table-${index}`;

          return (
            <TableRow
              hover
              tabIndex={-1}
              key={trial.trialId}
              sx={{
                backgroundColor: trialsTableBodyService.isTrialPastDue(trial) ? 'rgba(255, 0, 0, 0.05)' : 'inherit',
              }}
              onClick={() => { onSelectTrial(trial); }}
            >
              <TableCell id={labelId} align="center">
                {trial.trialId}
              </TableCell>
              <TableCell align="center">
                <AvatarImg name={trial.user.name} size={30} />
              </TableCell>
              <TableCell align="center">
                <DeadlineDate deadline={trial.deadline} isLate={trialsTableBodyService.isTrialPastDue(trial)} />
              </TableCell>
              <TableCell align="center">
                <TrialsStatusLabel status={trial.status} />
              </TableCell>
              <TableCell align="center">
                <p className="text-purple-main font-medium">
                  {tableHelper.getLimitedCellTextContent(getTaskTypeLabel(trial.taskType))}
                </p>
              </TableCell>
              <TableCell align="center">
                {trial.office?.name && tableHelper.getLimitedCellTextContent(trial.office.name)}
              </TableCell>
              <TableCell align="center">
                {trial.lawyer && tableHelper.getLimitedCellTextContent(trial.lawyer)}
              </TableCell>
              <TableCell align="center">
                {tableHelper.getLimitedCellTextContent(trial.client.name)}
              </TableCell>
              <TableCell align="center">
                <p className="font-bold">
                  {trial.region}
                </p>
              </TableCell>
              <TableCell align="center">
                {trial.trialType}
              </TableCell>
              <TableCell align="center">
                {trial.trialNumber && formatTrialNumber(trial.trialNumber.toString())}
              </TableCell>
              <TableCell align="center">
                {trial.side && getTrialSideLabel(trial.side)}
              </TableCell>
              <TableCell align="center">
                {trial.plaintiff && tableHelper.getLimitedCellTextContent(trial.plaintiff)}
              </TableCell>
              <TableCell align="center">
                {trial.defendant && tableHelper.getLimitedCellTextContent(trial.defendant)}
              </TableCell>
              <TableCell align="center">
                {trial.privateAnnotations && tableHelper.getLimitedCellTextContent(trial.privateAnnotations)}
              </TableCell>
              <TableCell align="center">
                {trial.publicAnnotations && tableHelper.getLimitedCellTextContent(trial.publicAnnotations)}
              </TableCell>
            </TableRow>
          );
        })}

      <EmptyRows
        page={page}
        recordsAmount={trials.length}
        columnsAmount={trialsTableService.columnsAmount}
      />
    </TableBody>
  );
}
