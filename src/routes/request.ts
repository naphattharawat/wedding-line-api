/// <reference path="../../typings.d.ts" />

import * as HttpStatus from 'http-status-codes';
import * as moment from 'moment';

import * as express from 'express';
import { Router, Request, Response } from 'express';

import { RequestModel } from '../models/request';

const requestModel = new RequestModel();
const router: Router = Router();

router.get('/request', (req: Request, res: Response) => {
  res.send({ ok: true, message: 'Welcome to Api Server!', code: HttpStatus.OK });
});

// save new request
router.post('/status', async (req: Request, res: Response) => {
  try {
    const db = req.db;
    const userId = req.body.userId;
    const displayName = req.body.displayName;
    const pictureUrl = req.body.pictureUrl;
    const no = req.body.no;
    const status = req.body.status;

    await requestModel.saveStatus(db, {
      line_id: userId,
      displayname: encodeURI(displayName),
      image: pictureUrl,
      status: status,
      no: no
    })
    res.send({ ok: true })
  } catch (error) {
    console.log(error);
    res.send({ ok: false, error })
  }

});

export default router;