import { Request, Response, NextFunction } from 'express';
import User from '../database/models/user';
import Vendor from '../database/models/vendor';

export const verifyAdmin = async (req: Request, res: Response, next:NextFunction) => {
    try{
        const tokenData = (req as any).token

       if(tokenData.role !== 'admin'){
        return res.status(401).json({message: 'Unauthorized access'})
       }
       next()
    }
    catch(err){
        res.status(500).json({ message: 'Internal server error', err});

    }
}

export const verifyVendor = async( req: Request, res: Response, next: NextFunction) => {
    try{
        const tokenData = (req as any).token;
        const userId = tokenData.id;
        const vendor = await Vendor.findOne({ where: { userId: userId}});

        if(!vendor){
            return res.status(401).json({ message: 'Unauthorized access'});

        }

        (req as any).vendorId = vendor.vendorId;
        next();

    } catch(err){
        res.status(500).json({ message: 'Internal server error ', err});
    } 
}