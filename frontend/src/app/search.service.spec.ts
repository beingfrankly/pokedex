import { createServiceFactory, SpectatorService } from "@ngneat/spectator/jest";
import { SearchService } from "./search.service";
import { of } from "rxjs";
import { Apollo } from "apollo-angular";

const apolloMock = {
  query: jest.fn().mockReturnValue(of({})),
};

describe("SearchService", () => {
  let spectator: SpectatorService<SearchService>;
  let searchService: SearchService;

  const createService = createServiceFactory({
    service: SearchService,
    mocks: [Apollo],
    providers: [{ provide: Apollo, useValue: apolloMock }],
  });

  beforeEach(() => {
    spectator = createService();
    searchService = spectator.service;
  });

});
