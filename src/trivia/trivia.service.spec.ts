import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { TriviaService } from './trivia.service';
import { TriviaCard } from './entities/trivia.entity';

describe('TriviaService', () => {
  let service: TriviaService;
  let repository: jest.Mocked<Repository<TriviaCard>>;

  const card: TriviaCard = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    question: 'What is the capital of France?',
    answer: 'Paris',
    isPublic: true,
  };

  beforeEach(async () => {
    const mockRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOneBy: jest.fn(),
      preload: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TriviaService,
        {
          provide: getRepositoryToken(TriviaCard),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<TriviaService>(TriviaService);
    repository = module.get(getRepositoryToken(TriviaCard));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('checkAnswer', () => {
    it('returns correct: true for an exact match', async () => {
      repository.findOneBy.mockResolvedValue(card);

      const result = await service.checkAnswer(card.id, 'Paris');

      expect(result).toEqual({ correct: true });
    });

    it('returns correct: false for a wrong answer', async () => {
      repository.findOneBy.mockResolvedValue(card);

      const result = await service.checkAnswer(card.id, 'London');

      expect(result).toEqual({ correct: false });
    });

    it('is case-insensitive', async () => {
      repository.findOneBy.mockResolvedValue(card);

      const result = await service.checkAnswer(card.id, 'pArIs');

      expect(result).toEqual({ correct: true });
    });

    it('trims surrounding whitespace before comparing', async () => {
      repository.findOneBy.mockResolvedValue(card);

      const result = await service.checkAnswer(card.id, '  Paris  ');

      expect(result).toEqual({ correct: true });
    });

    it('throws NotFoundException when the card does not exist', async () => {
      repository.findOneBy.mockResolvedValue(null);

      await expect(service.checkAnswer('missing-id', 'Paris')).rejects.toThrow(NotFoundException);
    });
  });

  describe('answersMatch', () => {
    it('treats differing internal whitespace as a mismatch', () => {
      expect(TriviaService.answersMatch('New York', 'NewYork')).toBe(false);
    });

    it('matches identical strings', () => {
      expect(TriviaService.answersMatch('42', '42')).toBe(true);
    });
  });
});
