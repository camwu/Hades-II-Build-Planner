const ZERO_COST_CARDS = [5, 13, 20, 21, 24, 25];

const ARCANA_COSTS: Record<number, number> = {
  1: 1, 2: 1, 3: 2, 4: 3, 5: 0,
  6: 2, 7: 2, 8: 1, 9: 5, 10: 2,
  11: 1, 12: 4, 13: 0, 14: 5, 15: 3,
  16: 3, 17: 5, 18: 3, 19: 5, 20: 0,
  21: 0, 22: 4, 23: 4, 24: 0, 25: 0
};

export function getSurroundingCards(cardNumber: number): number[] {
  const r = Math.floor((cardNumber - 1) / 5);
  const col = (cardNumber - 1) % 5;
  const list: number[] = [];
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const nr = r + dr;
      const ncol = col + dc;
      if (nr >= 0 && nr < 5 && ncol >= 0 && ncol < 5) {
        list.push(nr * 5 + ncol + 1);
      }
    }
  }
  return list;
}

export function resolveAllActiveArcana(manualSelection: number[]): number[] {
  let activeSet = new Set(manualSelection.filter(num => !ZERO_COST_CARDS.includes(num)));

  let changed = true;
  let iterations = 0;
  while (changed && iterations < 10) {
    changed = false;
    const currentActive = Array.from(activeSet);

    for (const cardNum of ZERO_COST_CARDS) {
      if (activeSet.has(cardNum)) continue;

      let shouldActivate = false;

      if (cardNum === 5) {
        // V. The Moon: "Activate any surrounding cards" -> at least one surrounding card is active
        const surrounding = getSurroundingCards(5);
        shouldActivate = surrounding.some(n => activeSet.has(n));
      } else if (cardNum === 13) {
        // XIII. The Centaur: "Activate Cards that use 1 through 5 Grasp."
        // We need at least one active card of each Grasp cost from 1 to 5.
        const activeCosts = new Set<number>();
        for (const num of activeSet) {
          const cost = ARCANA_COSTS[num];
          if (cost >= 1 && cost <= 5) {
            activeCosts.add(cost);
          }
        }
        shouldActivate = [1, 2, 3, 4, 5].every(c => activeCosts.has(c));
      } else if (cardNum === 20) {
        // XX. The Queen: "Activate no more than two cards of the same Grasp cost."
        const costCounts: Record<number, number> = {};
        for (const act of currentActive) {
          const cost = ARCANA_COSTS[act] || 0;
          if (cost > 0) {
            costCounts[cost] = (costCounts[cost] || 0) + 1;
          }
        }
        shouldActivate = currentActive.length > 0 && Object.values(costCounts).every(cnt => cnt <= 2);
      } else if (cardNum === 21) {
        // XXI. The Fates: "Activate three surrounding cards."
        const surrounding = getSurroundingCards(21);
        const activeCount = surrounding.filter(n => activeSet.has(n)).length;
        shouldActivate = activeCount >= 3;
      } else if (cardNum === 24) {
        // XXIV. Divinity: "Activate all 5 Cards in any other row or column."
        // Divinity is in Row 4, Column 3. Other rows are 0, 1, 2, 3. Other columns are 0, 1, 2, 4.

        // Check rows 0, 1, 2, 3
        for (let r = 0; r < 4; r++) {
          let allActive = true;
          for (let c = 0; c < 5; c++) {
            const num = r * 5 + c + 1;
            if (!activeSet.has(num)) {
              allActive = false;
              break;
            }
          }
          if (allActive) {
            shouldActivate = true;
            break;
          }
        }

        // Check columns 0, 1, 2, 4
        if (!shouldActivate) {
          const columnsToCheck = [0, 1, 2, 4];
          for (const c of columnsToCheck) {
            let allActive = true;
            for (let r = 0; r < 5; r++) {
              const num = r * 5 + c + 1;
              if (!activeSet.has(num)) {
                allActive = false;
                break;
              }
            }
            if (allActive) {
              shouldActivate = true;
              break;
            }
          }
        }
      } else if (cardNum === 25) {
        // XXV. Judgment: "Activate three or fewer cards."
        const activeNormalCount = currentActive.filter(n => !ZERO_COST_CARDS.includes(n)).length;
        shouldActivate = activeNormalCount > 0 && activeNormalCount <= 3;
      }

      if (shouldActivate) {
        activeSet.add(cardNum);
        changed = true;
      }
    }
    iterations++;
  }

  return Array.from(activeSet).sort((a, b) => a - b);
}

export { ZERO_COST_CARDS, ARCANA_COSTS };
