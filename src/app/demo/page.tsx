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

  return (
    <div>
      <Button disabled={loading} onClick={handleBlockinhg}>
        {loading ? "Loading..." : "Blocking"}
      </Button>
         <Button disabled={loading} onClick={handleBackground}>
        {loading2 ? "Loading..." : "Background"}
      </Button>
    </div>
  );
}
