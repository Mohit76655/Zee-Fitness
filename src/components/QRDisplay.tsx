import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

interface QRDisplayProps {
  value: string;
  title: string;
  subtitle: string;
  className?: string;
}

const QRDisplay: React.FC<QRDisplayProps> = ({ value, title, subtitle, className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, value, {
        width: 200,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      });
    }
  }, [value]);

  return (
    <div className={`bg-white rounded-2xl p-6 text-center shadow-lg ${className}`}>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{subtitle}</p>
      <canvas ref={canvasRef} className="mx-auto" />
    </div>
  );
};

export default QRDisplay;