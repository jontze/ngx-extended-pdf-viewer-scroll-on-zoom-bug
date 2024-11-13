import { Component, ChangeDetectionStrategy, signal, ChangeDetectorRef } from '@angular/core';
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
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExamplePdfViewerComponent {
  constructor(private readonly pdfService: NgxExtendedPdfViewerService) {}

  pdfLoaded = false;
  pdfPagesCount = 0;
  pdfSetZoom: string | number = 'page-width';
  pdfReportedZoom = 100;
  pdfCurrentPage = 1;

  // START: NgxExtendedPdfViewer Callbacks
  onPdfLoaded(event: PdfLoadedEvent) {
    console.debug("NgxExtendedPdfViewer: PdfLoaded ", event)
    this.pdfPagesCount = event.pagesCount;
    this.pdfLoaded = true;
  }
  onCurrentZoomFactorChange(zoom: number) {
    console.debug("NgxExtendedPdfViewer: ZoomFactorChange ", zoom)
    this.pdfReportedZoom = Math.round(zoom * 100);
  }
  onPageChange(pageNumber: number) {
    console.debug("NgxExtendedPdfViewer: PageChange ", pageNumber)
    this.pdfCurrentPage = pageNumber;
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
    this.pdfSetZoom = this.pdfReportedZoom - 15;
  }
  onZoomInClicked() {
    this.pdfSetZoom = this.pdfReportedZoom + 15;
  }
  onPrevPageClicked() {
    this.pdfCurrentPage -= 1;
  }
  onNextPageClicked() {
    this.pdfCurrentPage += 1;
  }
  // END: Custom Toolbar Callbacks
}
