export class RoomSchema extends Realm.Object {
    static schema={
    name: "Room",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      name: "string",
      messages: {
        type: "list",
        objectType: "Message",
      },
    },
}
  };

export class MessageSchema extends Realm.Object{
static schema = {
    name: "Message",
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      id: "string",
      receiverEmail: "string",
      room: "string",
      senderEmail: "string",
      text: "string",
      timestamp: "date",
    },
  };
}


