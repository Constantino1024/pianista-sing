import { NavigationLink, BackToHomeLink } from "@components/ui";

export default function ConverterPage() {
  const converters = [
    {
      title: "Natural Language → PDDL",
      description:
        "Generate PDDL domains and problems from natural language descriptions using AI",
      features: [
        "AI-powered PDDL generation",
        "Support for both domains and problems",
        "Optional domain constraints",
        "Multiple generation attempts",
      ],
      href: "/converters/natural-to-pddl",
      icon: "🧠",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
    },
    {
      title: "Mermaid → PDDL",
      description: "Convert Mermaid-style diagrams into PDDL format",
      features: [
        "Mermaid code conversion",
        "Text-based diagram processing",
        "Optional domain guidance",
        "Configurable attempts",
      ],
      href: "/converters/mermaid-to-pddl",
      icon: "📊",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      buttonColor: "bg-green-600 hover:bg-green-700",
    },
    {
      title: "PDDL → Mermaid",
      description: "Convert PDDL code into visual Mermaid diagrams",
      features: [
        "Visual representation of PDDL",
        "Support for domains and problems",
        "Clean diagram output",
        "Easy to understand visualizations",
      ],
      href: "/converters/pddl-to-mermaid",
      icon: "🔄",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      buttonColor: "bg-purple-600 hover:bg-purple-700",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Converter Tools</h1>
          <BackToHomeLink />
        </div>

        <div className="text-center mb-8">
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Choose from our powerful conversion tools to work with PDDL and
            visual diagrams. Convert between natural language, Mermaid diagrams,
            and PDDL formats seamlessly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {converters.map((converter, index) => (
            <div
              key={index}
              className={`p-6 ${converter.bgColor} ${converter.borderColor} border-2 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full`}
            >
              <div className="text-center mb-4">
                <div className="text-4xl mb-3">{converter.icon}</div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {converter.title}
                </h2>
                <p className="text-gray-600 text-sm">{converter.description}</p>
              </div>

              <div className="mb-6 flex-grow">
                <h3 className="font-medium text-gray-700 mb-2">Features:</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  {converter.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <span className="text-green-500 mr-2 mt-0.5">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <NavigationLink
                to={converter.href}
                className={`inline-block px-6 py-3 ${converter.buttonColor} text-white rounded-lg font-medium transition-colors`}
              >
                Open Converter
              </NavigationLink>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-white rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            About PDDL Converters
          </h2>
          <div className="prose text-gray-600">
            <p>
              These conversion tools help you work with{" "}
              <strong>Planning Domain Definition Language (PDDL) </strong>
              in different formats. Whether you're starting from natural
              language descriptions, visual diagrams, or existing PDDL code,
              these tools make it easy to transform between formats for your
              planning needs.
            </p>
            <p className="mt-3">
              <strong>Getting Started:</strong> Choose the converter that
              matches your input format. Each tool provides detailed guidance
              and multiple options to ensure you get the best results.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
