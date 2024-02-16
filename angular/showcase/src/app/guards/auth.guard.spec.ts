import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { AUTH_URL } from '../config';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isUserAuthenticated']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    authGuard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should allow the authenticated user to access app', async () => {
    authService.isUserAuthenticated.and.returnValue(Promise.resolve(true));

    expect(await authGuard.canActivate()).toEqual(true);
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should redirect an unauthenticated user to the login route', async () => {
    authService.isUserAuthenticated.and.returnValue(Promise.resolve(false));

    expect(await authGuard.canActivate()).toEqual(false);
    expect(router.navigate).toHaveBeenCalledWith([`/${AUTH_URL}`]);
  });
});
