export default function TabStrip({ tabs, activeTab, onTabChange }) {
  return (
    <div className="flex gap-1 overflow-x-auto pb-1 -mx-1 px-1" style={{ scrollbarWidth: 'none' }}>
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === tab.key
              ? 'text-white'
              : 'text-hs-grey-600 hover:bg-hs-grey-100'
          }`}
          style={
            activeTab === tab.key
              ? { background: '#2C4459' }
              : {}
          }
        >
          {tab.label}
          {tab.count != null && (
            <span className="ml-1.5 text-xs opacity-70">({tab.count})</span>
          )}
        </button>
      ))}
    </div>
  );
}
