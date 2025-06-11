// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-creative-loader',
//   templateUrl: './creative-loader.component.html',
//   styleUrls: ['./creative-loader.component.scss'],
// })
// export class CreativeLoaderComponent  implements OnInit {

//   constructor() { }

//   ngOnInit() {}

// }


import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-creative-loader',
  templateUrl: './creative-loader.component.html',
  styleUrls: ['./creative-loader.component.scss']
})
export class CreativeLoaderComponent implements OnInit {
  // isLoading$ = this.loadingService.loading$;
   isLoading$ = this.loadingService.loading$; // ✅ Now correctly defined

  
  images = [
    'assets/loader1.png',
    'assets/loader2.png',
    'assets/loader3.png'
  ];

  currentIndex = 0;

  constructor(private loadingService: LoadingService) {}

  ngOnInit() {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 1000);
  }
}

