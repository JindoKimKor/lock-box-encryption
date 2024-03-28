import { Component, inject } from '@angular/core'
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  Validators
} from '@angular/forms'
import { CookieService } from 'ngx-cookie-service'
import { UserDalService } from '../../../../services/user.dal.service'
import { User } from '../../../../models/user.model'
import { CookieEncryptionService } from '../../../../services/crypto/cookie-encryption.service'

@Component({
  selector: 'login-form',
  standalone: true,
  providers: [CookieService],
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  userDal = inject(UserDalService)
  CEService = inject(CookieEncryptionService)
  cookieService : CookieService
  user: User = new User('', '')
  isFormValid = true

  constructor(private builder: FormBuilder, cookieService : CookieService) {
    this.cookieService = cookieService
  }

  userForm = this.builder.group({
    userName: ['', [Validators.required]],
    password: ['', [Validators.required]],
    keepMeLoggedIn: ['', []],
  })

  addUserClickHandler(): void {
    if (this.userForm.valid) {
      console.log(this.userForm.value)
      if (this.userForm.value.keepMeLoggedIn) {
        this.cookieService.set('test', this.CEService.encryptCookie("dsa") )
      }
    } else {
      this.isFormValid = false
    }
  }
}
