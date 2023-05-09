import { Request, Response } from "express";
import Task from "../models/Task";
import { StatusCodes } from "http-status-codes";

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find({});

    if(!tasks.length || !tasks) {
      res.status(StatusCodes.NOT_FOUND).json({ err: 'You have no task' })
    }

    res.status(StatusCodes.OK).json({ data: tasks });
  } catch (err) {
    res.status(StatusCodes.BAD_GATEWAY).json({ err });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, address, status, role, sum } = req.body;

    if(!title || !address) {
      res.status(StatusCodes.BAD_REQUEST).json({ err: 'Provide title, address and sum' });
    }
    const task = await Task.create({ title, address, status, role, sum });

    res.status(StatusCodes.CREATED).json({ data: task });

  } catch (err) {
    res.status(StatusCodes.BAD_GATEWAY).json({ err });
  }
  
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, address, status, role, sum } = req.body;

    if(!id) {
      res.status(StatusCodes.BAD_REQUEST).json({ err: 'Provide id' });
    }

    const task = await Task.findById({ _id: id });

    if(!task) {
      res.status(StatusCodes.NOT_FOUND).json({ err: `No task with id: ${id}` });
    }

    if(!title && !address && !status && !role && !sum) {
      res.status(StatusCodes.BAD_REQUEST).json({ err: 'Provide any value' });
    }

    title && task ? task.title = title : null;
    address && task ? task.address = address : null;
    status && task ? task.status = status : null;
    role && task ? task.role = role : null;
    sum && task ? task.sum = sum : null;

    await task?.save();
    res.status(StatusCodes.OK).json({ data: task });

  } catch (err) {
    res.status(StatusCodes.BAD_GATEWAY).json({ err });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if(!id) {
      res.status(StatusCodes.BAD_REQUEST).json({ err: 'Provide id' });
    }

    const task = await Task.findByIdAndDelete({ _id: id });

    if(!task) {
      res.status(StatusCodes.NOT_FOUND).json({ err: `No task with id: ${id}` });
    }
    
    res.status(StatusCodes.OK).json({ data: { deleted: true, task } });

  } catch (err) {
    res.status(StatusCodes.BAD_GATEWAY).json({ err });
  }
};