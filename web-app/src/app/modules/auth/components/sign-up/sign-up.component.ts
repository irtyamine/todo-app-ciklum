import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SIGN_IN_ROUTE } from '../../../../shared/constants';
import { NewUser } from '../../models';
import { AuthState, isLoading, SignUpActions } from '../../store';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['../../styles/auth-form.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  isProcessing$: Observable<boolean>;

  readonly signInRoute = SIGN_IN_ROUTE;

  constructor(private fb: FormBuilder,
              private store: Store<AuthState>) {

    this.signUpForm = this.buildForm();
  }

  ngOnInit(): void {
    this.isProcessing$ = this.store.pipe(select(isLoading));
  }

  onSubmit(): void {
    if (this.signUpForm.valid) {
      const user: NewUser = { ...this.signUpForm.value };

      this.store.dispatch(SignUpActions.signUp({ newUser: user }));
    }
  }

  onAvatarChange(target: EventTarget) {
    // @ts-ignore
    const files: File[] = target.files;

    if (files && files.length > 0) {
      const reader = new FileReader();
      const file = files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.signUpForm.get('avatar').patchValue({
          fileName: file.name,
          fileType: file.type,
          fileContent: reader.result
        });
      };
    }
  }

  private buildForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      firstName: '',
      lastName: '',
      avatar: ''
    });
  }

}
