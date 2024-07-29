import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { Role } from '../service/role.eum';

export const AuthGuard: CanActivateFn = () => {
    const auth = inject(AuthService);
    const router = inject(Router);
    if (!auth.isAuthenticatedUser()) {
        router.navigateByUrl('/');
        return false;
    }
    return true;
}

export const HostGuard: CanActivateFn = async () => {
    const auth = inject(AuthService);
    const router = inject(Router);
    const role = await auth.getRole();
    if (role !== Role.HOST) {
        router.navigateByUrl('/dashboard/search');
        return false;
    }
    return true;
}