import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import {
  NgxExtendedPdfViewerModule,
  NgxExtendedPdfViewerService,
  pdfDefaultOptions,
  PdfLoadedEvent,
} from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'app-example-pdf-viewer',
  templateUrl: './example-pdf-viewer.component.html',
  styleUrls: ['./example-pdf-viewer.component.css'],
  standalone: true,
  imports: [NgxExtendedPdfViewerModule],
  providers: [NgxExtendedPdfViewerService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExamplePdfViewerComponent {
  constructor(private readonly pdfService: NgxExtendedPdfViewerService) {}

  pdfLoaded = signal(false);
  pdfPagesCount = signal(0);
  pdfSetZoom = signal<string | number>('page-width');
  pdfReportedZoom = 100;
  pdfCurrentPage = signal(1);

  // START: NgxExtendedPdfViewer Callbacks
  onPdfLoaded(event: PdfLoadedEvent) {
    console.debug("NgxExtendedPdfViewer: PdfLoaded ", event)
    this.pdfPagesCount.set(event.pagesCount);
    this.pdfLoaded.set(true);
  }
  onCurrentZoomFactorChange(zoom: number) {
    console.debug("NgxExtendedPdfViewer: ZoomFactorChange ", zoom)
    this.pdfReportedZoom = Math.round(zoom * 100);
  }
  onPageChange(pageNumber: number) {
    console.debug("NgxExtendedPdfViewer: PageChange ", pageNumber)
    this.pdfCurrentPage.set(pageNumber);
    /**
     * Workaround:
     * setTimeout(() => {
     *  const pageFromSerivce = this.pdfService.currentPageIndex();
     *  if(pageFromSerivce != null) {
     *   this.pdfCurrentPage.set(pageFromSerivce + 1)
     *  }
     * }, 0)
     */
  }
  // END: NgxExtendedPdfViewer Callbacks

  // START: Custom Toolbar Callbacks
  onZoomOutClicked() {
    this.pdfSetZoom.set(this.pdfReportedZoom - 15);
  }
  onZoomInClicked() {
    this.pdfSetZoom.set(this.pdfReportedZoom + 15);
  }
  onPrevPageClicked() {
    this.pdfCurrentPage.update((curr) => curr - 1);
  }
  onNextPageClicked() {
    this.pdfCurrentPage.update((curr) => curr + 1);
  }
  // END: Custom Toolbar Callbacks
}
