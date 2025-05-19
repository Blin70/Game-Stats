import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="w-full h-5/6 absolute flex items-center justify-center">
      <LoaderCircle className="animate-spin size-16" />
    </div>
  );
}