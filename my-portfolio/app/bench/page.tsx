"use client";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactFlow } from "@xyflow/react";
import { LoginForm } from "./Login";
import { Report } from "./report";

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

export default function Zotero() {
  const [showReport, setShowReport] = useState(false);

  const handleGenerate = () => {
    setShowReport(true);
  };

  return (
    <div>
      <div className="flex gap-6">
        <div>
          <h1 className="mb-2 text-2xl font-semibold tracking-tighter">
            Bench
          </h1>
          <p>
            This is a tool I developed and used often to help me manage my
            research papers collected and saved on Zotero, and fetch related
            papers from open source academic libraries, such as arXiv, Semantic
            Scholar, and Google Scholar for letting me know pioneer research
            updates. Also review my current status of research and plan for the
            next step.
          </p>
        </div>
        <div
          style={{ width: "150vw", height: "22vh" }}
          className="flex-shrink-1 border"
        >
          <ReactFlow nodes={initialNodes} edges={initialEdges} />
        </div>
      </div>
      <LoginForm onGenerate={handleGenerate} />
      {showReport && <Report />}
    </div>
  );
}
