"use client"

import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowUp } from "lucide-react"

const Page = () => {
  const [value, setValue] = useState("");

  const trpc = useTRPC();
  const invoke = useMutation(trpc.invoke.mutationOptions({
    onSuccess: () => {
      toast.success("we shipped it bestie 💅");
      setValue("");
    }
  }));

  const suggestions = [
    { emoji: "📺", text: "drop a netflix clone rq" },
    { emoji: "👨‍💼", text: "whip up an admin dash" },
    { emoji: "📋", text: "slap together a kanban board" },
    { emoji: "📁", text: "cook a file manager" },
    { emoji: "📹", text: "clone youtube but make it ✨aesthetic✨" },
    { emoji: "🛍️", text: "build a whole shein 2.0" },
    { emoji: "🏠", text: "airbnb but make it unhinged" },
    { emoji: "🎵", text: "spotify wrapped but for the girlies" },
  ]

  const handleSuggestion = (suggestion) => {
    setValue(suggestion)
  }

  return (
    <main className="h-screen flex flex-col items-center justify-center px-4 py-12 bg-background relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, #000 2px, transparent 3px)`,
          backgroundSize: '24px 24px'
        }}
      />
      <div className="flex flex-col items-center w-full relative z-10">
        <div className="mb-6">
          <img src="/logo.svg" alt="Logo" className="w-15 h-15 rounded-xl object-cover" />
        </div>

        <div className="max-w-4xl text-center mb-15">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-none tracking-tight">
            ship apps faster than your situationship can ghost
          </h1>
          <p className="text-lg text-muted-foreground mt-4">
            let the ai do the coding while you manifest ur main-character moment
          </p>
        </div>

        <div className="max-w-3xl w-full mb-10">
          <div className="relative">
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && value.trim()) {
                  invoke.mutate({ value: value })
                }
              }}
              placeholder="drop your app idea..."
              className="w-full rounded-2xl px-6 py-6 text-base pr-16 h-auto border border-text-muted-foreground backdrop-blur-sm bg-background/60"
            />
            <button
              disabled={invoke.isPending || !value.trim()}
              onClick={() => invoke.mutate({ value: value })}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed rounded-full p-2.5 transition-all"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-3 text-center">
            smash <kbd className="inline-block px-1 py-0.5 bg-muted rounded text-xs border">enter</kbd> to manifest
          </p>
        </div>

        <div className="max-w-3xl w-full">
          <div className="flex flex-wrap justify-center gap-3">
            {suggestions.map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => handleSuggestion(suggestion.text)}
                className="inline-flex items-center gap-2.5 px-4 py-3 bg-card hover:bg-accent border rounded-xl transition-all text-sm font-normal text-left"
              >
                <span className="text-base">{suggestion.emoji}</span>
                <span className="text-sm">{suggestion.text}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Page