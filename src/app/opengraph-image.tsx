import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Axiom - The AI-Powered Cloud IDE";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#050508",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "80px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Ambient Red Glow */}
        <div
          style={{
            position: "absolute",
            bottom: "-150px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "800px",
            height: "400px",
            borderRadius: "50%",
            background: "rgba(239, 68, 68, 0.15)",
            filter: "blur(100px)",
            pointerEvents: "none",
          }}
        />

        {/* Left Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            maxWidth: "500px",
            zIndex: 10,
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "40px",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #EF4444 0%, #B91C1C 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 20px rgba(239, 68, 68, 0.5)",
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <span
              style={{
                fontSize: "36px",
                fontWeight: "bold",
                color: "white",
                letterSpacing: "-0.05em",
              }}
            >
              Axiom
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: "52px",
              fontWeight: 800,
              color: "white",
              lineHeight: 1.15,
              margin: 0,
              marginBottom: "20px",
              letterSpacing: "-0.03em",
            }}
          >
            Describe it.
            <br />
            <span style={{ color: "#EF4444" }}>Build it.</span> Ship it.
          </h1>

          {/* Description */}
          <p
            style={{
              fontSize: "20px",
              color: "#A1A1AA",
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            A browser-based cloud IDE with an autonomous AI agent that builds entire apps from a single prompt. No local setup.
          </p>
        </div>

        {/* Right Content - Mock IDE Window */}
        <div
          style={{
            width: "520px",
            height: "360px",
            background: "rgba(20, 20, 25, 0.7)",
            borderRadius: "16px",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5), 0 0 30px rgba(239, 68, 68, 0.05)",
            overflow: "hidden",
            zIndex: 10,
          }}
        >
          {/* IDE Header */}
          <div
            style={{
              height: "40px",
              background: "rgba(10, 10, 12, 0.8)",
              borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
              display: "flex",
              alignItems: "center",
              padding: "0 16px",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", gap: "6px" }}>
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#EF4444" }} />
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#F59E0B" }} />
              <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#10B981" }} />
            </div>
            <span style={{ fontSize: "12px", color: "#71717A", fontFamily: "monospace" }}>
              axiom://workspace/app.tsx
            </span>
            <div style={{ width: "36px" }} />
          </div>

          {/* IDE Code Area */}
          <div
            style={{
              flex: 1,
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              fontFamily: "monospace",
              fontSize: "14px",
              lineHeight: 1.6,
              color: "#E4E4E7",
            }}
          >
            <div style={{ display: "flex", color: "#71717A" }}>
              <span style={{ marginRight: "16px" }}>1</span>
              <span>
                <span style={{ color: "#F43F5E" }}>import</span>{" "}
                <span style={{ color: "#38BDF8" }}>{"{ useState }"}</span>{" "}
                <span style={{ color: "#F43F5E" }}>from</span>{" "}
                <span style={{ color: "#34D399" }}>&quot;react&quot;</span>;
              </span>
            </div>
            <div style={{ display: "flex", color: "#71717A" }}>
              <span style={{ marginRight: "16px" }}>2</span>
              <span>
                <span style={{ color: "#F43F5E" }}>export default function</span>{" "}
                <span style={{ color: "#FBBF24" }}>Dashboard</span>() {"{"}
              </span>
            </div>
            <div style={{ display: "flex", color: "#71717A" }}>
              <span style={{ marginRight: "16px" }}>3</span>
              <span>
                &nbsp;&nbsp;<span style={{ color: "#F43F5E" }}>const</span> [data] ={" "}
                <span style={{ color: "#38BDF8" }}>useState</span>([]);
              </span>
            </div>
            <div style={{ display: "flex", color: "#71717A" }}>
              <span style={{ marginRight: "16px" }}>4</span>
              <span>
                &nbsp;&nbsp;<span style={{ color: "#F43F5E" }}>return</span> (
              </span>
            </div>
            <div style={{ display: "flex", color: "#71717A" }}>
              <span style={{ marginRight: "16px" }}>5</span>
              <span style={{ color: "#34D399" }}>
                &nbsp;&nbsp;&nbsp;&nbsp;&lt;<span style={{ color: "#F43F5E" }}>div</span> className=
                <span style={{ color: "#38BDF8" }}>&quot;bg-red-950/20 text-red-500&quot;</span>&gt;
              </span>
            </div>

            {/* Prompt input Overlay */}
            <div
              style={{
                marginTop: "auto",
                background: "rgba(239, 68, 68, 0.1)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                borderRadius: "8px",
                padding: "12px 16px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#EF4444"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
              <span style={{ fontSize: "13px", color: "#F3F4F6" }}>
                AI Agent: Creating dashboard component...
              </span>
              <span
                style={{
                  width: "2px",
                  height: "15px",
                  background: "#EF4444",
                  animation: "pulse 1s infinite",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
