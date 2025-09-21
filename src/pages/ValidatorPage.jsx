import { NavigationLink, BackToHomeLink } from "@components/ui";

export default function ValidatorPage() {
  const validators = [
    {
      title: "PDDL Syntax Validator",
      description: "Validate the syntax and structure of your PDDL domain and problem files",
      features: [
        "Domain syntax validation",
        "Problem syntax validation", 
        "Detailed error reporting",
        "PDDL type detection"
      ],
      href: "/validators/pddl",
      icon: "🔍",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      buttonColor: "bg-blue-600 hover:bg-blue-700"
    },
    {
      title: "Domain-Problem Matcher",
      description: "Verify that your problem file is compatible with your domain file",
      features: [
        "Domain-problem compatibility check",
      "File relationship validation",
      "Compatibility error reporting",    
      "PDDL consistency checking"
      ],
      href: "/validators/match",
      icon: "🔗",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      buttonColor: "bg-green-600 hover:bg-green-700"
    },
    {
      title: "Plan Validator",
      description: "Validate that your plan correctly solves the given problem",
      features: [
      "Plan validity checking",
      "Domain-problem-plan consistency",
      "Plan format validation", 
      "Comprehensive error reporting"
      ],
      href: "/validators/plan",
      icon: "✅",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      buttonColor: "bg-purple-600 hover:bg-purple-700"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Validator Tools</h1>
          <BackToHomeLink />
        </div>

        <div className="text-center mb-8">
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Comprehensive validation tools for your PDDL files. Verify syntax, check domain-problem 
            compatibility, and validate your planning solutions with detailed feedback.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {validators.map((validator, index) => (
            <div
              key={index}
              className={`p-6 ${validator.bgColor} ${validator.borderColor} border-2 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              <div className="text-center mb-4">
                <div className="text-4xl mb-3">{validator.icon}</div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {validator.title}
                </h2>
                <p className="text-gray-600 text-sm">
                  {validator.description}
                </p>
              </div>

              <div className="mb-6">
                <h3 className="font-medium text-gray-700 mb-2">Features:</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  {validator.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <span className="text-green-500 mr-2 mt-0.5">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

                              <NavigationLink 
                  to={validator.href}
                  className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Open Validator
                </NavigationLink>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-white rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">About PDDL Validation</h2>
          <div className="prose text-gray-600">
            <p>
              These validation tools help ensure your <strong>Planning Domain Definition Language (PDDL)</strong> 
              files are correct and compatible. From syntax checking to plan validation, 
              these tools provide comprehensive feedback to help you create reliable planning solutions.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">Domain Files</h3>
                <p className="text-sm text-blue-700">
                  Define predicates, actions, and the overall planning domain structure with proper syntax.
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">Problem Files</h3>
                <p className="text-sm text-green-700">
                  Specify initial states, goal conditions, and objects that must be compatible with the domain.
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-semibold text-purple-800 mb-2">Plan Files</h3>
                <p className="text-sm text-purple-700">
                  Contain action sequences that must correctly solve the planning problem.
                </p>
              </div>
            </div>
            <p className="mt-4">
              <strong>Getting Started:</strong> Choose the appropriate validator based on what you need to check. 
              Each tool provides detailed error messages and suggestions for fixing issues.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}