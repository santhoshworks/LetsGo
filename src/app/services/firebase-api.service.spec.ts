import { TestBed, inject } from '@angular/core/testing';

import { FirebaseApiService } from './firebase-api.service';

describe('FirebaseApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FirebaseApiService]
    });
  });

  it('should be created', inject([FirebaseApiService], (service: FirebaseApiService) => {
    expect(service).toBeTruthy();
  }));
});
