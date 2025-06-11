import { Component, OnInit } from '@angular/core';
import { StatusBar,Style as StatusBarStyle } from '@capacitor/status-bar';

@Component({
  selector: 'app-explore-tab',
  templateUrl: './explore-tab.page.html',
  styleUrls: ['./explore-tab.page.scss'],
})
export class ExploreTabPage implements OnInit {

  constructor() { }

  ngOnInit() {
    // StatusBar.setBackgroundColor({ color: '#ffffff' }); // white
      // Set the status bar style to dark (black text/icons)
      // StatusBar.setStyle({ style: StatusBarStyle.Dark });
  }

}
