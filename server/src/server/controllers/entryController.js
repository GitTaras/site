import { Entries, Customers, Contests, Banks, sequelize } from '../models';
import NotFoundError from '../utils/errors/NotFound';
import BadReqError from '../utils/errors/BadReqError';
import { findAllEntries, moneyTransfer, convertingData } from './helperController';
import { squadhelpCard } from '../utils/constants';

module.exports.toggleFavoriteEntry = async (req, res, next) => {
  try {
    const { id } = req.body;
    const [amountUpdatedRows, [entry]] = await Entries.update(
      { favorite: sequelize.literal(['NOT favorite']) },
      {
        where: { id },
        returning: true,
      },
    );
    if (amountUpdatedRows === 0) {
      return next(new NotFoundError());
    }
    res.send(entry);
  } catch (err) {
    next(new NotFoundError());
  }
};

module.exports.getEntriesByCondition = async (req, res, next) => {
  try {
    const { field, param, contestId } = req.body;
    let entries;
    const condition = { [field]: param };
    if (contestId) {
      condition.contest = contestId;
    }
    entries = await findAllEntries(condition);
    res.send(entries);
  } catch (err) {
    next(new NotFoundError());
  }
};

module.exports.setRejectStatus = async (req, res, next) => {
  try {
    const { idEntry } = req.body;
    const [amountUpdatedRows, [entry]] = await Entries.update(
      { accept: false },
      {
        where: { id: idEntry },
        returning: true,
      },
    );
    if (amountUpdatedRows === 0) {
      return next(new NotFoundError());
    }
    res.send(entry);
  } catch (err) {
    next(new NotFoundError());
  }
};

module.exports.setAcceptStatus = async (req, res, next) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();
    const { idEntry } = req.body;
    const { id } = req.params; // id contest
    await Entries.update(
      { accept: sequelize.literal(`CASE WHEN id = ${idEntry} THEN true ELSE false END`) },
      {
        where: { contest: id },
        transaction,
      },
    );
    let [, [contest]] = await Contests.update(
      {
        winner_id: sequelize.literal(`(SELECT "user" FROM "Entries" WHERE "accept" = true AND "contest" = ${id})`),
        isActive: false,
      },
      {
        where: { id },
        returning: true,
        transaction,
      },
    );
    const [, [user]] = await Customers.update(
      { balance: sequelize.literal('balance + 100') },
      {
        where: { id: contest.winner_id },
        returning: true,
        transaction,
      },
    );
    contest = contest.toJSON();
    contest.winner = { firstName: user.firstName, lastName: user.lastName };
    await transaction.commit();
    const entries = await Entries.findAll(
      {
        include: [{
          attributes: ['firstName', 'lastName'],
          model: Customers,
        }],
        where: { contest: id },
      },
    );
    contest.countEntries = entries.length;
    res.send({ contest, entries });
  } catch (err) {
    await transaction.rollback();
    next(new NotFoundError());
  }
};

module.exports.cashOut = async (req, res, next) => {
  let transaction;
  try {
    const { cardData, sum } = req.body;
    transaction = await sequelize.transaction();
    const bankOperations = await moneyTransfer(squadhelpCard, cardData, sum);
    const [amountUpdatedRows, [user]] = await Customers.update(
      { balance: sequelize.literal(`balance - ${sum}`) },
      {
        where: { id: req.id },
        returning: true,
        transaction
      },
    );
    if (amountUpdatedRows === 0 || !bankOperations) {
      await transaction.rollback();
      return next(new NotFoundError());
    }
    await transaction.commit();
    res.send(user);
  } catch (err) {
    await transaction.rollback();
    next(new NotFoundError());
  }
};

module.exports.createEntry = async (req, res, next) => {
  try {
    let data = req.body;
    const { id } = req.params; // id contest
    const queryType = req.headers['content-type'].split(';')[0];
    if (queryType === 'multipart/form-data') {
      data = await convertingData(req, res, next);
    }
    data.contest = id;
    data.mimeType = queryType;
    const entry = await Entries.create(data);
    res.send(entry);
  } catch (err) {
    next(new BadReqError());
  }
};
