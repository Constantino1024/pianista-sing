export const parsePddlPlan = (planText) => {
  if (!planText || typeof planText !== 'string') {
    return { actions: [], duration: 0, metadata: {} };
  }

  // Process escape sequences to actual newlines
  const processedPlanText = planText.replace(/\\n/g, '\n');
  
  const lines = processedPlanText.trim().split('\n').filter(line => line.trim());
  const actions = [];
  let maxEndTime = 0;
  let actionIndex = 0;

  // Filter out header lines like "Fast Downward SequentialPlan:"
  const actionLines = lines.filter(line => {
    const trimmed = line.trim();
    return trimmed && 
           !trimmed.startsWith('Fast Downward') && 
           !trimmed.startsWith('SequentialPlan') &&
           !trimmed.includes('SequentialPlan:');
  });

  for (const line of actionLines) {
    try {
      const parsed = parsePddlAction(line, actionIndex);
      if (parsed) {
        actions.push(parsed);
        maxEndTime = Math.max(maxEndTime, parsed.end);
        actionIndex++;
      }
    } catch (error) {
      console.warn(`Failed to parse action line: ${line}`, error);
    }
  }

  actions.sort((a, b) => a.start - b.start);

  return {
    actions,
    duration: maxEndTime,
    metadata: {
      totalActions: actions.length,
      actionTypes: [...new Set(actions.map(a => a.action))],
      planText: processedPlanText.substring(0, 500) + (processedPlanText.length > 500 ? '...' : '')
    }
  };
};

const parsePddlAction = (line, actionIndex = 0) => {
  const trimmed = line.trim();
  if (!trimmed) return null;

  let startTime = actionIndex;
  let remaining = trimmed;
  
  // Try to parse timestamped format first (e.g., "0.0: action")
  const timeMatch = trimmed.match(/^(\d+(?:\.\d+)?)\s*:\s*/);
  if (timeMatch) {
    startTime = parseFloat(timeMatch[1]);
    remaining = trimmed.substring(timeMatch[0].length);
  }

  let action = '';
  let parameters = [];
  
  // Handle parenthesized format: action(param1, param2) or (action param1 param2)
  const actionMatch = remaining.match(/^(\w+)\s*\(([^)]*)\)/);
  if (actionMatch) {
    action = actionMatch[1];
    const paramString = actionMatch[2].trim();
    parameters = paramString ? paramString.split(/\s*,\s*|\s+/).filter(p => p) : [];
    remaining = remaining.substring(actionMatch[0].length);
  } else {
    // Handle space-separated format or parenthesized with spaces
    const parenMatch = remaining.match(/^\(([^)]+)\)/);
    if (parenMatch) {
      const actionParts = parenMatch[1].trim().split(/\s+/);
      action = actionParts[0];
      parameters = actionParts.slice(1);
      remaining = remaining.substring(parenMatch[0].length);
    } else {
      // Simple space-separated format
      const parts = remaining.split(/\s+/);
      action = parts[0];
      parameters = parts.slice(1).filter(p => !p.startsWith('[') && !p.includes('duration'));
    }
  }

  if (!action) return null;

  // Parse duration if present
  let duration = 1.0;
  const durationMatch = remaining.match(/\[(?:duration\s+)?(\d+(?:\.\d+)?)\]/);
  if (durationMatch) {
    duration = parseFloat(durationMatch[1]);
  }

  return {
    id: `${action}-${startTime}`,
    action: action.replace(/^[()]/g, ''),
    parameters,
    start: startTime,
    duration,
    end: startTime + duration,
    text: `${action}(${parameters.join(', ')})`,
    originalLine: line.trim()
  };
};

export const formatActionForDisplay = (action) => {
  const paramStr = action.parameters.length > 0 ? `(${action.parameters.join(', ')})` : '';
  return `${action.action}${paramStr}`;
};

export const generateGanttData = (parsedPlan) => {
  return parsedPlan.actions.map(action => ({
    id: action.id,
    name: formatActionForDisplay(action),
    start: new Date(action.start * 1000),
    end: new Date(action.end * 1000),
    duration: action.duration,
    progress: 100,
    type: 'task',
    project: action.action,
    dependencies: [],
    details: {
      action: action.action,
      parameters: action.parameters,
      startTime: action.start,
      duration: action.duration,
      originalLine: action.originalLine
    }
  }));
};