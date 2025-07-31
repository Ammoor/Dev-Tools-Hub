import React, { useState, useEffect } from 'react';
import {
  randomHexColor,
  hexToRgb,
  rgbToHsl,
  getContrastRatio,
  bestTextColor,
} from '../colorUtils';
import { useLocalStorage } from '../hooks/useLocalStorage';

function ColorGenerator() {
  const [palette, setPalette] = useLocalStorage('devtools_palette', [
    randomHexColor(),
    randomHexColor(),
    randomHexColor(),
    randomHexColor(),
    randomHexColor(),
  ]);
  const [format, setFormat] = useState('HEX'); // 'HEX','RGB','HSL'
  const [copied, setCopied] = useState(null);

  // regenerate palette
  const regenerate = () => {
    setPalette([
      randomHexColor(),
      randomHexColor(),
      randomHexColor(),
      randomHexColor(),
      randomHexColor(),
    ]);
  };

  // copy CSS variables
  const exportCSS = () => {
    const vars = palette
      .map((hex, i) => `--color-${i + 1}: ${hex};`)
      .join('\n');
    copyToClipboard(`:root {\n${vars}\n}`);
    setCopied('CSS');
  };

  // individual color copy in chosen format
  const copyColor = (hex) => {
    let text;
    if (format === 'HEX') text = hex;
    else if (format === 'RGB') {
      const { r, g, b } = hexToRgb(hex);
      text = `rgb(${r}, ${g}, ${b})`;
    } else if (format === 'HSL') {
      const { h, s, l } = rgbToHsl(hexToRgb(hex));
      text = `hsl(${h}, ${s}%, ${l}%)`;
    }
    copyToClipboard(text);
    setCopied(text);
  };

  // helper
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {}
  };

  // clear copied flag after short time
  useEffect(() => {
    if (copied) {
      const t = setTimeout(() => setCopied(null), 1500);
      return () => clearTimeout(t);
    }
  }, [copied]);

  return (
    <div className="color-generator">
      <div className="d-flex flex-column flex-md-row gap-4 align-items-start mb-4">
        <div className="flex-grow-1">
          <h2>Color Palette Generator</h2>
          <p>
            Generate accessible and customizable color palettes. Choose format,
            copy values, and export as CSS variables.
          </p>

          <div className="mb-3">
            <label className="form-label me-2">Format:</label>
            <select
              className="form-select d-inline-block w-auto"
              value={format}
              onChange={(e) => setFormat(e.target.value)}
            >
              <option value="HEX">HEX</option>
              <option value="RGB">RGB</option>
              <option value="HSL">HSL</option>
            </select>

            <button
              className="btn btn-outline-secondary ms-3"
              onClick={regenerate}
            >
              <i className="fas fa-sync-alt"></i> Regenerate
            </button>
            <button
              className="btn btn-primary ms-2"
              onClick={exportCSS}
              disabled={!palette.length}
            >
              <i className="fas fa-code"></i> Export CSS
            </button>
          </div>
          {copied && (
            <div className="alert alert-success py-1 mt-2">
              Copied: <strong>{copied}</strong>
            </div>
          )}
        </div>
      </div>

      <div className="row g-3">
        {palette.map((hex, idx) => {
          const rgb = hexToRgb(hex);
          const hsl = rgbToHsl(rgb);
          const textColor = bestTextColor(hex);
          const contrastWithWhite = getContrastRatio('#ffffff', hex);
          const contrastWithBlack = getContrastRatio('#000000', hex);
          return (
            <div key={idx} className="col-sm-6 col-md-4 col-lg-2">
              <div
                className="card text-white palette-card"
                style={{ backgroundColor: hex }}
              >
                <div className="card-body p-3">
                  <div className="d-flex justify-content-between mb-2">
                    <div>
                      <div
                        className="badge bg-light text-dark me-1"
                        style={{ fontSize: '0.65rem' }}
                      >
                        {format}
                      </div>
                    </div>
                    <button
                      className="btn btn-sm btn-light"
                      onClick={() => copyColor(hex)}
                      aria-label="Copy color"
                    >
                      <i className="fas fa-copy"></i>
                    </button>
                  </div>

                  <h5
                    className="card-title"
                    style={{ color: textColor, marginBottom: '0.5rem' }}
                  >
                    {format === 'HEX'
                      ? hex
                      : format === 'RGB'
                      ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
                      : `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`}
                  </h5>

                  <div className="small mb-1">
                    <div>Contrast:</div>
                    <div className="d-flex gap-2">
                      <div className="badge bg-dark">
                        W / {contrastWithWhite}
                      </div>
                      <div className="badge bg-secondary">
                        B / {contrastWithBlack}
                      </div>
                    </div>
                  </div>

                  <div className="d-flex flex-column mt-2">
                    <div className="text-truncate small">
                      HEX: <code>{hex}</code>
                    </div>
                    <div className="text-truncate small">
                      RGB: <code>{`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`}</code>
                    </div>
                    <div className="text-truncate small">
                      HSL: <code>{`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`}</code>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ColorGenerator;
