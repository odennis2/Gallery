import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product-service.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserLoginComponent } from '../user-login/user-login.component';
import { UserLoginService } from 'src/app/services/user-login.service';
import { Image } from 'src/app/models/image-model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent {
  imageName: string = '';
  selectedImage: File | null = null; // Track the selected image file

  constructor(
    private authService: AuthenticationService,
    private loginService: UserLoginService,
    private http: HttpClient,
    private router: Router) { }

  ngOnInit() {
    this.loginService.getUserID();
  }

  handleImageUpload(event: any): void {
    const file = event.target.files[0]; // Get the selected file from the event
    this.selectedImage = file;
    console.log(file, "handleImageUpload");
  }

  goBack() {
    this.router.navigate(['/homepage']);
  }

  submitListing() {
    // Create a new FormData object to store the product data and image file
    const formData: FormData = new FormData();
    if (this.selectedImage instanceof File) {
      formData.append('image', this.selectedImage);
    }

    console.log("FormData entries:");
    formData.forEach((value, key) => {
      console.log(key, value);
    });

    console.log(formData, "Submit listing");
    console.log(this.selectedImage, "Before post call");
    this.http.post("http://localhost:3000/upload", formData).subscribe(
      (response: any) => {
        console.log(response); // Handle the response from the server
      },
      (error: any) => {
        console.log(this.selectedImage, "Post call ERROR section");
        console.error('Error:', error); // Handle the error, if any
      }
    );
      //Reset the form fields
      this.imageName = '';
      //this.selectedImage = null;
    }
  }

