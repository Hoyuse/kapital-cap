import React from 'react';

/**
 * Modern, cybernetic, low-profile skeleton cards matching Kapital Cap's aesthetic guidelines.
 * Features grid meshes, pulsing gradients, and subtle tech metadata readouts.
 */

// Skeleton for the "Otros Drops" cards on the main collections page
export function DropCardSkeleton() {
  return (
    <div className="flex flex-col justify-between animate-pulse">
      {/* Aspect 3:4 shimmer box with sleek clip-path corner cut */}
      <div className="relative aspect-[3/4] mb-4 bg-zinc-950 border border-zinc-900/60 overflow-hidden [clip-path:polygon(0_0,_100%_0,_100%_98%,_0_100%)] flex flex-col justify-between p-3">
        {/* Subtle decorative mesh background and cyber-dots to simulate the real canvas */}
        <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
        
        {/* Iridescent diagonal shimmer band moving continuously */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-900/40 to-transparent -translate-x-full animate-[shimmer_1.8s_infinite] pointer-events-none" />

        {/* Pulse elements to match actual content card anchors */}
        <div className="flex justify-between items-center text-[7px] font-mono text-zinc-800 tracking-wider">
          <span>KPTL_F_SHM</span>
          <span>SYS_PULSE_99</span>
        </div>

        {/* Center glowing vector glyph skeleton */}
        <div className="mx-auto w-10 h-10 border border-zinc-900 bg-zinc-900/40 rounded-full flex items-center justify-center">
          <div className="w-4 h-4 bg-zinc-800/60 rounded-full animate-ping" />
        </div>

        <div className="flex justify-between items-center text-[7px] font-mono text-zinc-800">
          <span>MATERIAL_CALIBRATING</span>
          <span>LATENCY // 03ms</span>
        </div>
      </div>

      {/* Under-card text wireframes */}
      <div className="space-y-2 mt-1">
        <div className="h-3 bg-zinc-900/70 rounded-xs w-3/4 animate-pulse" />
        <div className="h-2 bg-zinc-900/40 rounded-xs w-1/3 animate-pulse" />
      </div>
    </div>
  );
}

// Skeleton for the larger catalog-style elements in the Kapital Archive
export function ArchiveCardSkeleton() {
  return (
    <div className="p-4 border border-zinc-950/40 bg-zinc-950/20 aspect-[3/4.2] flex flex-col justify-between animate-pulse">
      
      {/* Decorative main visual bounds */}
      <div className="relative aspect-[3/3.8] bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 border border-zinc-900 overflow-hidden mb-4 [clip-path:polygon(0_0,_100%_0,_100%_98%,_0_100%)] flex flex-col justify-between p-4">
        {/* Embedded design lines */}
        <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />
        
        {/* Tech header status indicator */}
        <div className="flex justify-between items-center">
          <div className="h-3.5 w-16 bg-zinc-900 text-zinc-600 block rounded-xs" />
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/40 animate-pulse" />
        </div>

        {/* Big subtle abstract logo inside the loading container to resemble a crown or cap */}
        <div className="w-full h-1/2 flex items-center justify-center opacity-25">
          <div className="w-16 h-12 border border-zinc-800 bg-zinc-950 relative flex items-center justify-center">
            <div className="absolute top-0 bottom-0 left-[49%] w-[1px] bg-zinc-800" />
            <span className="text-[9px] font-mono text-zinc-650">SYS_RENDER</span>
          </div>
        </div>

        {/* Tech footer status tracker */}
        <div className="flex justify-between font-mono text-[7px] text-zinc-800">
          <span>TRACK_ID: CALIBRATING...</span>
          <span>100% DIGITAL ASSURE</span>
        </div>
      </div>

      {/* Under-card info labels */}
      <div className="space-y-2.5">
        <div className="flex justify-between items-center gap-2">
          {/* Title wireframe */}
          <div className="h-3.5 bg-zinc-900/80 rounded-xs w-2/3" />
          {/* Arrow wireframe */}
          <div className="w-3.5 h-3.5 bg-zinc-900/60 rounded-xs" />
        </div>
        
        {/* Metadata stats wireframe row */}
        <div className="flex justify-between items-center pt-1">
          <div className="h-2 bg-zinc-900/40 rounded-xs w-1/2" />
          <div className="h-2.5 bg-zinc-900/60 rounded-xs w-1/4" />
        </div>
      </div>

    </div>
  );
}
