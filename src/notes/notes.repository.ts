import { Injectable } from '@nestjs/common';
import { DynamoDBClient, ScanCommand } from '@aws-sdk/client-dynamodb';
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
}
