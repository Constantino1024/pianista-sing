import { useState } from "react";
import { postGeneratePddl } from "@api";
import { handleAsyncOperation } from "@utils/errorHandling";
import { normalizePddlText } from "@utils/pddlUtils";
import { useToast } from "@hooks";
import { 
  Card, 
  SectionHeader, 
  ResultDisplay, 
  CodeBlock,
  ErrorDisplay,
  ButtonLoading,
  CopyButton
} from "@components/ui";
import { copyFormatters } from "@utils/copyFormatters";

export default function GeneratePddl() {
  const [pddlType, setPddlType] = useState("domain");
  const [text, setText] = useState("");
  const [domain, setDomain] = useState("");
  const [generateBoth, setGenerateBoth] = useState(false);
  const [attempts, setAttempts] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    await handleAsyncOperation(
      () => {
        const prompt = {
          text: normalizePddlText(text),
          domain: domain ? normalizePddlText(domain) : null,
        };
        return postGeneratePddl(pddlType, prompt, generateBoth, attempts);
      },
      {
        setLoading,
        setError,
        clearStatesOnStart: [setResult],
        context: 'PDDL generation',
        showToast: true,
        toast,
        onSuccess: (response) => setResult(response.data)
      }
    );
  };

  const clearForm = () => {
    setText("");
    setDomain("");
    setResult(null);
    setError(null);
  };

  return (
    <Card className="space-y-4">
      <div className="flex justify-between items-center">
        <SectionHeader 
          title="Generate PDDL from Natural Language"
          description="Convert natural language descriptions into PDDL domain or problem files"
        />
        <button
          type="button"
          onClick={clearForm}
          className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
        >
          Clear
        </button>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              PDDL Type
            </label>
            <select
              value={pddlType}
              onChange={(e) => setPddlType(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              disabled={generateBoth}
            >
              <option value="domain">Domain</option>
              <option value="problem">Problem</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Attempts
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={attempts}
              onChange={(e) => setAttempts(Number(e.target.value))}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            />
          </div>

          <div className="flex items-end">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 pb-3">
              <input
                type="checkbox"
                checked={generateBoth}
                onChange={(e) => setGenerateBoth(e.target.checked)}
                className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 bg-white dark:bg-gray-800"
              />
              <span>Generate both domain and problem</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Natural Language Prompt *
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            placeholder="Describe what you want to model in PDDL. For example: 'Create a blocks world domain where robots can pick up and stack blocks...'"
            rows={8}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Domain PDDL (optional)
          </label>
          <textarea
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            placeholder="Optional: Provide existing domain PDDL to guide problem generation..."
            rows={6}
          />
          <p className="text-xs text-gray-500 mt-1">
            Used when generating problems or when you want to constrain the
            generation to a specific domain
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading || !text.trim()}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
        >
          <ButtonLoading isLoading={loading} loadingText="Generating...">
            Generate PDDL
          </ButtonLoading>
        </button>
      </div>

      {result && (
        <ResultDisplay
          variant={result.result_status === "success" ? "success" : "error"}
          title={`Generation ${result.result_status === "success" ? "Successful" : "Failed"}`}
        >
          {result.generated_domain && (
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-gray-700 dark:text-gray-300">Generated Domain:</h4>
                <CopyButton 
                  data={result.generated_domain}
                  formatFn={copyFormatters.pddlText}
                  size="xs"
                  variant="ghost"
                />
              </div>
              <CodeBlock>
                {result.generated_domain}
              </CodeBlock>
            </div>
          )}

          {result.generated_problem && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-semibold text-gray-700 dark:text-gray-300">Generated Problem:</h4>
                <CopyButton 
                  data={result.generated_problem}
                  formatFn={copyFormatters.pddlText}
                  size="xs"
                  variant="ghost"
                />
              </div>
              <CodeBlock>
                {result.generated_problem}
              </CodeBlock>
            </div>
          )}
        </ResultDisplay>
      )}

      <ErrorDisplay error={error} />
    </Card>
  );
}
