import { Response, NextFunction } from 'express';
import ApiResponse from '../common/apiResponse';
import logger from '../common/logger';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validator =
  (schema: any) => async (req: any, res: Response, next: NextFunction) => {
    const paths = Object.keys(schema);
    if (!paths.length) return next();
    if (
      !paths.includes('body') &&
      !paths.includes('query') &&
      !paths.includes('params')
    )
      return next();

    for (const path of paths) {
      const dataForValidation = req[path];
      const { value, error } = schema[path].validate(dataForValidation, {
        allowUnknown: false,
        stripUnknown: true,
      });

      if (error) {
        logger.error(`VALIDATION ERROR: ${error}`);
        const context = error?.details;
        return ApiResponse.BAD_REQUEST({
          res,
          message:
            context?.[0]?.message?.replace(/"/g, '') ||
            `Validation failed for ${path}.`,
          payload: {
            context,
            accepted_fields: Object.keys(schema[path].describe().keys),
          },
        });
      }
      req[path] = value;
    }
    next();
  };

export default validator;
