import { useState } from "react";
import PropTypes from "prop-types";

export default function ParameterForm({ 
  parameters, 
  onChange, 
  error,
  className = ""
}) {
  const [localParameters, setLocalParameters] = useState(parameters || [{ name: "", value: "", type: "string" }]);

  const handleParameterChange = (index, field, value) => {
    const updated = localParameters.map((param, i) => {
      if (i === index) {
        const newParam = { ...param, [field]: value };
        
        // Auto-convert value based on type
        if (field === "type" || field === "value") {
          if (newParam.type === "number") {
            newParam.value = newParam.value === "" ? "" : Number(newParam.value) || 0;
          } else if (newParam.type === "boolean") {
            newParam.value = newParam.value === "true" || newParam.value === true;
          } else {
            newParam.value = String(newParam.value);
          }
        }
        
        return newParam;
      }
      return param;
    });
    
    setLocalParameters(updated);
    onChange?.(updated);
  };

  const addParameter = () => {
    const updated = [...localParameters, { name: "", value: "", type: "string" }];
    setLocalParameters(updated);
    onChange?.(updated);
  };

  const removeParameter = (index) => {
    if (localParameters.length > 1) {
      const updated = localParameters.filter((_, i) => i !== index);
      setLocalParameters(updated);
      onChange?.(updated);
    }
  };

  const renderValueInput = (param, index) => {
    const baseClasses = "flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100";
    
    switch (param.type) {
      case "boolean":
        return (
          <select
            value={param.value.toString()}
            onChange={(e) => handleParameterChange(index, "value", e.target.value === "true")}
            className={baseClasses}
          >
            <option value="false">false</option>
            <option value="true">true</option>
          </select>
        );
      
      case "number":
        return (
          <input
            type="number"
            value={param.value}
            onChange={(e) => handleParameterChange(index, "value", e.target.value)}
            placeholder="Enter number"
            className={baseClasses}
          />
        );
      
      default: // string
        return (
          <input
            type="text"
            value={param.value}
            onChange={(e) => handleParameterChange(index, "value", e.target.value)}
            placeholder="Enter value"
            className={baseClasses}
          />
        );
    }
  };

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-3">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Model Parameters
        </label>
        <button
          type="button"
          onClick={addParameter}
          className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
        >
          + Add Parameter
        </button>
      </div>
      
      <div className="space-y-2">
        {localParameters.map((param, index) => (
          <div key={index} className="flex items-center gap-2 p-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900">
            {/* Parameter Name */}
            <input
              type="text"
              value={param.name}
              onChange={(e) => handleParameterChange(index, "name", e.target.value)}
              placeholder="Parameter name"
              className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
            
            {/* Type Selector */}
            <select
              value={param.type}
              onChange={(e) => handleParameterChange(index, "type", e.target.value)}
              className="w-24 p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            >
              <option value="string">Text</option>
              <option value="number">Number</option>
              <option value="boolean">Boolean</option>
            </select>
            
            {/* Value Input */}
            {renderValueInput(param, index)}
            
            {/* Remove Button */}
            <button
              type="button"
              onClick={() => removeParameter(index)}
              disabled={localParameters.length <= 1}
              className="px-2 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
            >
              −
            </button>
          </div>
        ))}
      </div>
      
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400 mt-2">{error}</p>
      )}
      
      {/* Preview JSON */}
      <details className="mt-3">
        <summary className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer hover:text-gray-800 dark:hover:text-gray-200">
          Preview JSON
        </summary>
        {(() => {
          const validParams = localParameters.filter(p => p.name.trim() !== "");
          const jsonObj = validParams.reduce((acc, p) => ({ ...acc, [p.name]: p.value }), {});
          
          return (
            <div className="mt-2">
              {validParams.length === 0 ? (
                <p className="text-orange-600 dark:text-orange-400 text-sm italic">
                  No valid parameters defined. Add at least one parameter with a name.
                </p>
              ) : (
                <pre className="p-2 bg-gray-100 dark:bg-gray-800 rounded text-xs overflow-auto max-h-32 font-mono text-gray-900 dark:text-gray-100">
                  {JSON.stringify(jsonObj, null, 2)}
                </pre>
              )}
            </div>
          );
        })()}
      </details>
    </div>
  );
}

ParameterForm.propTypes = {
  parameters: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]).isRequired,
    type: PropTypes.oneOf(["string", "number", "boolean"]).isRequired,
  })),
  onChange: PropTypes.func,
  error: PropTypes.string,
  className: PropTypes.string,
};