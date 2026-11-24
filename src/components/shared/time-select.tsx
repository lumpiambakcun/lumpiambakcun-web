import { SelectField } from "@/components/shared/select-field";

type TimeSelectProps = {
  id: string;
  name: string;
  opens: string;
  closes: string;
  step?: number;
  placeholder?: string;
} & Pick<React.ComponentProps<typeof SelectField>, "aria-invalid" | "aria-describedby">;

const toMinutes = (clock: string) => {
  const [hours, minutes] = clock.split(/[.:]/).map(Number);
  return hours * 60 + minutes;
};
const toClock = (minutes: number) => `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;

export function TimeSelect({ opens, closes, step = 30, placeholder = "Pilih jam", ...props }: TimeSelectProps) {
  const options = [];
  for (let time = toMinutes(opens); time <= toMinutes(closes); time += step) {
    const value = toClock(time);
    options.push({ value, label: `${value.replace(":", ".")} WIB` });
  }
  return <SelectField options={options} placeholder={placeholder} {...props} />;
}
