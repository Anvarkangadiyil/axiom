"use client";

import { Button } from "@/components/ui/button";
import { use, useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const handleBlockinhg = async () => {
    setLoading(true);
    const response = await fetch("/api/demo/blocking", { method: "POST" });
    setLoading(false);
  };

  const handleBackground = async () => {
    setLoading2(true);
    const response = await fetch("/api/demo/background", { method: "POST" });
    setLoading2(false);
  };

  const handleClientError = () => {
    throw new Error("Client Error");
  };

  const handleApiError = async () => {
    await fetch("/api/demo/error", { method: "POST" });
  };

  const handleInngestError =async () => {
    await fetch("/api/demo/inngest-error", { method: "POST" });
  };

  return (
    <div className="flex gap-1">
      <Button disabled={loading} onClick={handleBlockinhg}>
        {loading ? "Loading..." : "Blocking"}
      </Button>
      <Button disabled={loading} onClick={handleBackground}>
        {loading2 ? "Loading..." : "Background"}
      </Button>
      <Button variant="destructive" onClick={handleClientError}>
        Client Error
      </Button>
      <Button variant="destructive" onClick={handleApiError}>
        Api Error
      </Button>
      <Button variant="destructive" onClick={handleInngestError}>
        Inngest Error
      </Button>
    </div>
  );
}
