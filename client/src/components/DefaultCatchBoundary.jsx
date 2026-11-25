import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function DefaultCatchBoundary({ error }) {
  const navigate = useNavigate();
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 py-24">
      <h1 className="font-display text-3xl">Something went wrong</h1>
      <p className="text-muted-foreground">{error?.message || "Please try again."}</p>
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => window.location.reload()}>Try again</Button>
        <Button asChild><Link to="/">Home</Link></Button>
        <Button variant="ghost" onClick={() => navigate(-1)}>Go back</Button>
      </div>
    </div>
  );
}
