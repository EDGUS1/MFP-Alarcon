import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { NavbarService } from './navbar.service';

describe('NavbarService', () => {
  let service: NavbarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Router,
          /* useClass: class {
        navigate = jasmine.createSpy('navigate');
      }, */
          useClass: class {
            navigate = jasmine.createSpy('navigate');
            getCurrentNavigation() {
              return {
                extras: {
                  state: {
                    value: 4,
                  },
                },
              };
            }
          },
        },
      ],
    });
    service = TestBed.inject(NavbarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
