"use client";

import { useEffect } from "react";
import { profile, projects } from "@/lib/data";
import { projectSlugs } from "@/lib/case-studies";

type Tool = {
 name: string;
 description: string;
 inputSchema: Record<string, unknown>;
 execute: (input: Record<string, unknown>) => Promise<unknown>;
};
type ModelContext = { registerTool: (tool: Tool, options?: { signal: AbortSignal }) => Promise<void> | void; unregisterTool?: (name: string) => void };

export default function AgentTools() {
 useEffect(() => {
  const context = (document as Document & { modelContext?: ModelContext }).modelContext
   ?? (navigator as Navigator & { modelContext?: ModelContext }).modelContext;
  if (!context?.registerTool) return;
  const controller = new AbortController();
  const registered: string[] = [];
  const tools: Tool[] = [
   { name: "get_portfolio_profile", description: "Read Charbel Mdawar's public professional profile and contact links. Does not contact anyone.", inputSchema: { type: "object", properties: {}, additionalProperties: false }, execute: async () => profile },
   { name: "find_portfolio_projects", description: "Find public portfolio projects by name, description, or technology. Returns case-study URLs.", inputSchema: { type: "object", properties: { query: { type: "string", maxLength: 200, description: "Search phrase; omit to list all projects." } }, additionalProperties: false }, execute: async ({ query = "" }) => {
    if (typeof query !== "string" || query.length > 200) throw new Error("query must be a string of at most 200 characters");
    const term = query.trim().toLowerCase();
    return projects.map((project, i) => ({ ...project, url: new URL(`/work/${projectSlugs[i]}`, location.origin).href }))
     .filter(project => `${project.name} ${project.description} ${project.stack.join(" ")}`.toLowerCase().includes(term));
   } },
  ];
  for (const tool of tools) {
   try {
    const result = context.registerTool(tool, { signal: controller.signal });
    registered.push(tool.name);
    Promise.resolve(result).catch(error => { if (!controller.signal.aborted) console.warn(`WebMCP registration failed: ${tool.name}`, error); });
   } catch (error) { console.warn(`WebMCP registration failed: ${tool.name}`, error); }
  }
  return () => {
   controller.abort();
   // Legacy navigator.modelContext implementations use explicit unregistration.
   for (const name of registered) { try { context.unregisterTool?.(name); } catch { /* Already removed by abort. */ } }
  };
 }, []);
 return null;
}
