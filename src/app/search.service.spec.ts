import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { SearchService } from './search.service';

describe('SearchService', () => {
  let spectator: SpectatorService<SearchService>;
  const createService = createServiceFactory(SearchService);

  beforeEach(() => (spectator = createService()));
});
