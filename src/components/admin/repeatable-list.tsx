"use client";

import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";

type Row<T> = { key: number; value: T };

type RepeatableListProps<T> = {
  defaultItems: readonly T[];
  onChange: (items: T[]) => void;
  createItem: () => T;
  renderItem: (item: T, update: (patch: Partial<T>) => void, index: number) => React.ReactNode;
  itemLabel: (index: number) => string;
  addLabel: string;
  max?: number;
  error?: string;
  emptyText?: string;
};

export function RepeatableList<T>({ defaultItems, onChange, createItem, renderItem, itemLabel, addLabel, max, error, emptyText }: RepeatableListProps<T>) {
  const nextKey = useRef(defaultItems.length);
  const [rows, setRows] = useState<Row<T>[]>(() => defaultItems.map((value, key) => ({ key, value })));

  const commit = (next: Row<T>[]) => {
    setRows(next);
    onChange(next.map((row) => row.value));
  };
  const move = (index: number, offset: number) => {
    const target = index + offset;
    if (target < 0 || target >= rows.length) return;
    const next = [...rows];
    [next[index], next[target]] = [next[target], next[index]];
    commit(next);
  };

  return (
    <div className="flex flex-col gap-2.5">
      {rows.length === 0 && emptyText && <p className="rounded-md border border-dashed border-border px-3 py-4 text-center text-sm text-ink-muted">{emptyText}</p>}
      {rows.map((row, index) => (
        <div key={row.key} className="flex flex-col gap-3 rounded-md border border-border bg-canvas/60 p-3">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[13px] font-semibold text-ink">{itemLabel(index)}</p>
            <div className="flex items-center gap-0.5">
              <Button type="button" variant="ghost" size="icon" className="size-8" disabled={index === 0} onClick={() => move(index, -1)} aria-label={`Naikkan ${itemLabel(index)}`}>
                <ArrowUp aria-hidden="true" />
              </Button>
              <Button type="button" variant="ghost" size="icon" className="size-8" disabled={index === rows.length - 1} onClick={() => move(index, 1)} aria-label={`Turunkan ${itemLabel(index)}`}>
                <ArrowDown aria-hidden="true" />
              </Button>
              <Button type="button" variant="ghost" size="icon" className="size-8 text-brand" onClick={() => commit(rows.filter((item) => item.key !== row.key))} aria-label={`Hapus ${itemLabel(index)}`}>
                <Trash2 aria-hidden="true" />
              </Button>
            </div>
          </div>
          {renderItem(row.value, (patch) => commit(rows.map((item) => (item.key === row.key ? { ...item, value: { ...item.value, ...patch } } : item))), index)}
        </div>
      ))}
      {error && (
        <p role="alert" className="text-xs leading-[1.28] text-brand">
          {error}
        </p>
      )}
      <Button
        type="button"
        variant="outline"
        className="h-10 w-fit px-4"
        disabled={max !== undefined && rows.length >= max}
        onClick={() => {
          nextKey.current += 1;
          commit([...rows, { key: nextKey.current, value: createItem() }]);
        }}
      >
        <Plus data-icon="inline-start" aria-hidden="true" />
        {addLabel}
      </Button>
    </div>
  );
}
