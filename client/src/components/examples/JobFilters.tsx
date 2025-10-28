import JobFilters from '../JobFilters';

export default function JobFiltersExample() {
  return (
    <div className="p-8 bg-background max-w-sm">
      <JobFilters
        onApplyFilters={(filters) => console.log('Filters applied:', filters)}
        onClearFilters={() => console.log('Filters cleared')}
      />
    </div>
  );
}
