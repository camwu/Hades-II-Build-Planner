import { Boon, BoonType } from '../types';
import { BOONS } from '../data/boonsData';

export const INCOMPATIBLE_BOON_IDS = [
  "glowing_coal", // Glowing Coal
  "lightning_lance", // Lightning Lance
  "hostile_environment"  // Hostile Environment
];

export const getIncompatibleBoonInSelection = (
  boonId: string,
  selectedBoonIds: Set<string> | string[]
): Boon | null => {
  if (!INCOMPATIBLE_BOON_IDS.includes(boonId)) return null;
  const idsSet = selectedBoonIds instanceof Set ? selectedBoonIds : new Set(selectedBoonIds);
  const activeIncompatibleId = INCOMPATIBLE_BOON_IDS.find(id => id !== boonId && idsSet.has(id));
  if (!activeIncompatibleId) return null;
  return BOONS.find(b => b.id === activeIncompatibleId) || null;
};

export const isValidForSlot = (boon: Boon, slot: string) => {
  if (['Attack', 'Special', 'Cast', 'Sprint', 'Magick'].includes(slot)) {
    return boon.type === slot;
  }
  if (slot === 'Passive') {
    return ['Passive', 'Legendary', 'Duo', 'Infusion'].includes(boon.type);
  }
  return false;
};

export const getBoonColor = (type: BoonType | string) => {
  switch (type) {
    case 'Infusion': return 'text-hades-infusion';
    case 'Duo': return 'text-hades-duo';
    case 'Legendary': return 'text-hades-legendary';
    default: return 'text-gray-200';
  }
};

export const getBoonBorderColor = (type: BoonType | string) => {
  switch (type) {
    case 'Infusion': return 'border-hades-infusion/70';
    case 'Duo': return 'border-hades-duo/70';
    case 'Legendary': return 'border-hades-legendary/70';
    default: return 'border-white/20';
  }
};

export type SearchASTNode =
  | { type: 'AND'; left: SearchASTNode; right: SearchASTNode }
  | { type: 'OR'; left: SearchASTNode; right: SearchASTNode }
  | { type: 'NOT'; operand: SearchASTNode }
  | { type: 'TERM'; term: string; isExact: boolean }
  | { type: 'EMPTY' };

export interface ParsedQuery {
  ast: SearchASTNode;
}

interface ParserToken {
  type: 'LPAREN' | 'RPAREN' | 'AND' | 'OR' | 'NOT' | 'TERM';
  value: string;
  isExact?: boolean;
}

export const tokenize = (searchTerm: string): string[] => {
  const norm = searchTerm
    .replace(/Ω/g, 'omega')
    .replace(/ω/g, 'omega')
    .trim();

  if (!norm) return [];

  const tokens: string[] = [];
  // Match parenthesized blocks, quotes, prefix '-' exclusions, logic operators, or general terms
  const regex = /(-?\"[^\"]*\")|([()|])|(-?\S+)/g;
  let match;
  while ((match = regex.exec(norm)) !== null) {
    tokens.push(match[0]);
  }
  return tokens;
};

export const getParserTokens = (rawTokens: string[]): ParserToken[] => {
  const result: ParserToken[] = [];
  
  for (const raw of rawTokens) {
    const upper = raw.toUpperCase();
    if (upper === '(') {
      result.push({ type: 'LPAREN', value: '(' });
    } else if (upper === ')') {
      result.push({ type: 'RPAREN', value: ')' });
    } else if (upper === 'AND') {
      result.push({ type: 'AND', value: 'AND' });
    } else if (upper === 'OR' || upper === '|') {
      result.push({ type: 'OR', value: 'OR' });
    } else if (upper === 'NOT') {
      result.push({ type: 'NOT', value: 'NOT' });
    } else if (raw.startsWith('-')) {
      const rest = raw.slice(1);
      const isExact = rest.startsWith('"') && rest.endsWith('"');
      const cleanVal = isExact ? rest.slice(1, -1) : rest;
      result.push({ type: 'NOT', value: 'NOT' });
      result.push({ type: 'TERM', value: cleanVal.toLowerCase().trim(), isExact });
    } else {
      const isExact = raw.startsWith('"') && raw.endsWith('"');
      const cleanVal = isExact ? raw.slice(1, -1) : raw;
      result.push({ type: 'TERM', value: cleanVal.toLowerCase().trim(), isExact });
    }
  }
  
  return result;
};

export const insertImplicitAnds = (tokens: ParserToken[]): ParserToken[] => {
  const result: ParserToken[] = [];
  for (let i = 0; i < tokens.length; i++) {
    const current = tokens[i];
    result.push(current);
    
    if (i + 1 < tokens.length) {
      const next = tokens[i + 1];
      const currentIsEnder = current.type === 'TERM' || current.type === 'RPAREN';
      const nextIsStarter = next.type === 'TERM' || next.type === 'LPAREN' || next.type === 'NOT';
      
      if (currentIsEnder && nextIsStarter) {
        result.push({ type: 'AND', value: 'AND' });
      }
    }
  }
  return result;
};

const applyOp = (op: ParserToken, nodes: SearchASTNode[]) => {
  if (op.type === 'NOT') {
    const operand = nodes.pop();
    if (operand) {
      nodes.push({ type: 'NOT', operand });
    } else {
      nodes.push({ type: 'EMPTY' });
    }
  } else if (op.type === 'AND') {
    const right = nodes.pop();
    const left = nodes.pop();
    if (left && right) {
      nodes.push({ type: 'AND', left, right });
    } else if (left) {
      nodes.push(left);
    } else if (right) {
      nodes.push(right);
    } else {
      nodes.push({ type: 'EMPTY' });
    }
  } else if (op.type === 'OR') {
    const right = nodes.pop();
    const left = nodes.pop();
    if (left && right) {
      nodes.push({ type: 'OR', left, right });
    } else if (left) {
      nodes.push(left);
    } else if (right) {
      nodes.push(right);
    } else {
      nodes.push({ type: 'EMPTY' });
    }
  }
};

export const parseTokensToAST = (tokens: ParserToken[]): SearchASTNode => {
  const ops: ParserToken[] = [];
  const nodes: SearchASTNode[] = [];
  
  const precedence: Record<string, number> = {
    'OR': 1,
    'AND': 2,
    'NOT': 3
  };
  
  for (const token of tokens) {
    if (token.type === 'TERM') {
      nodes.push({
        type: 'TERM',
        term: token.value,
        isExact: !!token.isExact
      });
    } else if (token.type === 'LPAREN') {
      ops.push(token);
    } else if (token.type === 'RPAREN') {
      while (ops.length > 0 && ops[ops.length - 1].type !== 'LPAREN') {
        applyOp(ops.pop()!, nodes);
      }
      ops.pop(); // Pop 'LPAREN'
    } else {
      while (
        ops.length > 0 &&
        ops[ops.length - 1].type !== 'LPAREN' &&
        precedence[ops[ops.length - 1].type] >= precedence[token.type]
      ) {
        applyOp(ops.pop()!, nodes);
      }
      ops.push(token);
    }
  }
  
  while (ops.length > 0) {
    applyOp(ops.pop()!, nodes);
  }
  
  if (nodes.length === 0) {
    return { type: 'EMPTY' };
  }
  
  return nodes[nodes.length - 1];
};

export const parseSearchQuery = (searchTerm: string): ParsedQuery => {
  const raw = tokenize(searchTerm);
  const parserTokens = getParserTokens(raw);
  const explicitTokens = insertImplicitAnds(parserTokens);
  const ast = parseTokensToAST(explicitTokens);
  return { ast };
};

export const evaluateAST = (node: SearchASTNode, boon: Boon): boolean => {
  const cleanInput = (text: string) => text.toLowerCase().replace(/Ω/g, 'omega').replace(/ω/g, 'omega');
  
  const checkMatch = (term: string, isExact: boolean): boolean => {
    const check = (text: string) => {
      const normalizedText = cleanInput(text);
      return normalizedText.includes(term);
    };
    return check(boon.name) || 
           check(boon.effect) ||
           boon.gods.some(god => check(god)) ||
           check(boon.type) ||
           (boon.element ? check(boon.element) : false) ||
           (boon.prerequisites ? boon.prerequisites.some(p => check(p.description)) : false) ||
           (boon.inflictsCurse ? check(boon.inflictsCurse) : false);
  };

  switch (node.type) {
    case 'AND':
      return evaluateAST(node.left, boon) && evaluateAST(node.right, boon);
    case 'OR':
      return evaluateAST(node.left, boon) || evaluateAST(node.right, boon);
    case 'NOT':
      return !evaluateAST(node.operand, boon);
    case 'TERM':
      return checkMatch(node.term, node.isExact);
    case 'EMPTY':
      return true;
    default:
      return true;
  }
};

export const boonMatchesQuery = (boon: Boon, query: ParsedQuery): boolean => {
  return evaluateAST(query.ast, boon);
};

export const getPositiveTermsFromAST = (node: SearchASTNode, isInsideNot: boolean = false): string[] => {
  switch (node.type) {
    case 'AND':
    case 'OR':
      return [
        ...getPositiveTermsFromAST(node.left, isInsideNot),
        ...getPositiveTermsFromAST(node.right, isInsideNot)
      ];
    case 'NOT':
      return getPositiveTermsFromAST(node.operand, !isInsideNot);
    case 'TERM':
      return isInsideNot ? [] : [node.term];
    case 'EMPTY':
    default:
      return [];
  }
};

export const parseSearchTerms = (searchTerm: string): string[] => {
  const query = parseSearchQuery(searchTerm);
  return getPositiveTermsFromAST(query.ast);
};

export const boonMatchesTerms = (boon: Boon, searchTerms: string[]): boolean => {
  return searchTerms.every(term => {
    const check = (text: string) => text.toLowerCase().replace(/Ω/g, 'omega').replace(/ω/g, 'omega').includes(term);
    return check(boon.name) || 
           check(boon.effect) ||
           boon.gods.some(god => check(god)) ||
           check(boon.type) ||
           (boon.element && check(boon.element)) ||
           (boon.prerequisites && boon.prerequisites.some(p => check(p.description))) ||
           (boon.inflictsCurse && check(boon.inflictsCurse));
  });
};
