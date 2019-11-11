import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SettingsService } from './settings.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  settingsForm = this.fb.group({
    name: [null],
    email: [null, Validators.email]
  });

  constructor(private fb: FormBuilder, private settingsService: SettingsService, private location: Location) {}

  ngOnInit() {
    ['name', 'email'].forEach(setting => {
      this.settingsForm.controls[setting].setValue(this.settingsService.getSetting(setting) || '');
    });
  }

  submit() {
    this.settingsService.updateSettings(this.settingsForm.value);
    this.location.back();
  }
}
