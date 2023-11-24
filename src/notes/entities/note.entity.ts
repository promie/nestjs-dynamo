export class Note {
  noteId: string;
  title?: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date;

  static newInstanceFromDynamoDBObject(data: any): Note {
    const result = new Note();
    result.noteId = data.noteId.S;
    result.title = data?.title?.S;
    result.content = data.content.S;
    result.createdAt = new Date(Number(data.createdAt.N));
    if (data.updatedAt) {
      result.updatedAt = new Date(Number(data.updatedAt.N));
    }
    return result;
  }
}
