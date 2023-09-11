import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProductService } from 'src/app/services/product-service.service';
import { UserLoginService } from '../../services/user-login.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  images: string[] = [];
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private loginService: UserLoginService,
    private http: HttpClient
  ){}
    ngOnInit() {
      this.getImages();
    }

    getImages() {
    fetch('http://localhost:3000/image-list')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch image list');
        }
        return response.json();
      })
      .then((data) => {
        const imageList: string[] = data.images;
        console.log(imageList)

        // Check if the current page is the homepage
        if (window.location.pathname === '/homepage') {
          // Save each image URL in the array
          imageList.forEach((imageName: string) => {
            const imageURL = `http://localhost:3000/images/${imageName}`;
            this.images.push(imageURL);
            console.log(this.images)
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
    }

    displayImages(images: string[]) {
      // Get the image container element
      const imageContainer = document.querySelector('.image-container');
  
      // Loop through the images and create image elements
      images.forEach((imageName) => {
        // Create a new image element
        const imageElement = document.createElement('div');
        imageElement.classList.add('image-item');
        const img = document.createElement('img');
        img.alt = imageName;
        imageElement.appendChild(img);
  
        // Append the image element to the container
        imageContainer?.appendChild(imageElement);
      });
    }
  
    listProduct() {
      this.router.navigate(['/listproduct']);
    }
  
    logout() {
      this.authService.logout();
    }
}
