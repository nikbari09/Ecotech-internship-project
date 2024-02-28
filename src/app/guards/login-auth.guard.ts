import { MatButton } from '@angular/material/button';
import { CanActivateFn } from '@angular/router';

export const loginAuthGuard: CanActivateFn = (route, state) => {
  if(localStorage.getItem('user') || localStorage.getItem('admin')){
    return true;
  }
  else{
    alert('login needed.');
    return false;
  }
};
