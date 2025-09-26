import { useState } from "react";
import { postConvertPddlToMermaid } from "@api";
import { handleAsyncOperation } from "@utils/errorHandling";
import { normalizePddlText } from "@utils/pddlUtils";
import { useToast } from "@hooks";
import { 
  Card, 
  SectionHeader, 
  ResultDisplay, 
  CodeBlock,
  ErrorDisplay,
  ButtonLoading
} from "@components/ui";

export default function PddlToMermaid() {
  const [pddlType, setPddlType] = useState("domain");
  const [pddl, setPddl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    await handleAsyncOperation(
      () => {
        const normalizedPddl = normalizePddlText(pddl);
        return postConvertPddlToMermaid(pddlType, normalizedPddl);
      },
      {
        setLoading,
        setError,
        clearStatesOnStart: [setResult],
        context: 'PDDL to Mermaid conversion',
        showToast: true,
        toast,
        onSuccess: (response) => setResult(response.data)
      }
    );
  };

  const clearForm = () => {
    setPddl("");
    setResult(null);
    setError(null);
  };

  return (
    <Card className="space-y-4">
      <div className="flex justify-between items-center">
        <SectionHeader 
          title="Convert PDDL → Mermaid"
          description="Convert PDDL domain or problem files into visual Mermaid diagrams"
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
            PDDL Type
          </label>
          <select
            value={pddlType}
            onChange={(e) => setPddlType(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          >
            <option value="domain">Domain</option>
            <option value="problem">Problem</option>
            <option value="plan">Plan</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            PDDL Content *
          </label>
          <textarea
            value={pddl}
            onChange={(e) => setPddl(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            placeholder="Paste your PDDL here..."
            rows={12}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
        >
          <ButtonLoading isLoading={loading} loadingText="Converting...">
            Convert to Mermaid
          </ButtonLoading>
        </button>
      </form>

      {result && (
        <ResultDisplay
          variant={result.result_status === "success" ? "success" : "error"}
          title={`Conversion ${result.result_status === "success" ? "Successful" : "Failed"}`}
        >
          <CodeBlock>
            {result.conversion_result}
          </CodeBlock>
        </ResultDisplay>
      )}

      <ErrorDisplay error={error} />
    </Card>
  );
}
