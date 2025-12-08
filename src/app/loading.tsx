import { Icons } from "@/components/icons";

export default function Loading() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 p-12">
      <Icons.spinner className="h-12 w-12 animate-spin text-primary" />
      <div className="text-center">
        <p className="text-lg font-semibold">Loading Solution Hub</p>
        <p className="text-sm text-muted-foreground">Please wait a moment...</p>
      </div>
    </div>
  );
}
