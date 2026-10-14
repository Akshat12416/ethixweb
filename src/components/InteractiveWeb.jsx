import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import spiderwebLight from '../assets/spiderweb-light.svg';
import emblemImg from '../assets/emblem-transparent-sm.webp';

const VB_W = 1234;
const VB_H = 772;
const HUB = { x: 682, y: 353 };
const EY = 0.64;

const SPOKES = [
  { angle: -160, r: 640 },
  { angle: -127, r: 600 },
  { angle: -95, r: 560 },
  { angle: -70, r: 545 },
  { angle: -49, r: 590 },
  { angle: -20, r: 630 },
  { angle: 19, r: 610 },
  { angle: 50, r: 575 },
  { angle: 85, r: 545 },
  { angle: 118, r: 520 },
  { angle: 145, r: 545 },
  { angle: 162, r: 525 },
];

const RING_FRACTIONS = [0.24, 0.42, 0.62, 0.85];

function spokePoint(spoke, f) {
  const a = (spoke.angle * Math.PI) / 180;
  return {
    x: HUB.x + Math.cos(a) * spoke.r * f,
    y: HUB.y + Math.sin(a) * spoke.r * f * EY,
  };
}

const SPOKE_PATHS = SPOKES.map((s) => {
  const tip = spokePoint(s, 1);
  return `M${HUB.x},${HUB.y} L${tip.x.toFixed(1)},${tip.y.toFixed(1)}`;
});

const RING_PATHS = RING_FRACTIONS.map((f) => {
  const pts = SPOKES.map((s) => spokePoint(s, f));
  let d = `M${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`;
  for (let i = 1; i <= pts.length; i++) {
    const p = pts[i % pts.length];
    const prev = pts[i - 1];
    const mid = { x: (p.x + prev.x) / 2, y: (p.y + prev.y) / 2 };
    const ctrl = {
      x: mid.x + (HUB.x - mid.x) * 0.13,
      y: mid.y + (HUB.y - mid.y) * 0.13,
    };
    d += ` Q${ctrl.x.toFixed(1)},${ctrl.y.toFixed(1)} ${p.x.toFixed(1)},${p.y.toFixed(1)}`;
  }
  return d;
});

const NODES = SPOKES.flatMap((s, si) =>
  RING_FRACTIONS.map((f, ri) => {
    const p = spokePoint(s, f);
    return { x: p.x, y: p.y, spoke: si, ring: ri };
  })
);

// 4 Verified Client Work Showcase Anchors attached to the spiderweb network
const WORK_ANCHORS = [
  {
    title: 'All Phase Plumbing',
    badge: 'AI Booking',
    img: '/images/case-studies/all-phase-plumbing/hero-640w.webp',
    x: 430,
    y: 120,
    spokeIndex: 1,
  },
  {
    title: 'Preventive Home',
    badge: 'Smart CRM',
    img: '/images/case-studies/preventive-home-solutions/hero-640w.webp',
    x: 940,
    y: 110,
    spokeIndex: 4,
  },
  {
    title: "Gary's Pipelining",
    badge: 'High-Ticket',
    img: '/images/case-studies/garys-pipeline/hero-1600w.webp',
    x: 380,
    y: 530,
    spokeIndex: 11,
  },
  {
    title: 'Catching Chrome',
    badge: 'Cloud Platform',
    img: '/images/case-studies/catching-chrome/hero-640w.webp',
    x: 970,
    y: 520,
    spokeIndex: 6,
  },
];

export default function InteractiveWeb({ isPreloading = false }) {
  const containerRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [activeSpoke, setActiveSpoke] = useState(-1);
  const [hoveredAnchor, setHoveredAnchor] = useState(-1);
  const animFrameRef = useRef(0);

  const handlePointerMove = (e) => {
    if (isPreloading || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;

    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(() => {
      // Gentle 3D perspective tilt following pointer
      setTilt({
        rx: Math.max(-10, Math.min(10, -ny * 8)),
        ry: Math.max(-10, Math.min(10, nx * 9)),
      });

      // Calculate nearest spoke by angle
      const u = ((e.clientX - rect.left) / rect.width) * VB_W;
      const v = ((e.clientY - rect.top) / rect.height) * VB_H;
      const dx = u - HUB.x;
      const dy = (v - HUB.y) / EY;
      const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

      let nearestSpoke = -1;
      let minDiff = 18;
      SPOKES.forEach((s, i) => {
        let diff = Math.abs(angle - s.angle);
        if (diff > 180) diff = 360 - diff;
        if (diff < minDiff) {
          nearestSpoke = i;
          minDiff = diff;
        }
      });
      setActiveSpoke(nearestSpoke);
    });
  };

  const handlePointerLeave = () => {
    setTilt({ rx: 0, ry: 0 });
    setActiveSpoke(-1);
    setHoveredAnchor(-1);
  };

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <div
      data-ui="spiderweb"
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="relative w-full max-w-[310px] sm:max-w-[350px] md:max-w-[390px] aspect-[1234/772] select-none cursor-pointer"
      style={{
        transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transition: 'transform 200ms cubic-bezier(0.2, 0.9, 0.3, 1)',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* ── MOTION BREATHING WRAPPER (Tasteful alive pulse during preloader) ── */}
      <motion.div
        animate={
          isPreloading
            ? {
                scale: [0.95, 1.04, 0.98, 1.03, 1],
              }
            : {
                scale: 1,
              }
        }
        transition={
          isPreloading
            ? {
                duration: 2.8,
                repeat: Infinity,
                ease: 'easeInOut',
              }
            : {
                duration: 0.6,
                ease: 'easeOut',
              }
        }
        className="relative w-full h-full"
      >
        {/* ── BASE SVG ARTWORK (Rich crimson redraw for light mode) ── */}
        <div className="absolute inset-0 overflow-hidden" style={{ aspectRatio: `${VB_W}/${VB_H}` }}>
          <img
            src={spiderwebLight}
            alt=""
            aria-hidden="true"
            width={VB_W}
            height={884}
            className="pointer-events-none absolute left-0 w-full select-none"
            draggable={false}
            style={{
              top: '-6.44%',
              opacity: 0.96,
              filter: 'drop-shadow(0 0 5px rgba(192,36,42,0.24)) drop-shadow(0 0 20px rgba(192,36,42,0.14))', /* taste-skill-ignore */
            }}
          />
        </div>

        {/* ── GEOMETRIC STRANDS, RINGS, AND PULSING NODES ── */}
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          className="absolute inset-0 h-full w-full pointer-events-none"
          aria-hidden="true"
        >
          {/* Radiating spokes */}
          {SPOKE_PATHS.map((d, i) => (
            <path
              key={`spoke-${i}`}
              d={d}
              className={`web-strand ${
                activeSpoke === i
                  ? 'stroke-[#c0272d] stroke-[1.8]'
                  : isPreloading
                  ? 'stroke-[#c0272d]/40 stroke-[1.2]'
                  : 'stroke-[#c0272d]/25 stroke-[1.1]'
              }`}
              fill="none"
              style={{
                transition: 'stroke 0.25s ease, stroke-width 0.25s ease',
                ...(isPreloading
                  ? {
                      animation: `preloader-spoke-shimmer 2.4s ease-in-out infinite`,
                      animationDelay: `${(i % 12) * 0.12}s`,
                    }
                  : {}),
              }}
            />
          ))}

          {/* Concentric sagging arcs */}
          {RING_PATHS.map((d, i) => (
            <path
              key={`ring-${i}`}
              d={d}
              className={`stroke-[#c0272d]/20 stroke-[1.1] ${isPreloading ? 'preloader-ring-pulse' : ''}`}
              fill="none"
              style={
                isPreloading
                  ? {
                      animation: `preloader-ring-pulse 2.2s ease-in-out infinite`,
                      animationDelay: `${i * 0.35}s`,
                    }
                  : {}
              }
            />
          ))}

          {/* Anchor Connector Lines to the 4 work nodes */}
          {WORK_ANCHORS.map((anchor, i) => {
            const spokeTip = spokePoint(SPOKES[anchor.spokeIndex], 0.85);
            const isHighlight = !isPreloading && (hoveredAnchor === i || activeSpoke === anchor.spokeIndex);
            return (
              <path
                key={`conn-${i}`}
                d={`M${spokeTip.x.toFixed(1)},${spokeTip.y.toFixed(1)} L${anchor.x},${anchor.y}`}
                className={`web-connector ${isHighlight ? 'stroke-[#c0272d] stroke-[1.6]' : 'stroke-[#c0272d]/35 stroke-[1]'}`}
                fill="none"
                style={{
                  strokeDasharray: isHighlight ? 'none' : '3 3',
                  opacity: isPreloading ? 0 : 1,
                  transition: 'stroke 0.3s ease, opacity 0.4s ease',
                  transitionDelay: isPreloading ? '0s' : `${0.2 + i * 0.08}s`,
                }}
              />
            );
          })}

          {/* 48 Staggered Pulsing Web Nodes */}
          {NODES.map((n, ni) => {
            const isSpokeActive = activeSpoke === n.spoke;
            return (
              <circle
                key={`node-${ni}`}
                cx={n.x.toFixed(1)}
                cy={n.y.toFixed(1)}
                r={isSpokeActive ? 3.2 : isPreloading ? 2.6 : 2.2}
                className={`web-node ${
                  isSpokeActive ? 'fill-[#c0272d] opacity-95' : 'fill-[#e03840] opacity-45'
                }`}
                style={{
                  animation: isPreloading
                    ? `preloader-node-wave 1.8s ease-in-out infinite`
                    : 'web-node-pulse 3.4s ease-in-out infinite',
                  animationDelay: isPreloading
                    ? `${n.ring * 240 + (n.spoke % 4) * 60}ms`
                    : `${((n.spoke * 211 + n.ring * 617) % 3000) - 3000}ms`,
                }}
              />
            );
          })}
        </svg>

        {/* ── CENTER HUB: 3D CRIMSON GLASS EMBLEM ── */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none"
          style={{
            left: '55.27%',
            top: '45.72%',
            width: '13%',
            height: '13%',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Soft Ambient Crimson Glow */}
          <div
            className="absolute rounded-full w-16 h-16 pointer-events-none bg-[#c0272d]/15 blur-md"
          />

          {/* Dynamic Preloader Radiant Beacon (motion aura while preloading) */}
          {isPreloading && (
            <>
              <motion.div
                key="hub-glow-wave"
                initial={{ scale: 0.7, opacity: 0.2 }}
                animate={{
                  scale: [0.75, 1.6, 0.9, 1.45, 0.75],
                  opacity: [0.35, 0.85, 0.45, 0.75, 0.35],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute rounded-full w-24 h-24 pointer-events-none bg-[#c0272d]/25 blur-lg"
              />
              <motion.div
                key="hub-ripple-wave"
                initial={{ scale: 0.6, opacity: 0.8 }}
                animate={{
                  scale: [0.65, 2.4],
                  opacity: [0.7, 0],
                }}
                transition={{
                  duration: 1.9,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
                className="absolute rounded-full w-12 h-12 pointer-events-none border border-[#c0272d]/45"
              />
            </>
          )}

          {/* Crimson Glass EthixWeb Logo (Auto-spinning 3D emblem) */}
          <div
            className="relative w-11 h-11 md:w-13 md:h-13 animate-emblem-spin"
            style={{ transformOrigin: '50% 50%' }}
          >
            <img
              src={emblemImg}
              alt="EthixWeb Emblem"
              fetchPriority="high"
              className="w-full h-full object-contain select-none"
              style={{
                filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.5)) drop-shadow(0 0 8px rgba(192,39,45,0.45))', /* taste-skill-ignore */
              }}
            />
          </div>
        </div>

        {/* ── 4 CLIENT WORK MICRO-PILLS (Hidden during preloader, blossom out upon completion) ── */}
        {WORK_ANCHORS.map((anchor, i) => {
          const isHovered = !isPreloading && (hoveredAnchor === i || activeSpoke === anchor.spokeIndex);
          return (
            <div
              key={`anchor-node-${i}`}
              onMouseEnter={() => setHoveredAnchor(i)}
              onMouseLeave={() => setHoveredAnchor(-1)}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#f4f4f4]/95 text-[#1c1c1c] text-[10.5px] font-medium pointer-events-auto border border-[#1c1c1c]/10"
              style={{
                left: `${(anchor.x / VB_W) * 100}%`,
                top: `${(anchor.y / VB_H) * 100}%`,
                transform: `translate(-50%, -50%) scale(${isPreloading ? 0.6 : isHovered ? 1.08 : 1})`,
                opacity: isPreloading ? 0 : 1,
                transition: 'transform 0.4s cubic-bezier(0.2, 0.9, 0.3, 1), opacity 0.45s ease',
                transitionDelay: isPreloading ? '0s' : `${0.2 + i * 0.08}s`,
                pointerEvents: isPreloading ? 'none' : 'auto',
              }}
            >
              {/* Real Case Study Cropped Image Thumbnail */}
              <div className="w-3.5 h-3.5 rounded-full overflow-hidden shrink-0 bg-[#e0e0e0]">
                <img
                  src={anchor.img}
                  alt={anchor.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="hidden min-[420px]:inline tracking-tight text-[10.5px] font-medium whitespace-nowrap">
                {anchor.badge}
              </span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
