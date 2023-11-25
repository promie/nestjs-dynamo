import { Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { NotesRepository } from './notes.repository';
import { Note } from './entities/note.entity';

@Injectable()
export class NotesService {
  constructor(private readonly repository: NotesRepository) {}

  create(createNoteDto: CreateNoteDto) {
    return this.repository.upsertOne(Note.newInstanceFromDTO(createNoteDto));
  }

  findAll() {
    return this.repository.findAll();
  }

  findOne(id: string) {
    return this.repository.findByNoteId(id);
  }

  update(id: number, updateNoteDto: UpdateNoteDto) {
    return `This action updates a #${id} note`;
  }

  remove(id: number) {
    return `This action removes a #${id} note`;
  }
}
