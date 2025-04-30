import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: false, // Definido como false
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  expanded: boolean = false; // Controla a expansão da barra lateral
}
