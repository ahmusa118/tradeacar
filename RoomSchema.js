const RoomSchema = {
    name: "Room",
    title: "Room",
    bsonType: "object",
    required: ["name", "messages"],
    properties: {
      name: {
        bsonType: "string"
      },
      messages: {
        bsonType: "array",
        items: {
          bsonType: "object",
          required: ["id", "receiverEmail", "room", "senderEmail", "text", "timestamp"],
          properties: {
            id: {
              bsonType: "string"
            },
            receiverEmail: {
              bsonType: "string"
            },
            room: {
              bsonType: "string"
            },
            senderEmail: {
              bsonType: "string"
            },
            text: {
              bsonType: "string"
            },
            timestamp: {
              bsonType: "date"
            }
          }
        }
      }
    }
  };

export default RoomSchema
