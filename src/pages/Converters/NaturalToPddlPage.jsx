import NaturaltoPddl from "@components/Converters/NaturalToPddl";

export default function NaturalToPddlPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Natural Language → PDDL Converter
          </h1>
          <div className="flex space-x-4">
            <a href="/converters" className="text-blue-600 hover:text-blue-800 font-medium">
              ← Back to Converters
            </a>
            <a href="/" className="text-blue-600 hover:text-blue-800 font-medium">
              Home
            </a>
          </div>
        </div>

        <div className="space-y-4">
          <NaturaltoPddl />
          
          <div className="p-6 bg-white shadow-lg rounded-2xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              About Natural Language Generation
            </h3>
            <div className="prose text-gray-600">
              <p>
                This tool allows you to generate{" "}
                <strong>PDDL domains and problems</strong> from{" "}
                <strong>natural language descriptions</strong> using AI.
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong>Natural Language Prompt:</strong> required - describe
                  your planning domain
                </li>
                <li>
                  <strong>PDDL Type:</strong> choose <code>domain</code> or{" "}
                  <code>problem</code>
                </li>
                <li>
                  <strong>Domain PDDL:</strong> optional - provide existing
                  domain for problem generation
                </li>
                <li>
                  <strong>Generate Both:</strong> option to create both domain
                  and problem together
                </li>
                <li>
                  <strong>Attempts:</strong> number of generation attempts
                  (default = 1)
                </li>
              </ul>
              <p className="mt-3 text-sm">
                <strong>Tip:</strong> Be descriptive in your prompt. Include
                details about objects, actions, predicates, and goals to get
                better results.
              </p>
            </div>
          </div>

          <div className="p-6 bg-blue-50 border border-blue-200 rounded-2xl">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">
              Example Prompts
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <strong className="text-blue-700">Blocks World Example:</strong>
                <p className="text-gray-700 mt-1">
                  "Create a blocks world domain where a robot can pick up, put down, stack, and unstack blocks. 
                  Blocks can be on a table or on top of other blocks. The robot can only hold one block at a time."
                </p>
              </div>
              <div>
                <strong className="text-blue-700">Logistics Example:</strong>
                <p className="text-gray-700 mt-1">
                  "Design a logistics domain with trucks that can drive between cities, load and unload packages. 
                  Packages need to be transported from their origin to destination cities."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}