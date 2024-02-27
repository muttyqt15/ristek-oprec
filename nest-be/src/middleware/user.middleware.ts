// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';
// import { GlobalAuthorityLevel } from 'src/entities/users/types/entity.types';

// @Injectable()
// export class UserMiddleware implements NestMiddleware {
//   use(req: Request, res: Response, next: NextFunction) {
//     // Assuming you have some logic to extract user details from the request (e.g., from headers or cookies)
//     // Replace this with your actual logic
//     const user = { global_authority: GlobalAuthorityLevel.ADMIN }; // Example user details

//     // Attach user details to the request object
//     req.user = user;

//     next();
//   }
// }
