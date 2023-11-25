import { Injectable } from '@nestjs/common';
import {
  DynamoDBClient,
  ScanCommand,
  GetItemCommand,
  PutItemCommand,
} from '@aws-sdk/client-dynamodb';
import { marshall } from '@aws-sdk/util-dynamodb';
import { Note } from './entities/note.entity';

@Injectable()
export class NotesRepository {
  private readonly tableName = 'notes-api-development';
  private readonly client: DynamoDBClient;

  constructor() {
    this.client = new DynamoDBClient({
      endpoint: 'http://127.0.0.1:4566',
      region: 'us-east-1',
    });
  }

  async findAll() {
    const result: Note[] = [];

    const command = new ScanCommand({
      TableName: this.tableName,
    });

    const response = await this.client.send(command);

    if (response.Items) {
      response.Items.forEach((item) => {
        result.push(Note.newInstanceFromDynamoDBObject(item));
      });
    }

    return result;
  }

  async findByNoteId(noteId: string) {
    const command = new GetItemCommand({
      TableName: this.tableName,
      Key: {
        noteId: {
          S: noteId,
        },
      },
    });

    const response = await this.client.send(command);

    if (response.Item) {
      return Note.newInstanceFromDynamoDBObject(response.Item);
    }

    return undefined;
  }

  async upsertOne(data: Note) {
    const item: any = {
      noteId: data.noteId,
      content: data.content,
      createdAt: data.createdAt.getTime(),
    };

    if (data.title) {
      item.title = data.title;
    }

    if (data.updatedAt) {
      item.updatedAt = data.updatedAt.getTime();
    }

    const command = new PutItemCommand({
      TableName: this.tableName,
      Item: marshall(item),
    });

    const response = await this.client.send(command);

    return response;
  }
}
