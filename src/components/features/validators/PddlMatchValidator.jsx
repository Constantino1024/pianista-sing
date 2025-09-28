import { useState } from "react";
import { postValidatePddlMatch } from "@api";
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
  StatusBadge
} from "@components/ui";

export default function PddlMatchValidator() {
  const [domain, setDomain] = useState("");
  const [problem, setProblem] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    await handleAsyncOperation(
      () => {
        const normalizedDomain = normalizePddlText(domain);
        const normalizedProblem = normalizePddlText(problem);
        return postValidatePddlMatch(normalizedDomain, normalizedProblem);
      },
      {
        setLoading,
        setError,
        clearStatesOnStart: [setResult],
        context: 'PDDL match validation',
        showToast: true,
        toast,
        onSuccess: (response) => setResult(response.data)
      }
    );
  };

  const clearForm = () => {
    setDomain("");
    setProblem("");
    setResult(null);
    setError(null);
  };

  return (
    <Card className="space-y-4">
      <div className="flex justify-between items-center">
        <SectionHeader 
          title="Validate Domain & Problem Match"
          description="Validate that a problem correctly matches its domain definition"
        />
        <button
          type="button"
          onClick={clearForm}
          className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
        >
          Clear
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Domain PDDL *
          </label>
          <textarea
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            rows={8}
            placeholder="Paste your DOMAIN PDDL here..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Problem PDDL *
          </label>
          <textarea
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            rows={8}
            placeholder="Paste your PROBLEM PDDL here..."
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
        >
          <ButtonLoading isLoading={loading} loadingText="Validating...">
            Validate Match
          </ButtonLoading>
        </button>
      </form>

      {result && (
        <ResultDisplay
          variant={result.result === "success" ? "success" : "error"}
          title={`Validation ${result.result === "success" ? "Successful" : "Failed"}`}
        >
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-700 dark:text-gray-300">Status:</span>
              <StatusBadge variant={result.result === "success" ? "success" : "error"}>
                {result.result.toUpperCase()}
              </StatusBadge>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-700 dark:text-gray-300">Detected PDDL Type:</span>
              <StatusBadge variant="info">
                {result.pddl_type || "None"}
              </StatusBadge>
            </div>
            <div>
              <CodeBlock 
                label="Message:"
                variant={result.result === "success" ? "success" : "error"}
              >
                {result.message}
              </CodeBlock>
            </div>
          </div>
        </ResultDisplay>
      )}

      <ErrorDisplay error={error} />
    </Card>
  );
}
