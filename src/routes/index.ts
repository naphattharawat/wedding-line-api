import * as express from 'express';
import { Router, Request, Response } from 'express';
import { Jwt } from '../models/jwt';
import { RequestModel } from '../models/request';

import * as HttpStatus from 'http-status-codes';

const jwt = new Jwt();
const requestModel = new RequestModel();
const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send({ ok: true, message: 'Welcome to RESTful api server!', code: HttpStatus.OK });
});

router.post('/', async (req: Request, res: Response) => {
  const body = req.body;
  const db = req.db;
  console.log('action', body.queryResult.action); // register-confirm

  // $userId = $request[‘originalDetectIntentRequest’][‘payload’][‘data’][‘source’][‘userId’];
  console.log(body.originalDetectIntentRequest.payload.data);
  if(body.originalDetectIntentRequest.payload.data.source){
    if (body.originalDetectIntentRequest.payload.data.source.type == 'user') {
      const userId = body.originalDetectIntentRequest.payload.data.source.userId;
      const parameter = body.queryResult.parameters;
      const action = body.queryResult.action;
      const profile: any = await requestModel.getProfile(userId);
      const displayName = profile.displayName;
      const pictureUrl = profile.pictureUrl;
      console.log(userId, displayName, pictureUrl);
      if (action == 'register-confirm') {
  
      }
      if (action == 'register-confirm.register-confirm-yes') {
        // save status confirm
        const no = parameter.no[0];
        await requestModel.saveStatus(db, {
          line_id: userId,
          displayname: encodeURI(displayName),
          image: pictureUrl,
          status: 'CONFIRM',
          no: no
        })
      }
      if (action == 'unsure.unsure-custom') {
        const no = parameter.number[0];
        await requestModel.saveStatus(db, {
          line_id: userId,
          displayname: encodeURI(displayName),
          image: pictureUrl,
          status: 'UNSURE',
          no:no
        })
      }
      if (action == 'do-not') {
        await requestModel.saveStatus(db, {
          line_id: userId,
          displayname: encodeURI(displayName),
          image: pictureUrl,
          status: 'DONOT'
        })
      }
    }
  }
  // console.log(body);
  // console.log(body.queryResult.outputContexts[0]);

  res.send({ ok: true, message: body });
});


router.post('/webhook', (req: Request, res: Response) => {
  console.log(req.body);
  res.send({ ok: true, message: 'Welcome to RESTful api server!', code: HttpStatus.OK });
});
export default router;