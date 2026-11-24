import Script from "next/script";

type SnapScriptProps = {
  src: string;
  clientKey?: string;
};

export function SnapScript({ src, clientKey }: SnapScriptProps) {
  return clientKey ? <Script src={src} data-client-key={clientKey} strategy="lazyOnload" /> : null;
}
