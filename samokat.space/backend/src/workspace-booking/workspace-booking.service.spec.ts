import { Test, TestingModule } from '@nestjs/testing';
import { WorkspaceBookingService } from './workspace-booking.service';

describe('WorkspaceBookingService', () => {
  let service: WorkspaceBookingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkspaceBookingService],
    }).compile();

    service = module.get<WorkspaceBookingService>(WorkspaceBookingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
