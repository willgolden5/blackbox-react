import { pdfjs, Document, Page } from "react-pdf";
import { useResizeObserver } from "@wojtekmaj/react-hooks";

import type { PDFDocumentProxy } from "pdfjs-dist";
import { useCallback, useState } from "react";
import { PanelProps } from "./types";
import Accordion from "../DesignSystem/Accordion";
import { set } from "zod";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url,
).toString();
const resizeObserverOptions = {};
const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

type PanelAccordionProps = {
  register: any;
  errors: any;
  control: any;
};
const AgreementsPanel = ({
  register,
  errors,
  control,
}: PanelAccordionProps) => {
  const [numPages, setNumPages] = useState<number>();
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>();

  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width - 50);
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  const questionsAndAnswers = [
    {
      question: "Alpaca Customer Agreement",
      answer: (
        <Document
          file={"./AlpacaCustomerAgreement.pdf"}
          onLoadSuccess={onDocumentLoadSuccess}
          options={options}
          className="flex max-h-[60vh] w-full flex-col overflow-auto align-middle"
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              className="h-[100%] w-full"
              width={containerWidth}
            />
          ))}
        </Document>
      ),
    },
    {
      question: "Alpaca Margin Agreement",
      answer: (
        <Document
          file={"./AlpacaMarginAgreement.pdf"}
          onLoadSuccess={onDocumentLoadSuccess}
          options={options}
          className="flex max-h-[60vh] w-full flex-col overflow-auto align-middle"
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              className="h-[100%] w-full"
              width={containerWidth}
            />
          ))}
        </Document>
      ),
    },
  ];

  function onDocumentLoadSuccess({
    numPages: nextNumPages,
  }: PDFDocumentProxy): void {
    setNumPages(nextNumPages);
  }
  return (
    <div
      className="max-w-[calc(100% - 2em)] w-full space-y-4 p-2"
      ref={setContainerRef}
    >
      {questionsAndAnswers.map((item, index) => (
        <Accordion
          key={index}
          question={item.question}
          answer={item.answer}
          name={`accordion-${index}`} // Unique name for each accordion
          control={control}
        />
      ))}
    </div>
  );
};

export default AgreementsPanel;
