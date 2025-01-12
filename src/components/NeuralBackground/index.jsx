import React, { useEffect, useRef } from "react";

const NeuralBackground = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, radius: 200 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let particles = [];

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Mouse move handler
    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = event.clientX - rect.left;
      mouseRef.current.y = event.clientY - rect.top;
    };

    // Mouse leave handler
    const handleMouseLeave = () => {
      mouseRef.current.x = 0;
      mouseRef.current.y = 0;
    };

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    resizeCanvas();

    // Particle class
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.radius = Math.random() * 2 + 1;
        this.baseRadius = this.radius;
      }

      update() {
        // Normal movement
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;

        // Mouse interaction
        if (mouseRef.current.x && mouseRef.current.y) {
          const dx = mouseRef.current.x - this.x;
          const dy = mouseRef.current.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const force =
            (mouseRef.current.radius - distance) / mouseRef.current.radius;

          if (distance < mouseRef.current.radius) {
            // Repel particles from cursor
            const angle = Math.atan2(dy, dx);
            const pushX = Math.cos(angle) * force * 0.5;
            const pushY = Math.sin(angle) * force * 0.5;

            this.vx -= pushX;
            this.vy -= pushY;

            // Increase particle size near cursor
            this.radius = this.baseRadius * (1 + force);
          } else {
            // Return to base size
            this.radius = this.baseRadius;
          }

          // Add some randomness to movement
          this.vx += (Math.random() - 0.5) * 0.02;
          this.vy += (Math.random() - 0.5) * 0.02;

          // Limit velocity
          const maxVel = 2;
          const vel = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
          if (vel > maxVel) {
            this.vx = (this.vx / vel) * maxVel;
            this.vy = (this.vy / vel) * maxVel;
          }
        }
      }

      draw() {
        // Main particle
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.fill();

        // Glow effect
        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.radius * 2
        );
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.3)");
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }

    // Create particles
    const createParticles = () => {
      const particleCount = Math.min(
        120,
        Math.floor((canvas.width * canvas.height) / 15000)
      );
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    // Draw connections
    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 180) {
            // Check if connection is near cursor
            const midX = (particles[i].x + particles[j].x) / 2;
            const midY = (particles[i].y + particles[j].y) / 2;
            const mouseDistance = Math.sqrt(
              Math.pow(mouseRef.current.x - midX, 2) +
                Math.pow(mouseRef.current.y - midY, 2)
            );

            const baseOpacity = 1 - distance / 180;
            let opacity = baseOpacity;

            // Increase opacity for connections near cursor
            if (mouseDistance < mouseRef.current.radius) {
              opacity =
                baseOpacity *
                (1 +
                  (mouseRef.current.radius - mouseDistance) /
                    mouseRef.current.radius);
            }

            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.5})`;
            ctx.lineWidth = mouseDistance < mouseRef.current.radius ? 1.2 : 0.8;

            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawConnections();

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    createParticles();
    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        opacity: 0.7,
      }}
    />
  );
};

export default NeuralBackground;
