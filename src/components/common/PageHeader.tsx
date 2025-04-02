
import { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  icon?: ReactNode;
}

const PageHeader = ({ title, description, actions, icon }: PageHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:items-center mb-6">
      <div className="flex items-center gap-3">
        {icon && <div className="text-primary">{icon}</div>}
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">{title}</h1>
          {description && (
            <p className="text-sm text-erp-gray-600 mt-1">{description}</p>
          )}
        </div>
      </div>
      {actions && <div className="flex items-center space-x-2 mt-2 sm:mt-0">{actions}</div>}
    </div>
  );
};

export default PageHeader;
