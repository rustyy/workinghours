import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { environment } from '../../environments/environment';

import { SettingsService } from './settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  environment = environment;
  settingsForm: FormGroup;

  constructor(private fb: FormBuilder, private settings: SettingsService, private location: Location) {}

  ngOnInit() {
    const nameValue = this.settings.getSetting('name') || '';
    const emailValue = this.settings.getSetting('email') || '';

    this.settingsForm = this.fb.group({
      name: [nameValue],
      email: [emailValue, Validators.email]
    });
  }

  submit() {
    this.settings.updateSettings(this.settingsForm.value);
    this.location.back();
  }
}
