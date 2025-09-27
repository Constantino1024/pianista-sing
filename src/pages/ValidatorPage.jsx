import { NavigationLink, BackToHomeLink } from "@components/ui";

export default function ValidatorPage() {
  const validators = [
    {
      title: "PDDL Syntax Validator",
      description:
        "Validate the syntax and structure of your PDDL domain and problem files",
      features: [
        "Domain syntax validation",
        "Problem syntax validation",
        "Detailed error reporting",
        "PDDL type detection",
      ],
      href: "/validators/validate-pddl",
      icon: "🔍",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      borderColor: "border-blue-200 dark:border-blue-700",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
    },
    {
      title: "Domain-Problem Matcher",
      description:
        "Verify that your problem file is compatible with your domain file",
      features: [
        "Domain-problem compatibility check",
        "File relationship validation",
        "Compatibility error reporting",
        "PDDL consistency checking",
      ],
      href: "/validators/pddl-match",
      icon: "🔗",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      borderColor: "border-green-200 dark:border-green-700",
      buttonColor: "bg-green-600 hover:bg-green-700",
    },
    {
      title: "Plan Validator",
      description: "Validate that your plan correctly solves the given problem",
      features: [
        "Plan validity checking",
        "Domain-problem-plan consistency",
        "Plan format validation",
        "Comprehensive error reporting",
      ],
      href: "/validators/pddl-plan",
      icon: "✅",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      borderColor: "border-purple-200 dark:border-purple-700",
      buttonColor: "bg-purple-600 hover:bg-purple-700",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Validator Tools</h1>
          <BackToHomeLink />
        </div>

        <div className="text-center mb-8">
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Comprehensive validation tools for your PDDL files. Verify syntax,
            check domain-problem compatibility, and validate your planning
            solutions with detailed feedback.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {validators.map((validator, index) => (
            <div
              key={index}
              className={`p-6 ${validator.bgColor} ${validator.borderColor} border-2 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col h-full`}
            >
              <div className="text-center mb-4">
                <div className="text-4xl mb-3">{validator.icon}</div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                  {validator.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{validator.description}</p>
              </div>

              <div className="mb-6 flex-grow">
                <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Features:</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  {validator.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <span className="text-green-500 dark:text-green-400 mr-2 mt-0.5">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <NavigationLink
                to={validator.href}
                className={`inline-block px-6 py-3 ${validator.buttonColor} text-white rounded-lg font-medium transition-colors`}
              >
                Open Validator
              </NavigationLink>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            About PDDL Validation
          </h2>
          <div className="prose text-gray-600 dark:text-gray-400">
            <p>
              These validation tools help ensure your{" "}
              <strong>Planning Domain Definition Language (PDDL)</strong>
              files are correct and compatible. From syntax checking to plan
              validation, these tools provide comprehensive feedback to help you
              create reliable planning solutions.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
                  PDDL Validation
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Check your PDDL domain and problem files for syntax errors
                  and structural issues.
                </p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">
                  Domain-Problem Matching
                </h3>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Verify that your problem file correctly references all domain
                  elements and types.
                </p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <h3 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">
                  Plan Execution Validation
                </h3>
                <p className="text-sm text-purple-700 dark:text-purple-300">
                  Test whether your plans correctly solve the planning problems
                  and achieve the specified goals.
                </p>
              </div>
            </div>
            <p className="mt-4">
              <strong>Getting Started:</strong> Choose the appropriate validator
              based on what you need to check. Each tool provides detailed error
              messages and suggestions for fixing issues.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
