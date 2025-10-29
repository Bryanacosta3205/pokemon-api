import { Request, Response, NextFunction } from 'express';
import { MAX_LIMIT } from '../utils/pagination';

export const validatePagination = (req: Request, res: Response, next: NextFunction) => {
  const { page, limit } = req.query;

  if (page) {
    const pageNum = Number(page);
    if (isNaN(pageNum) || pageNum < 1) {
      throw new Error('Page must be a positive number');
    }
  }

  if (limit) {
    const limitNum = Number(limit);
    if (isNaN(limitNum) || limitNum < 1) {
      throw new Error('Limit must be a positive number');
    }
    if (limitNum > MAX_LIMIT) {
      throw new Error(`Limit cannot exceed ${MAX_LIMIT}`);
    }
  }

  next();
};
