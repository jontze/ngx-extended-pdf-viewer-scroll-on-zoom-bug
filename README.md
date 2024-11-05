# Demonstration: Bug on Changing Page during Zoom

This Repo includes a minimal reproducible example on a potential bug in the usage of the [ngx-extended-pdf-viewer](https://www.npmjs.com/package/ngx-extended-pdf-viewer) library.

## Precondition
This Bug only appears when using a Custom Toolbar. The Bug doesn't appear with the default toolbar that comes with the pdf viewer.

## Reproduction Steps

1. Start the App with `npm start`
2. Go to `http://localhost:4200`
3. When the PDF is loaded, scroll to the next page but so that the previous page is still slighlty visible in the pdf preview
4. Now Click on the `+` Button to Zoom in

## Expected Behaviour
The PDF Viewer should show the same page as before but with increased zoom.

## Actual Behaviour
The PDF Viewer jumps to the previous page and increases the zoom.

## Possible Reasons and Solutions

If I change the zoom level of the PDFViewer via the `zoom` input this causes the `pageChange` output event to emit with the previous page, but only if the previous page is still slighlty in the viewport.

It might also just be a timing issue as I could workaround this behaviour by reading the page of the pdf viewer via the service with a minimal delay like this:

```ts
 // Called on every emittion of the `pageChange` output
 onPageChange(pageNumber: number) {
    console.debug("NgxExtendedPdfViewer: PageChange ", pageNumber)
     // Workaround
     setTimeout(() => {
      const pageFromSerivce = this.pdfService.currentPageIndex();
      if(pageFromSerivce != null) {
        this.pdfCurrentPage.set(pageFromSerivce + 1)
       }
     }, 0)
  }

```

I think a solution might be to suppress the potential unintended output emittion of the `pageChange` output on a `zoom` change.
