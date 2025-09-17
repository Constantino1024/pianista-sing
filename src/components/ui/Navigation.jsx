import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

/**
 * Reusable navigation link component that uses React Router's Link
 * for proper SPA navigation instead of full page reloads
 */
export function NavigationLink({ 
  to, 
  children, 
  className = "text-blue-600 hover:text-blue-800 font-medium",
  ...props 
}) {
  return (
    <Link to={to} className={className} {...props}>
      {children}
    </Link>
  );
}

/**
 * Pre-styled back to home link
 */
export function BackToHomeLink({ className, ...props }) {
  return (
    <NavigationLink 
      to="/" 
      className={className || "text-blue-600 hover:text-blue-800 font-medium"}
      {...props}
    >
      ← Back to Home
    </NavigationLink>
  );
}

/**
 * Pre-styled section navigation link (e.g., back to validators, converters)
 */
export function SectionLink({ to, sectionName, className, ...props }) {
  return (
    <NavigationLink 
      to={to}
      className={className || "text-blue-600 hover:text-blue-800 font-medium"}
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