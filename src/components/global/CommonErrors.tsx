import { ErrorType } from './types';

export function CommonErrors({ error }: { error: ErrorType }) {
  let className = 'error-message p-3 rounded-md mb-4';

  switch (error) {
    case ErrorType.USAGE_LIMIT_EXCEEDED:
      className += ' bg-yellow-100 text-yellow-800';
      break;
    case ErrorType.API_ERROR:
      className += ' bg-orange-100 text-orange-800';
      break;
  }

  return (
    <div className={className}>
      <p>{error}</p>
    </div>
  );
}
