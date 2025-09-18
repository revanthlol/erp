import React from 'react';

const EmptyState = ({ 
  title, 
  description, 
  icon, 
  actionText, 
  onAction,
  variant = 'default' 
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'success':
        return {
          iconBg: 'bg-green-900/30',
          iconColor: 'text-green-400',
          borderColor: 'border-green-700',
        };
      case 'warning':
        return {
          iconBg: 'bg-yellow-900/30',
          iconColor: 'text-yellow-400',
          borderColor: 'border-yellow-700',
        };
      case 'error':
        return {
          iconBg: 'bg-red-900/30',
          iconColor: 'text-red-400',
          borderColor: 'border-red-700',
        };
      case 'info':
        return {
          iconBg: 'bg-blue-900/30',
          iconColor: 'text-blue-400',
          borderColor: 'border-blue-700',
        };
      default:
        return {
          iconBg: 'bg-gray-800/50',
          iconColor: 'text-gray-400',
          borderColor: 'border-gray-700',
        };
    }
  };

  const styles = getVariantStyles();

  return (
    <div className="card p-12 text-center">
      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${styles.iconBg} ${styles.borderColor} border mb-4`}>
        {icon || (
          <svg className={`w-8 h-8 ${styles.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        )}
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 mb-6 max-w-md mx-auto">{description}</p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="btn-primary"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
