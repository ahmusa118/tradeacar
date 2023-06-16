import {createRealmContext} from '@realm/react';
import {RoomSchema,MessageSchema} from './Schemas';

export const realmContext = createRealmContext({
    schema: [RoomSchema,MessageSchema],
  })