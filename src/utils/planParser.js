export const parsePddlPlan = (planText) => {
  if (!planText || typeof planText !== 'string') {
    return { actions: [], duration: 0, metadata: {}, dependencies: {} };
  }

  const processedPlanText = planText.replace(/\\n/g, '\n');
  const lines = processedPlanText.trim().split('\n').filter(line => line.trim());
  
  const actions = [];
  const dependencies = {};
  
  const actionLines = lines.filter(line => {
    const trimmed = line.trim();
    return trimmed && 
           !trimmed.startsWith('Fast Downward') && 
           !trimmed.startsWith('SequentialPlan') &&
           !trimmed.includes('SequentialPlan:') &&
           !trimmed.includes(':');
  });

  actionLines.forEach((line, index) => {
    const trimmed = line.trim();
      
      if (trimmed.includes('enable-task')) {
        const match = trimmed.match(/enable-task\s*\(\s*([^,]+)\s*,\s*([^)]+)\s*\)/);
        if (match) {
          const [, enabledTask, dependsOnTask] = match;
          if (!dependencies[enabledTask.trim()]) {
            dependencies[enabledTask.trim()] = [];
          }
          dependencies[enabledTask.trim()].push(dependsOnTask.trim());
        }
        return;
      }
      
      const actionMatch = trimmed.match(/(\w+(?:-\w+)*)\s*\(([^)]*)\)/);
      if (actionMatch) {
        const [, actionName, paramString] = actionMatch;
        const parameters = paramString ? 
          paramString.split(',').map(p => p.trim()).filter(p => p) : 
          [];
        
        actions.push({
          id: `${actionName.replace(/[^a-zA-Z0-9]/g, '_')}_${index}`,
          action: actionName,
          parameters: parameters,
          taskName: parameters[0] || `${actionName}_${index}`,
          duration: 1.0,
          start: index,
          end: index + 1,
          text: `${actionName}(${parameters.join(', ')})`,
          originalLine: line.trim()
        });
      } else {
        const parts = trimmed.split(/\s+/);
        if (parts.length > 0 && parts[0]) {
          const actionName = parts[0];
          const parameters = parts.slice(1);
          
          actions.push({
            id: `${actionName.replace(/[^a-zA-Z0-9]/g, '_')}_${index}`,
            action: actionName,
            parameters: parameters,
            taskName: parameters[0] || `${actionName}_${index}`,
            duration: 1.0,
            start: index,
            end: index + 1,
            text: parameters.length > 0 ? `${actionName}(${parameters.join(', ')})` : actionName,
            originalLine: line.trim()
          });
        }
      }
  });

  if (Object.keys(dependencies).length > 0) {
    const taskStartTimes = {};
    const taskEndTimes = {};
    
    const processTask = (taskName) => {
      if (taskStartTimes[taskName] !== undefined) {
        return taskStartTimes[taskName];
      }
      
      const deps = dependencies[taskName] || [];
      let startTime = 0;
      
      deps.forEach(depTaskName => {
        processTask(depTaskName);
        const depEndTime = taskEndTimes[depTaskName] || 1;
        startTime = Math.max(startTime, depEndTime);
      });
      
      taskStartTimes[taskName] = startTime;
      taskEndTimes[taskName] = startTime + 1;
      
      return startTime;
    };
    
    actions.forEach(action => {
      processTask(action.taskName);
      action.start = taskStartTimes[action.taskName] || action.start;
      action.end = taskEndTimes[action.taskName] || action.end;
    });
  }
  
  const maxEndTime = Math.max(...actions.map(a => a.end), 0);
  actions.sort((a, b) => a.start - b.start);

  return {
    actions,
    duration: maxEndTime,
    dependencies,
    metadata: {
      totalActions: actions.length,
      actionTypes: [...new Set(actions.map(a => a.action))],
      dependencyCount: Object.keys(dependencies).length,
      planText: processedPlanText.substring(0, 500) + (processedPlanText.length > 500 ? '...' : '')
    }
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