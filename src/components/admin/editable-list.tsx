"use client";

import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { useId, useRef, useState } from "react";
import { SortableRow, SortableRows } from "@/components/admin/sortable-rows";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

type Row<T> = { key: number; value: T };

type RowSwitch<T> = {
  label: string;
  checked: (item: T) => boolean;
  patch: (checked: boolean) => Partial<T>;
};

type EditableListProps<T> = {
  defaultItems: readonly T[];
  onChange: (items: T[]) => void;
  createItem: () => T;
  itemLabel: (item: T, index: number) => string;
  renderSummary: (item: T) => React.ReactNode;
  renderEditor: (item: T, update: (patch: Partial<T>) => void, index: number) => React.ReactNode;
  rowSwitch?: RowSwitch<T>;
  addLabel: string;
  max?: number;
  error?: string;
  emptyText?: string;
  errorIndexes?: readonly number[];
  className?: string;
};

export function EditableList<T>({
  defaultItems,
  onChange,
  createItem,
  itemLabel,
  renderSummary,
  renderEditor,
  rowSwitch,
  addLabel,
  max,
  error,
  emptyText,
  errorIndexes = [],
  className,
}: EditableListProps<T>) {
  const baseId = useId();
  const nextKey = useRef(defaultItems.length);
  const [rows, setRows] = useState<Row<T>[]>(() => defaultItems.map((value, key) => ({ key, value })));
  const [openKey, setOpenKey] = useState<number | null>(null);
  const [seenErrors, setSeenErrors] = useState("");

  const errorSignature = errorIndexes.join(",");
  if (errorSignature !== seenErrors) {
    setSeenErrors(errorSignature);
    const first = errorIndexes[0];
    if (first !== undefined && rows[first]) setOpenKey(rows[first].key);
  }

  const commit = (next: Row<T>[]) => {
    setRows(next);
    onChange(next.map((row) => row.value));
  };
  const toggleId = (key: number) => `${baseId}-toggle-${key}`;
  const close = (key: number) => {
    setOpenKey(null);
    requestAnimationFrame(() => document.getElementById(toggleId(key))?.focus());
  };
  const labelOfKey = (key: number) => {
    const index = rows.findIndex((row) => row.key === key);
    return index === -1 ? "item" : itemLabel(rows[index].value, index);
  };

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {rows.length === 0 ? (
        emptyText && <p className={cn("rounded-md border border-dashed border-border px-4 py-5 text-center text-sm text-ink-muted")}>{emptyText}</p>
      ) : (
        <SortableRows
          ids={rows.map((row) => row.key)}
          labelOf={(id) => labelOfKey(Number(id))}
          onMove={(from, to) => {
            const next = [...rows];
            next.splice(to, 0, next.splice(from, 1)[0]);
            commit(next);
          }}
        >
          {rows.map((row, index) => {
            const open = openKey === row.key;
            const label = itemLabel(row.value, index);
            const panelId = `${baseId}-panel-${row.key}`;
            const update = (patch: Partial<T>) => commit(rows.map((item) => (item.key === row.key ? { ...item, value: { ...item.value, ...patch } } : item)));

            return (
              <SortableRow key={row.key} id={row.key} label={label}>
                {(handle) => (
                  <>
                    <div className="flex min-h-10 items-center gap-1 px-2">
                      {handle}
                      <button
                        id={toggleId(row.key)}
                        type="button"
                        aria-expanded={open}
                        aria-controls={open ? panelId : undefined}
                        aria-label={`${label}, ${open ? "tutup" : "ubah"}`}
                        onClick={() => setOpenKey(open ? null : row.key)}
                        className="flex min-w-0 flex-1 items-center gap-2.5 rounded-md px-2 py-1.5 text-left outline-none hover:bg-muted/60 focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        {renderSummary(row.value)}
                        {errorIndexes.includes(index) && (
                          <>
                            <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-brand" />
                            <span className="sr-only">ada isian yang salah</span>
                          </>
                        )}
                      </button>
                      {rowSwitch && <Switch aria-label={`${rowSwitch.label}: ${label}`} checked={rowSwitch.checked(row.value)} onCheckedChange={(checked) => update(rowSwitch.patch(checked))} className="mx-1" />}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button type="button" variant="ghost" size="icon" aria-label={`Aksi untuk ${label}`}>
                            <MoreHorizontal aria-hidden="true" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem onSelect={() => setOpenKey(row.key)}>
                            <Pencil aria-hidden="true" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            variant="destructive"
                            onSelect={() => {
                              if (open) setOpenKey(null);
                              commit(rows.filter((item) => item.key !== row.key));
                            }}
                          >
                            <Trash2 aria-hidden="true" />
                            Hapus
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    {open && (
                      <div
                        id={panelId}
                        role="group"
                        aria-label={`Ubah ${label}`}
                        className="border-t border-border bg-muted/40 p-4"
                        onKeyDown={(event) => {
                          if (event.defaultPrevented) return;
                          if (event.key === "Escape") {
                            event.stopPropagation();
                            close(row.key);
                          } else if (event.key === "Enter" && event.target instanceof HTMLInputElement) {
                            event.preventDefault();
                            close(row.key);
                          }
                        }}
                      >
                        {renderEditor(row.value, update, index)}
                      </div>
                    )}
                  </>
                )}
              </SortableRow>
            );
          })}
        </SortableRows>
      )}
      {error && (
        <p role="alert" className="text-xs leading-[1.28] text-brand">
          {error}
        </p>
      )}
      {(max === undefined || rows.length < max) && (
        <button
          type="button"
          onClick={() => {
            nextKey.current += 1;
            const key = nextKey.current;
            commit([...rows, { key, value: createItem() }]);
            setOpenKey(key);
          }}
          className="w-fit rounded-md px-1 py-1 text-sm font-medium text-brand outline-none hover:underline focus-visible:ring-2 focus-visible:ring-ring"
        >
          {`+ ${addLabel}`}
        </button>
      )}
    </div>
  );
}
