"use client";

import { ImagePlus, RefreshCw, Trash2, Upload } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { FormField } from "@/components/shared/form-field";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const ACCEPT = ["image/jpeg", "image/png", "image/webp"];
const MAX_BYTES = 2 * 1024 * 1024;

type PhotoDropzoneProps = {
  id: string;
  name: string;
  label: string;
  initialSrc?: string;
  error?: string;
  className?: string;
  boxClassName?: string;
  sizes?: string;
  onFileChange?: () => void;
  hideLabel?: boolean;
  compact?: boolean;
};

export function PhotoDropzone({ id, name, label, initialSrc, error, className, boxClassName = "size-[150px]", sizes = "150px", onFileChange, hideLabel, compact }: PhotoDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [clientError, setClientError] = useState("");
  const [dragging, setDragging] = useState(false);

  useEffect(
    () => () => {
      if (preview) URL.revokeObjectURL(preview);
    },
    [preview],
  );

  const clear = () => {
    if (inputRef.current) inputRef.current.value = "";
    setPreview(null);
    onFileChange?.();
  };

  const accept = (file: File | undefined) => {
    if (!file) return;
    if (!ACCEPT.includes(file.type)) {
      clear();
      return setClientError("Format harus JPG, PNG, atau WebP.");
    }
    if (file.size > MAX_BYTES) {
      clear();
      return setClientError("Ukuran foto maksimal 2 MB.");
    }
    setClientError("");
    if (inputRef.current) {
      const transfer = new DataTransfer();
      transfer.items.add(file);
      inputRef.current.files = transfer.files;
    }
    setPreview(URL.createObjectURL(file));
    onFileChange?.();
  };

  const message = clientError || error;
  const src = preview ?? initialSrc;
  const describedBy = message ? `${id}-error` : undefined;

  const fileInput = (
    <input ref={inputRef} type="file" name={name} accept={ACCEPT.join(",")} tabIndex={-1} aria-hidden="true" className="sr-only" onChange={(event) => accept(event.target.files?.[0])} />
  );

  const dropHandlers = {
    onDragOver: (event: React.DragEvent) => {
      event.preventDefault();
      setDragging(true);
    },
    onDragLeave: () => setDragging(false),
    onDrop: (event: React.DragEvent) => {
      event.preventDefault();
      setDragging(false);
      accept(event.dataTransfer.files[0]);
    },
  };

  const compactBody = (
    <div className="flex w-fit flex-col items-center gap-2">
      {fileInput}
      <button
        id={id}
        type="button"
        aria-label={`${label}: pilih file`}
        aria-describedby={describedBy}
        onClick={() => inputRef.current?.click()}
        {...dropHandlers}
        className={cn("group relative grid place-items-center overflow-hidden rounded-lg border bg-white text-ink-muted outline-none focus-visible:ring-2 focus-visible:ring-ring", boxClassName, message ? "border-brand" : dragging ? "border-brand bg-muted" : "border-border")}
      >
        {src ? <Image src={src} alt="Pratinjau foto" fill sizes={sizes} unoptimized={Boolean(preview)} className="object-contain p-1" /> : <ImagePlus className="size-6" aria-hidden="true" />}
        <span aria-hidden="true" className="absolute inset-0 grid place-items-center bg-ink/55 text-white opacity-0 transition-opacity group-focus-visible:opacity-100 group-hover:opacity-100 motion-reduce:transition-none">
          <Upload className="size-5" />
        </span>
      </button>
      <button type="button" onClick={() => inputRef.current?.click()} aria-describedby={describedBy} className="rounded-sm text-xs font-medium text-brand outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring">
        Ganti
      </button>
    </div>
  );

  const body = compact ? compactBody : (
    <>
      {fileInput}
      <div
        {...dropHandlers}
        className={cn(
          "group relative overflow-hidden rounded-lg border-2 border-dashed bg-white",
          boxClassName,
          message ? "border-brand" : dragging ? "border-brand bg-muted" : "border-border",
          src && "border-solid",
        )}
      >
        {src ? (
          <>
            <Image src={src} alt="Pratinjau foto" fill sizes={sizes} unoptimized={Boolean(preview)} className="object-cover" />
            <div className="absolute inset-x-0 bottom-0 flex justify-center gap-1.5 bg-ink/70 p-2 opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100 [@media(hover:none)]:opacity-100">
              <Button id={id} type="button" size="sm" variant="outline" className="h-8 bg-white px-2.5 text-xs" aria-describedby={describedBy} onClick={() => inputRef.current?.click()}>
                <RefreshCw aria-hidden="true" />
                Ganti
              </Button>
              {preview && (
                <Button type="button" size="sm" variant="outline" className="h-8 bg-white px-2.5 text-xs" onClick={clear}>
                  <Trash2 aria-hidden="true" />
                  Hapus
                </Button>
              )}
            </div>
          </>
        ) : (
          <button
            id={id}
            type="button"
            aria-describedby={describedBy}
            onClick={() => inputRef.current?.click()}
            className="flex size-full flex-col items-center justify-center gap-2 p-3 text-center text-ink-muted outline-none hover:bg-muted focus-visible:bg-muted"
          >
            <ImagePlus className="size-6" aria-hidden="true" />
            <span className="text-xs leading-[1.3] font-semibold text-ink">Klik atau seret foto ke sini</span>
            <span className="text-[11px] leading-[1.3]">JPG, PNG, WebP, maks 2 MB</span>
          </button>
        )}
      </div>
    </>
  );

  if (!hideLabel) {
    return (
      <FormField id={id} label={label} error={message} tone="admin" className={className}>
        {body}
      </FormField>
    );
  }
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Label htmlFor={id} className="sr-only">
        {label}
      </Label>
      {body}
      {message && (
        <p id={`${id}-error`} role="alert" className="text-xs leading-[1.28] text-brand">
          {message}
        </p>
      )}
    </div>
  );
}
