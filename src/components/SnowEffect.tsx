import { useEffect, useState } from 'react';

const SnowEffect = () => {
  const [snowflakes, setSnowflakes] = useState<Array<{ id: number; left: string; delay: string; duration: string; size: string }>>([]);

  useEffect(() => {
    const flakes = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 10}s`,
      duration: `${15 + Math.random() * 10}s`,
      size: `${0.5 + Math.random() * 0.5}rem`,
    }));
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="snow-particle absolute text-white/40"
          style={{
            left: flake.left,
            animationDelay: flake.delay,
            animationDuration: flake.duration,
            fontSize: flake.size,
            top: '-10vh',
          }}
        >
          ❄
        </div>
      ))}
    </div>
  );
};

export default SnowEffect;
