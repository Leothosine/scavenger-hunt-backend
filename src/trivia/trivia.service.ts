import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTriviaDto } from './dto/create-trivia.dto';
import { UpdateTriviaDto } from './dto/update-trivia.dto';
import { TriviaCard } from './entities/trivia.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TriviaService {
  constructor(
    @InjectRepository(TriviaCard)
    private triviaRepo: Repository<TriviaCard>,
  ) {}

  create(dto: CreateTriviaDto) {
    const card = this.triviaRepo.create(dto);
    return this.triviaRepo.save(card);
  }

  findAll() {
    return this.triviaRepo.find();
  }

  findOne(id: string) {
    return this.triviaRepo.findOneBy({ id });
  }

  async update(id: string, dto: UpdateTriviaDto) {
    const card = await this.triviaRepo.preload({ id, ...dto });
    if (!card) throw new NotFoundException(`Card ${id} not found`);
    return this.triviaRepo.save(card);
  }

  async remove(id: string) {
    const card = await this.triviaRepo.findOneBy({ id });
    if (!card) throw new NotFoundException(`Card ${id} not found`);
    return this.triviaRepo.remove(card);
  }

  /**
   * Validates a submitted answer against the card's stored answer.
   * Comparison is case-insensitive and ignores leading/trailing whitespace.
   */
  async checkAnswer(id: string, submitted: string): Promise<{ correct: boolean }> {
    const card = await this.triviaRepo.findOneBy({ id });
    if (!card) throw new NotFoundException(`Card ${id} not found`);

    return { correct: TriviaService.answersMatch(card.answer, submitted) };
  }

  static answersMatch(expected: string, submitted: string): boolean {
    return expected.trim().toLowerCase() === submitted.trim().toLowerCase();
  }
}
