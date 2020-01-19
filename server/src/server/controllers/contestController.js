import {Contests, Customers, Entries, LikedContests, sequelize} from '../models';
import uuidv1 from 'uuid/v1';
import _ from 'lodash';
import {price, squadhelpCard} from '../utils/constants';
import NotFoundError from '../utils/errors/NotFound';
import {
  checkPackage,
  convertingData,
  deletePhotoFromServer,
  filter,
  getContestWithEntries,
  moneyTransfer,
} from './helperController';
import BadReqError from '../utils/errors/BadReqError';

module.exports.getFullContestById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contest = await Contests.findOne(
      {
        attributes: { include: [[sequelize.fn('count', sequelize.col('Entries.id')), 'countEntries']] },
        include: [
          { attributes: [], model: Entries },
          { attributes: ['firstName', 'lastName'], model: Customers, as: 'winner' },
        ],
        where: { id },
        group: ['Contests.id', 'winner.id'],
      },
    );
    if (!contest) {
      next(new NotFoundError());
    }
    return res.send(contest);
  } catch (err) {
    next(new NotFoundError());
  }
};

module.exports.editContest = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [amountUpdatedRows, [contest]] = await Contests.update(
      req.body,
      {
        where: { id, owner_id: req.id },
        returning: true,
      });
    if (amountUpdatedRows === 0) {
      return next(new NotFoundError());
    }
    res.send(contest);
  } catch (err) {
    next(new NotFoundError());
  }
};

module.exports.payContest = async (req, res, next) => {
  let transaction;
  try {
    const { card, cvv, expires, uuidGroup } = req.body;
    const userCardData = { card, cvv, expires };
    transaction = await sequelize.transaction();
    const bankOperations = await moneyTransfer(userCardData, squadhelpCard, price);
    const [amountUpdatedRows, [contests]] = await Contests.update(
      { isPayed: true },
      {
        where: { uuidGroup },
        returning: true,
        transaction,
      });
    await Contests.update(
      { isActive: true },
      {
        where: { type: contests.package[0], uuidGroup },
        transaction,
      }
    );
    if (amountUpdatedRows === 0 || !bankOperations ){
      await transaction.rollback();
      return next(new NotFoundError());
    }
    await transaction.commit();
    res.end();
  } catch (err) {
    await transaction.rollback();
    next(new NotFoundError());
  }
};

module.exports.createContest = async (req, res, next) => {
  try {
    const uuid = uuidv1();
    const data = await convertingData(req, res, next);
    data.map(contest => contest.uuidGroup = uuid);
    const contests = await Contests.bulkCreate(data);
    res.send(contests);
  } catch (err) {
    next(new BadReqError(err.message));
  }
};

module.exports.checkTypeInPackage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contest = await Contests.findByPk(id);
    const updatedContest = await checkPackage(contest);
    res.send(updatedContest);
  } catch (err) {
    next(new BadReqError());
  }
};

module.exports.getContestsForUser = async (req, res, next) => {
  try {
    const contests = await getContestWithEntries({ owner_id: req.id });
    return res.send(contests);
  } catch (err) {
    next(new NotFoundError());
  }
};

module.exports.changeContestPicture = async (req, res, next) => {
  try {
    const { id } = req.params;
    const oldContest = await Contests.findByPk(id);
    await deletePhotoFromServer(oldContest.photos, req.id);
    let photos = await convertingData(req, res, next);
    if(_.isUndefined(photos)){
      photos = '';
    }
    await Contests.update(
      { photos },
      { where: { id },
        returning: true },
    );
    res.send({ photos });
  } catch (err) {
    next(new NotFoundError());
  }
};

module.exports.getDraftContests = async (req, res, next) => {
  try {
    const contests = await Contests.findAll(
      {
        where: {
          owner_id: req.id,
          isPayed: false
        },
        attributes: ['id', 'name', 'type', 'businessDo', 'price', 'isActive', 'isPayed',
          'uuidGroup', 'owner_id', 'package', 'createdAt']
      }
    );

    res.send(contests);
  } catch (err) {
    next(new NotFoundError());
  }
};

// FOR CREATIVE

module.exports.getAllActiveContests = async (req, res, next) => {
  try {
    const contests = await getContestWithEntries({ isActive: true });
    return res.send(contests);
  } catch (err) {
    next(new NotFoundError());
  }
};

module.exports.filterActiveContests = async (req, res, next) => {
  try {
    const contests = await getContestWithEntries((filter(req.query)));
    res.send(contests);
  } catch (err) {
    next(new NotFoundError());
  }
};

module.exports.toggleFavoriteContest = async (req, res, next) => {
  try {
    const { userId } = req.body;
    let contestId = req.params.id;
    const likedContest = await LikedContests.findOne(
      { where: { contest: contestId, user: userId } },
    );
    if (likedContest) {
      await LikedContests.destroy({ where: { id: likedContest.dataValues.id } });
      contestId = parseInt(contestId, 10);
    } else {
      const favoriteContest = await LikedContests.create({ user: userId, contest: contestId });
      contestId = favoriteContest.contest;
    }
    const contest = await Contests.findByPk(contestId);
    res.send(contest);
  } catch (err) {
    next(new NotFoundError());
  }
};

module.exports.getFavoriteContests = async (req, res, next) => {
  try {
    const { id } = req.params;
    const likedContests = await LikedContests.findAll({
      attributes: ['contest'],
      where: { user: id },
    });
    const arrayId = likedContests.map(i => i.contest);
    const contests = await Contests.findAll({
      where: { id: { [sequelize.Op.in]: arrayId } },
    });
    res.send(contests);
  } catch (err) {
    next(new NotFoundError());
  }
};
