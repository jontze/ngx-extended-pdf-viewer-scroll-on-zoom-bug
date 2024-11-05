import { Routes } from '@angular/router';
import { ExamplePdfViewerComponent } from './example-pdf-viewer/example-pdf-viewer.component';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "example",
        pathMatch: "full"
    },
    {
        path: "example",
        component: ExamplePdfViewerComponent
    }
];
