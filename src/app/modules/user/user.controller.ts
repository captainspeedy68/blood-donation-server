import { Request, Response } from 'express'
import { UserServices } from './user.service'

const createClient = async (req: Request, res: Response) => {
  const { password, client } = req.body
  // console.log(client);
  try{

    const result = await UserServices.createClientIntoDB(password, client);
    res.status(200).json({
      success: true,
      message: 'Client created successfully',
      data: result,
    })
  }catch(err){
    res.status(400).json({
      success: false,
      message: 'Client creation failed!!!!',
      err,
    });
  }
}

export const UserControllers = {
  createClient
}
