import { useState } from "react";
import { postConvertMermaidToPddl } from "@api";
import { config } from "@config/environment";
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

export default function MermaidToPddl() {
  const [mermaid, setMermaid] = useState("");
  const [domain, setDomain] = useState("");
  const [attempts, setAttempts] = useState(config.features.converters.defaultAttempts);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    await handleAsyncOperation(
      () => {
        const normalizedMermaid = normalizePddlText(mermaid);
        return postConvertMermaidToPddl(
          normalizedMermaid,
          domain || null,
          attempts
        );
      },
      {
        setLoading,
        setError,
        clearStatesOnStart: [setResult],
        onSuccess: (response) => {
          const data = response.data;
          setResult(data);
          
          if (data.result_status === "success") {
            toast.success("Mermaid to PDDL conversion completed successfully!");
          } else {
            toast.error("Mermaid to PDDL conversion failed");
          }
        },
        context: 'Mermaid to PDDL conversion',
        showToast: false
      }
    );
  };

  const clearForm = () => {
    setMermaid("");
    setDomain("");
    setResult(null);
    setError(null);
  };

  return (
    <Card className="space-y-4">
      <div className="flex justify-between items-center">
        <SectionHeader 
          title="Convert Mermaid → PDDL"
          description="Convert Mermaid diagram code into PDDL format with optional domain guidance"
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
            Mermaid Code *
          </label>
          <textarea
            value={mermaid}
            onChange={(e) => setMermaid(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            placeholder="Paste Mermaid diagram code here..."
            rows={10}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Domain (optional)
          </label>
          <textarea
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            placeholder="Optional domain PDDL to guide conversion..."
            rows={6}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Attempts
          </label>
          <input
            type="number"
            min="1"
            max={config.features.converters.maxAttempts}
            value={attempts}
            onChange={(e) => setAttempts(Number(e.target.value))}
            className="w-24 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium transition-colors"
        >
          <ButtonLoading isLoading={loading} loadingText="Converting...">
            Convert to PDDL
          </ButtonLoading>
        </button>
      </form>

      {result && (
        <ResultDisplay
          variant={result.result_status === "success" ? "success" : "error"}
          title={`Conversion ${result.result_status === "success" ? "Successful" : "Failed"}`}
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Generated PDDL:</span>
            <CopyButton 
              data={result.conversion_result}
              formatFn={copyFormatters.pddlText}
              size="xs"
              variant="ghost"
            />
          </div>
          <CodeBlock>
            {result.conversion_result}
          </CodeBlock>
        </ResultDisplay>
      )}

      <ErrorDisplay error={error} />
    </Card>
  );
}
