import express, {NextFunction, Request, Response } from 'express';
import  jwt from 'jsonwebtoken';
import authenticate from '../services/auth.service';
import config from '../environment.conf';

const sign_in = async (req: Request, res: Response) => {
    const {user_name, password} = req.body;
    try {
        const u = await authenticate(user_name, password)
        const token = jwt.sign({ user: u }, ''+config.tkn_scrt);
        
        res.json(token)
    } catch(error) {
        res.status(401)
        res.json({ error })
    }
}


const verify_middelware =  async (req: Request, res: Response, next : NextFunction): Promise<void> => {
    try {
        if(req.headers.authorization === undefined) throw new Error();
        const authorizationHeader = ''+req.headers.authorization;
        const token = authorizationHeader.split(' ')[1];
        const decoded = jwt.verify(token, ''+config.tkn_scrt);
        
        next()
    } catch (error) {
        res.status(401);
        res.json('Error: need to login');
    }
}

export default {sign_in, verify_middelware};
