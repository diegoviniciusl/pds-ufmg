import { FromSchema } from 'json-schema-to-ts';
import { Prisma, TrialStatus } from '@prisma/client';
import { getTrialsQuerySchema } from '../../schemas/trial/get-trials';
import { getCurrentDate, getEndOfDay, getStartOfDay } from '../../utils/date-helper';
import TrialOrderableColumn from '../../types/enums/trial-orderable-column';
import { includeForExtendedTrialQuery, parseExtendedTrial } from '../../utils/trial/extended-trial-helper';
import Repository from '../../types/respository';

const TRIALS_LIMIT = 500;

const getWhere = (query: FromSchema<typeof getTrialsQuerySchema>) => ({
  status: query.status,
  taskType: query.taskType,
  clientId: query.clientId,
  officeId: query.officeId,
  createdAt: {
    gte: query.fromCreatedAt && getStartOfDay(new Date(query.fromCreatedAt as string)),
    lte: query.toCreatedAt && getEndOfDay(new Date(query.toCreatedAt as string)),
  },
  AND: [{
    deadline: {
      gte: query.fromDeadline && getStartOfDay(new Date(query.fromDeadline as string)),
      lte: query.toDeadline && getEndOfDay(new Date(query.toDeadline as string)),
    },
  },
  ...query.pastDue === 'true' ? [{
    deadline: {
      lt: getCurrentDate(),
    },
    NOT: {
      status: TrialStatus.SENT,
    },
  }] : []],
  ...query.search ? {
    OR: [
      {
        trialId: query.search && query.search.length <= 10 ? Number(query.search) : undefined,
      },
      {
        trialNumber: query.search?.replaceAll('.', '').replaceAll('-', ''),
      },
    ],
  } : {},
});

const getOrderBy = (query: FromSchema<typeof getTrialsQuerySchema>) => {
  const direction = query.orderByDirection || Prisma.SortOrder.asc;
  const secondaryOrderBy = {
    deadline: Prisma.SortOrder.asc,
  };

  if (!query.orderByColumn) {
    return [
      {
        [TrialOrderableColumn.STATUS]: direction,
      },
      secondaryOrderBy,
    ];
  }

  if (query.orderByColumn === TrialOrderableColumn.CLIENT) {
    return [
      {
        client: {
          name: direction,
        },
      },
      secondaryOrderBy,
    ];
  }

  if (query.orderByColumn === TrialOrderableColumn.OFFICE) {
    return [
      {
        office: {
          name: direction,
        },
      },
      secondaryOrderBy,
    ];
  }

  return [
    {
      [query.orderByColumn]: direction,
    },
    secondaryOrderBy,
  ];
};

const getTrials = (repository: Repository) => {
  return async (req: any, rep: any) => {
    const { query } = req;

    const trials = await repository.trial.findMany({
      include: includeForExtendedTrialQuery,
      where: getWhere(query),
      orderBy: getOrderBy(query),
      take: TRIALS_LIMIT,
    });

    const extendedTrials = trials.map(parseExtendedTrial);

    return rep.status(200).send(extendedTrials);
  }
} 

export default getTrials;
