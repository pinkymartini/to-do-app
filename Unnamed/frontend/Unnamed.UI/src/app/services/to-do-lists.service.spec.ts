import { TestBed } from '@angular/core/testing';

import { ToDoListsService } from './to-do-lists.service';

describe('ToDoListsService', () => {
  let service: ToDoListsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToDoListsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
