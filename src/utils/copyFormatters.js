export const copyFormatters = {
  pddlText: (text) => {
    if (!text) return '';
    // Handle escaped newlines from API responses
    const unescaped = text.replace(/\\n/g, '\n');
    return unescaped.trim();
  },

  mermaidCode: (code) => {
    if (!code) return '';
    // Convert escaped newlines to actual newlines for proper Mermaid formatting
    let unescaped = code.replace(/\\n/g, '\n').replace(/\\t/g, '\t');
    
    // Handle nested subgraphs by flattening only beyond first level
    const lines = unescaped.split('\n');
    const flattened = [];
    let nestingLevel = 0;
    let insideTopLevelSubgraph = false;
    
    for (let line of lines) {
      const trimmedLine = line.trim();
      
      if (trimmedLine.startsWith('subgraph ')) {
        nestingLevel++;
        if (nestingLevel === 1) {
          // Keep top-level subgraphs
          flattened.push(line);
          insideTopLevelSubgraph = true;
        } else {
          // Skip nested subgraph declarations beyond first level
          // But we'll keep their content
        }
      } else if (trimmedLine === 'end') {
        if (nestingLevel === 1) {
          // Close top-level subgraph
          flattened.push(line);
          insideTopLevelSubgraph = false;
        }
        nestingLevel = Math.max(0, nestingLevel - 1);
      } else if (trimmedLine && !trimmedLine.startsWith('subgraph')) {
        // Keep all content lines, but adjust indentation for deeply nested content
        if (nestingLevel > 1 && insideTopLevelSubgraph) {
          // Flatten deeply nested content to be inside the top-level subgraph
          flattened.push('        ' + trimmedLine); // 8 spaces for subgraph content
        } else {
          flattened.push(line);
        }
      }
    }
    
    return flattened.join('\n').trim();
  },

  planData: (plan) => {
    if (!plan) return '';
    
    if (typeof plan === 'string') {
      return plan.trim();
    }
    
    if (plan.actions && Array.isArray(plan.actions)) {
      return plan.actions
        .map(action => {
          if (typeof action === 'string') return action.trim();
          return `${action.name || action.action || ''} ${action.parameters ? action.parameters.join(' ') : ''}`.trim();
        })
        .filter(Boolean)
        .join('\n');
    }
    
    return JSON.stringify(plan, null, 2);
  },

  solutionStats: (stats) => {
    if (!stats) return '';
    
    if (typeof stats === 'string') {
      return stats.trim();
    }

    const formatValue = (key, value) => {
      if (value === null || value === undefined) return '';
      
      if (Array.isArray(value)) {
        if (value.length === 0) return `${key}: []`;
        if (value.length <= 3) return `${key}: [${value.join(', ')}]`;
        return `${key}: [${value.length} items]`;
      }
      
      if (typeof value === 'object') {
        return `${key}: ${Object.keys(value).length} properties`;
      }
      
      if (key.toLowerCase().includes('time') && typeof value === 'number') {
        if (value < 1000) return `${key}: ${value}ms`;
        return `${key}: ${(value / 1000).toFixed(2)}s`;
      }
      
      return `${key}: ${value}`;
    };

    if (typeof stats === 'object') {
      return Object.entries(stats)
        .map(([key, value]) => formatValue(key, value))
        .filter(Boolean)
        .join('\n');
    }
    
    return String(stats);
  },

  validationResult: (result) => {
    if (!result) return '';
    
    if (typeof result === 'string') {
      return result.trim();
    }
    
    if (result.valid !== undefined) {
      let output = `Valid: ${result.valid ? 'Yes' : 'No'}`;
      if (result.message) {
        output += `\nMessage: ${result.message}`;
      }
      if (result.errors && result.errors.length > 0) {
        output += `\nErrors:\n${result.errors.map(err => `- ${err}`).join('\n')}`;
      }
      return output;
    }
    
    return JSON.stringify(result, null, 2);
  }
};