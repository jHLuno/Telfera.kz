// Google Tag Manager dataLayer type declarations
interface DataLayerEvent {
  event: string;
  [key: string]: unknown;
}

interface Window {
  dataLayer: DataLayerEvent[];
}
