export const unhighlightBorders = (padRows, col) => {
  const pads = [...padRows];
  pads.forEach(row => {
    const padToUnhighlight = row.children[col];
    padToUnhighlight.style.borderColor = '#ccc';
  });
};

export const highlightBorders = (padRows, col) => {
  const pads = [...padRows];
  pads.forEach(row => {
    const padToHighlight = row.children[col];
    padToHighlight.style.borderColor = '#00ffff';
  });
};

export const silencePreviousGains = (rows, col) => { // {0: [osc, gain]}
  rows.forEach(row => {
    if (row[col]) {
      const gain = row[col][1];
      gain.gain.value = 0;
    }
  });
};

export const startCurrentGains = (rows, col) => {
  rows.forEach(row => {
    if (row[col]) {
      const gain = row[col][1];
      gain.gain.value = .25;
    }
  });
};