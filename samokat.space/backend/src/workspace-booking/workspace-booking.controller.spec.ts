import { Test, TestingModule } from '@nestjs/testing';
import { WorkspaceBookingController } from './workspace-booking.controller';
import { WorkspaceBookingService } from './workspace-booking.service';

describe('WorkspaceBookingController', () => {
  let controller: WorkspaceBookingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkspaceBookingController],
      providers: [WorkspaceBookingService],
    }).compile();

    controller = module.get<WorkspaceBookingController>(WorkspaceBookingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
