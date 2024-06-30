import { Routes } from '@angular/router';
import { AuthCallbackComponent } from './auth-callback.component';
import { AuthGuard } from './auth.guard';
import { ProtectedComponent } from './protected.component';

export const routes: Routes = [
    { path: 'auth-callback', component: AuthCallbackComponent },
    { path: 'protected-route', component: ProtectedComponent, canActivate: [AuthGuard] },
];
