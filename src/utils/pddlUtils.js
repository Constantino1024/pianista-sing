export const normalizePddlText = (text) => {
  if (!text) return text;
  return text.replace(/\\n/g, "\n").replace(/\r\n/g, "\n");
};

export const parseModelParams = (jsonString) => {
  try {
    return JSON.parse(jsonString);
  } catch (parseError) {
    throw new Error(`Invalid JSON format in model parameters: ${parseError.message}`);
  }
};

export const preparePddlForSubmission = (pddlText) => {
  if (!pddlText) return pddlText;
  
  let cleaned = normalizePddlText(pddlText);
  
  cleaned = cleaned.replace(/\n\s*\n\s*\n/g, '\n\n');
  
  cleaned = cleaned.trim();
  
  return cleaned;
};