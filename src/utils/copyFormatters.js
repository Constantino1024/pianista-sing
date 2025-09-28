export const copyFormatters = {
  pddlText: (text) => {
    if (!text) return '';
    return text.trim();
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