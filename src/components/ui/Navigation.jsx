import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

export function NavigationLink({ 
  to, 
  children, 
  className = "text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium",
  ...props 
}) {
  return (
    <Link to={to} className={className} {...props}>
      {children}
    </Link>
  );
}

export function BackToHomeLink({ className, ...props }) {
  return (
    <NavigationLink 
      to="/" 
      className={className || "text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"}
      {...props}
    >
      ← Back to Home
    </NavigationLink>
  );
}

export function SectionLink({ to, sectionName, className, ...props }) {
  return (
    <NavigationLink 
      to={to}
      className={className || "text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"}
      {...props}
    >
      ← Back to {sectionName}
    </NavigationLink>
  );
}

NavigationLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

BackToHomeLink.propTypes = {
  className: PropTypes.string
};

SectionLink.propTypes = {
  to: PropTypes.string.isRequired,
  sectionName: PropTypes.string.isRequired,
  className: PropTypes.string
};