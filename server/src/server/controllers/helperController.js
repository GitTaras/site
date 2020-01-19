import { Banks, Contests, Customers, Entries, sequelize } from '../models';
import multer from 'multer';
import _ from 'lodash';
import fs from 'fs';
import ApplicationError from '../utils/errors/ApplicationError';
import { pathImg } from '../utils/constants';
import BadReqError from '../utils/errors/BadReqError';

const Op = sequelize.Op;

module.exports.checkPackage = async (contest) => {
  if (_.size(contest.package) > 1) {
    const nextItem = contest.package.indexOf(contest.type) + 1;
    const nextType = contest.package[nextItem];
    if (nextType) {
      const [, [updatedContest]] = await Contests.update(
        { isActive: true },
        {
          where: { uuidGroup: contest.uuidGroup, type: nextType },
          returning: true,
        });
      return updatedContest;
    }
    return {};
  }
  return {};
};

module.exports.findAllEntries = (query) => {
  return Entries.findAll(
    {
      include: [{
        model: Customers,
        attributes: ['firstName', 'lastName'],
      }],
      where: query,
      order: [['createdAt', 'DESC']],
    },
  );
};

module.exports.getContestWithEntries = (condition) => {
  return Contests.findAll(
    {
      attributes: ['id', 'name', 'type', 'businessDo', 'price', 'isActive', 'isPayed',
        'uuidGroup', 'owner_id', 'package', 'createdAt',
        [sequelize.fn('count', sequelize.col('Entries.id')), 'countEntries']],
      include: [{ attributes: [], model: Entries }],
      where: condition,
      group: ['Contests.id'],
      order: [['createdAt', 'DESC']],
    },
  );
};

module.exports.filter = (conditions) => {
  const query = { [Op.and]: {} };
  query[Op.and] = ({ isActive: true });
  const conditionKeys = Object.keys(conditions);
  for (let i = 0; i < conditionKeys.length; i++) {
    let filter = null;
    const condition = conditionKeys[i];
    if (condition === 'type') {
      filter = conditions[condition];
    } else {
      const filterValues = conditions[condition].split(',');
      filter = { [Op[condition === 'price' ? 'between' : 'contains']]: filterValues };
    }
    query[Op.and][condition] = filter;
  }
  return query;
};

module.exports.convertingData = async (req, res, next) => {
  let fileName;
  const upload = multer({
    storage:
      multer.diskStorage({
        destination: `${pathImg}/${req.id}`, filename: (req, files, cb) => {
          fileName = Date.now() + '-' + files.originalname.replace(/\s/g, '');
          cb(null, fileName);
        },
      }),
    limits:{
      fileSize: 6000000,
    },
    fileFilter: (req, file, cb) => {
      if (!/image/.test(file.mimetype)) {
        return cb(next(new ApplicationError('Supports only image formats', 415), false));
      }
      return cb(null, true);
    },
  }).any();


  return new Promise((resolve, reject) => {
    upload(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        reject(err);
      } else if (err) {
        reject(err);
      }
      if(!_.isEmpty(req.body.formData)) {
        const newData = JSON.parse(req.body.formData);
        const files = req.files;
        if (_.isArray(newData)) {       // create contests
          newData.map(contest => {
            const index = files.findIndex(file => file.originalname === contest.photos);
            if (index !== -1) {
              contest.photos = files[index].filename;
            }
          });
        } else {                       // create entries
          newData.suggestion = fileName;
        }
        resolve(newData);
      }
      resolve(fileName);
    },
    );
  });
};

module.exports.moneyTransfer = async (debitCard, cardRecipient, cost) => {
  let transaction = await sequelize.transaction();
  const [amountUpdatedRows] = await Banks.update(
    {
      balance: sequelize.literal(`CASE 
      WHEN "card" = '${debitCard.card}' AND "cvv" = '${debitCard.cvv}' AND "expires" = '${debitCard.expires}' 
      THEN "balance" - ${cost} 
      WHEN "card" = '${cardRecipient.card}' AND "cvv" = '${cardRecipient.cvv}' AND "expires" = '${cardRecipient.expires}'
      THEN "balance" + ${cost} END`),
    },
    {
      where: { card: { [sequelize.Op.in]: [debitCard.card, cardRecipient.card] } },
      returning: true,
      transaction
    },
  );
  if(amountUpdatedRows < 2){
    await transaction.rollback();
    return false;
  }
  await transaction.commit();
  return true;
};

module.exports.findFullInfoForRecipient = async (chats, userId) => {
  try{
    const members = [];
    chats.map(chat => {
      members.push(chat.participants.filter(item => parseInt(item, 10) !== userId));
    });
    const users = await Customers.findAll({
      attributes: ['firstName', 'lastName', 'id', 'photo'],
      where: { id: { [sequelize.Op.in]: _.flattenDeep(members) } },
      raw: true,
    });
    chats.map(chat => {
      const participantsId = chat.participants.find(item => parseInt(item, 10) !== userId);
      chat.recipient = users.find(item => parseInt(item.id, 10) === parseInt(participantsId, 10));
    });
    return chats;
  } catch (err) {
    return err;
  }
};

module.exports.deletePhotoFromServer = (photo, user) => {
  if(photo){
    fs.unlink(`${pathImg}/${user}/${photo}`, err => {
      if(err){
        return err;
      }
    });
  }
};
