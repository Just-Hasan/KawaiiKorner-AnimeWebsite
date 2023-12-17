export function ErrorMessage({ message }) {
  return (
    <p className="self-center grid place-content-center rounded-xl mb-12 text-2xl font-black col-span-full bg-tailwindColorGray h-[300px] text-accent">
      {message}
    </p>
  );
}
