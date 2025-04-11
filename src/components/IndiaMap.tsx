import React, { useState } from 'react';

interface CrimeData {
  [key: string]: {
    value: number;
    riskLevel: 'high' | 'medium' | 'low';
  };
}

const crimeData: CrimeData = {
  'Jammu and Kashmir': { value: 45, riskLevel: 'medium' },
  'Himachal Pradesh': { value: 25, riskLevel: 'low' },
  'Punjab': { value: 55, riskLevel: 'medium' },
  'Uttarakhand': { value: 30, riskLevel: 'low' },
  'Haryana': { value: 60, riskLevel: 'medium' },
  'Rajasthan': { value: 70, riskLevel: 'high' },
  'Uttar Pradesh': { value: 85, riskLevel: 'high' },
  'Bihar': { value: 75, riskLevel: 'high' },
  'West Bengal': { value: 65, riskLevel: 'medium' },
  'Gujarat': { value: 50, riskLevel: 'medium' },
  'Madhya Pradesh': { value: 55, riskLevel: 'medium' },
  'Maharashtra': { value: 80, riskLevel: 'high' },
  'Karnataka': { value: 50, riskLevel: 'medium' },
  'Tamil Nadu': { value: 40, riskLevel: 'low' },
  'Kerala': { value: 30, riskLevel: 'low' }
};

const IndiaMap: React.FC = () => {
  const [tooltipContent, setTooltipContent] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [selectedState, setSelectedState] = useState<string | null>(null);

  return (
    <div className="relative w-full min-h-[800px] bg-gray-50 p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Crime Hotspots Map</h2>
      <p className="text-gray-600 mb-6 text-center">Geographic distribution of crime across India</p>
      
      <div className="relative flex justify-center items-center">
        <object
          data="/india-map-colored.svg"
          type="image/svg+xml"
          className="w-full max-w-4xl h-auto"
          style={{ minHeight: '600px' }}
          onLoad={(e) => {
            const svg = (e.target as HTMLObjectElement).contentDocument;
            if (svg) {
              const paths = svg.getElementsByTagName('path');
              Array.from(paths).forEach(path => {
                const stateName = path.getAttribute('title');
                if (stateName) {
                  path.addEventListener('mouseenter', (evt) => {
                    const stateData = crimeData[stateName];
                    if (stateData) {
                      setTooltipContent(`${stateName}\nCrime Rate: ${stateData.value}\nRisk Level: ${stateData.riskLevel.charAt(0).toUpperCase() + stateData.riskLevel.slice(1)}`);
                      const rect = (evt.target as SVGPathElement).getBoundingClientRect();
                      setTooltipPosition({ 
                        x: rect.left + rect.width / 2, 
                        y: rect.top 
                      });
                    }
                  });

                  path.addEventListener('mouseleave', () => {
                    setTooltipContent('');
                  });

                  path.addEventListener('click', () => {
                    setSelectedState(stateName === selectedState ? null : stateName);
                    if (stateName === selectedState) {
                      path.style.strokeWidth = '2';
                    } else {
                      path.style.strokeWidth = '4';
                    }
                  });
                }
              });
            }
          }}
        />

        {tooltipContent && (
          <div
            style={{
              position: 'fixed',
              left: `${tooltipPosition.x}px`,
              top: `${tooltipPosition.y - 70}px`,
              transform: 'translateX(-50%)',
            }}
            className="bg-white px-4 py-2 rounded-lg shadow-lg pointer-events-none whitespace-pre-line z-50 text-sm border border-gray-200"
          >
            {tooltipContent}
          </div>
        )}

        <div className="absolute bottom-5 right-5 bg-white p-4 rounded-lg shadow-lg z-10 border border-gray-200">
          <div className="font-bold text-sm mb-3">Crime Risk Level</div>
          <div className="flex items-center mb-2">
            <div className="w-6 h-6 bg-[#dc2626] mr-3 rounded"></div>
            <span className="text-sm">High</span>
          </div>
          <div className="flex items-center mb-2">
            <div className="w-6 h-6 bg-[#f97316] mr-3 rounded"></div>
            <span className="text-sm">Medium</span>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 bg-[#22c55e] mr-3 rounded"></div>
            <span className="text-sm">Low</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndiaMap; 