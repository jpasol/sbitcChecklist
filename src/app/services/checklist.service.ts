import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Checklist } from '../shared/models/checklist';
import { Observable } from 'rxjs';
import { ChecklistItem } from '../shared/models/checklist-item';

@Injectable({
  providedIn: 'root'
})
export class ChecklistService {
  apiUrl = `${environment.apiURL}/api/checklists`
  
  checklistItem = this.fb.group({
    checkbox: [''],
    remarks: ['']
  })

  public isSubmitSuccess: boolean;

  constructor(private http: HttpClient,
    private fb: FormBuilder) { }

  public submitChecklist(data: Checklist) {
     return this.http.post<Checklist>(this.apiUrl,data);
  }

  public getChecklist() : Observable<Checklist[]>{
    return this.http.get<any>(this.apiUrl)
  }

  public getChecklistWithIssues() : Observable<Checklist[]> {
    return this.http.get<any>(`${this.apiUrl}/issues`)
  }
  public getChecklistItems() : Observable<ChecklistItem[]>{
    return this.http.get<any>(`${this.apiUrl}/items`)
  }

  public getChecklistItemsWithIssues() : Observable<ChecklistItem[]> {
    return this.http.get<any>(`${this.apiUrl}/items/issues`)
  }
}
