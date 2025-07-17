import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  [x: string]: any;
  // private formData: any = {};
  private formData: { [key: string]: any } = {};
  private jobs_apiUrl = `${environment.baseUrl}/Api/jobs_api`;
  private apiUrl = `${environment.baseUrl}`;
  private formapiUrl = `${environment.baseUrl}/FormApi`;




  constructor(private http: HttpClient) { }

  private handleResponse<T>(observable: Observable<any>): Observable<T> {
    return observable.pipe(
      map((response: any) => {
        if (response.status === 'success') {
          return response.data;
        } else {
          throw new Error(response.data?.message || 'An error occurred');
        }
      })
    );
  }

  getJobs(candidateLocation: string): Observable<any[]> {
    return this.handleResponse<any[]>(
      this.http.get(`${this.jobs_apiUrl}?candidate_location=${encodeURIComponent(candidateLocation)}`)
    );
  }

  
  getCities(): Observable<any[]> {
    return this.handleResponse<any[]>(this.http.get(`${this.apiUrl}/Api/get_cities`));
  }

  getStates(): Observable<any[]> {
    return this.handleResponse<any[]>(this.http.get(`${this.apiUrl}/Api/get_states`));
  }

  getSkills(): Observable<any[]> {
    return this.handleResponse<any[]>(this.http.get(`${this.apiUrl}/Api/get_skills`));
  }

  getEduBranch(): Observable<any[]> {
    return this.handleResponse<any[]>(this.http.get(`${this.apiUrl}/Api/get_edu_branch`));
  }

  getEduQual(): Observable<any[]> {
    return this.handleResponse<any[]>(this.http.get(`${this.apiUrl}/Api/get_edu_qual`));
  }

  getEduTitle(): Observable<any[]> {
    return this.handleResponse<any[]>(this.http.get(`${this.apiUrl}/Api/get_edu_title`));
  }

  getEmpProfile(): Observable<any[]> {
    return this.handleResponse<any[]>(this.http.get(`${this.apiUrl}/Api/get_emp_profile`));
  }

  getIndustryType(): Observable<any[]> {
    return this.handleResponse<any[]>(this.http.get(`${this.apiUrl}/Api/get_industrytype`));
  }

  getJobCategory(): Observable<any[]> {
    return this.handleResponse<any[]>(this.http.get(`${this.apiUrl}/Api/get_jobcategory`));
  }

  getJobType(): Observable<any[]> {
    return this.handleResponse<any[]>(this.http.get(`${this.apiUrl}/Api/get_jobtype`));
  }

  getLanguages(): Observable<any[]> {
    return this.handleResponse<any[]>(this.http.get(`${this.apiUrl}/Api/get_languages`));
  }

  getLangProficiency(): Observable<any[]> {
    return this.handleResponse<any[]>(this.http.get(`${this.apiUrl}/Api/get_lang_proficiency`));
  }

  getUnivName(): Observable<any[]> {
    return this.handleResponse<any[]>(this.http.get(`${this.apiUrl}/Api/get_univ_name`));
  }

  getCitiesByState(stateId: number): Observable<any[]> {
    return this.handleResponse<any[]>(this.http.get(`${this.apiUrl}/Api/get_cities_by_state/${stateId}`));
  }

  geteduTitlesByQual(qualId: number): Observable<any[]> {
    return this.handleResponse<any[]>(this.http.get(`${this.apiUrl}/Api/get_edutitle_by_qual/${qualId}`));
  }

  // getMobileNumberByUserId(qualId: string): Observable<any[]> {
  //   return this.handleResponse<any[]>(this.http.get(`${this.apiUrl}/Api/get_mb_by_userid/${qualId}`));
  // }

  getMobileNumberByUserId(userId: number): Observable<any> {
    return this.http.get<any>(`${this.formapiUrl}/get_mb_by_userid/${userId}`);
}

uploadResume(formData: FormData): Observable<any> {
  return this.http.post(`${this.formapiUrl}/upload`, formData);
}
  //Application form submission 
  submitAboutMe(data: any): Observable<any> {
    return this.http.post(`${this.formapiUrl}/aboutme`, data);
  }

  submitEducation(data: any): Observable<any> {
    return this.http.post(`${this.formapiUrl}/education`, data);
  }

  submitExperience(data: any): Observable<any> {
    return this.http.post(`${this.formapiUrl}/experience`, data);
  }

  submitSkills(data: any): Observable<any> {
    return this.http.post(`${this.formapiUrl}/skills`, data);
  }

  
  //Form Data Fetch Service

// formData is an object that can store multiple form data objects.
// setFormData() takes a key (e.g., 'aboutMeForm', 'educationForm', etc.) and the form data to be stored.
// getFormData() takes a key and returns the corresponding form data.
// clearFormData() takes a key and clears the form data for that specific form.

 

  // Method to get the current form data
  getFormData(key: string, userId: string): Observable<any> {
    return this.http.get(`${this.formapiUrl}/getformData/${userId}/${key}`);
  }

  


  // Update form Apis using PUT
  // Method to update form data
  updateFormData(formKey: string, userId: string, data: any): Observable<any> {
    return this.http.put(`${this.formapiUrl}/updateFormData/${userId}/${formKey}`, data);
  }
  //for delete lang on click remove lang
  deleteLanguage(languageId: number, userId: string): Observable<any> {
    return this.http.delete(`${this.formapiUrl}/delete_lang/${userId}/${languageId}`);
  }

  // Method to upload a file
  uploadFile(formData: FormData): Observable<any> {
    const url = `${this.apiUrl}/FileUpload/upload`; // Adjust the endpoint as necessary
    return this.http.post(url, formData, {
      headers: new HttpHeaders({
        // You can set additional headers here if needed
      })
    });
  }

  getUserReviewData(userId: number): Observable<any> {
    return this.http.get(`${this.formapiUrl}/getUserReviewData/${userId}`);
  }

  // jobs module 
  getEmployerDetailsWithJobs(): Observable<any> {
    return this.http.get(`${this.formapiUrl}/getEmployerDetailsWithJobs`);
  }
  // getEmployerDetailsWithJobs(): Observable<any[]> {
  //   return this.handleResponse<any[]>(this.http.get(`${this.formapiUrl}/getEmployerDetailsWithJobs`));
  // }


  getJobDetail(jobId: string): Observable<any> {
    return this.http.get(`${this.formapiUrl}/job_details/${jobId}`);
  }


  getJobs_forhomepage(): Observable<any> {
    return this.http.get(`${this.formapiUrl}/getEmployerDetailsWithJobs`);
  }

  getjobCategories(): Observable<any> {
    return this.http.get(`${this.formapiUrl}/gethomepagejobCategories`);
  }


  getAppliedJobs(userId: string) {
    return this.http.get<any>(`${this.formapiUrl}/getAppliedJobs/${userId}`);
  }
  
  getSavedJobs(userId: string) {
    return this.http.get<any>(`${this.formapiUrl}/getSavedJobs/${userId}`);
  }
  

  //----------------Apply job apis--------------------------

  // New method to apply for a job
  applyForJob(data: { userId: string; jobId: string }): Observable<any> {
    return this.http.post(`${this.formapiUrl}/applyjob`, data);
  }

   saveForJob(data: { userId: string; jobId: string }): Observable<any> {
    return this.http.post(`${this.formapiUrl}/savejob`, data);
  }


updateResume(userId: number, file: File): Observable<HttpEvent<any>> {
  const formData = new FormData();
  formData.append('user_id', userId.toString());
  formData.append('resume', file);

  const req = new HttpRequest('POST', `${this.formapiUrl}/upload_resume`, formData, {
    reportProgress: true,
  });

  return this.http.request(req);
}

getResume(userId: number) {
  return this.http.get<any>(`${this.formapiUrl}/get_resume/${userId}`);
}


getEmailByUserId(userId: number): Observable<any> {
    return this.http.get(`${this.formapiUrl}/emailbyuserid/${userId}`);
  }

  updateEmail(payload: { user_id: number; email: string }): Observable<any> {
    return this.http.put(`${this.formapiUrl}/updateCandidateEmail`, payload);
  }

  getprofileByUserId(userId: number): Observable<any> {
    return this.http.get(`${this.formapiUrl}/profilepic?user_id=${userId}`);
  }

  uploadProfileImage(userId: number, file: File): Observable<any> {
  const formData = new FormData();
  formData.append('user_id', userId.toString());
  formData.append('profile_pic', file);

  const url = `${this.formapiUrl}/profilepic`;
  return this.http.post<any>(url, formData);
}


  
  
}