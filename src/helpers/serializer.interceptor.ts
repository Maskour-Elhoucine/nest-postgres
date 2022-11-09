import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import deepMapObject from './deep-map-object.helper';
import userResponseSerializer from '../users/user.response.serializer';
import { User } from '../users/entities/user.entity';

@Injectable()
export class SerializerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      map((data) => {
        return deepMapObject(data, (value) => {
          if (value.__entity === 'User') userResponseSerializer(value as User);
          return value;
        });
      }),
    );
  }
}
