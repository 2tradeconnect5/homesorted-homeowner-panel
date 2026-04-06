import { Check } from 'lucide-react';
import { JOB_TIMELINE_STATES } from '../../utils/constants';
import { getStatusLabel, getStatusStyle } from '../../utils/helpers';
import { formatDateTime } from '../../utils/formatters';

export default function JobTimeline({ timeline, currentStatus }) {
  const timelineMap = {};
  (timeline || []).forEach((t) => {
    timelineMap[t.state] = t.entered_at;
  });

  const currentIndex = JOB_TIMELINE_STATES.indexOf(currentStatus);
  const isDisputed = currentStatus === 'DISPUTED';

  return (
    <div className="space-y-0">
      {JOB_TIMELINE_STATES.map((state, i) => {
        const entered = timelineMap[state];
        const isPast = i < currentIndex || (entered && currentStatus !== state);
        const isCurrent = state === currentStatus;
        const isFuture = !entered && !isCurrent;
        const style = getStatusStyle(state);

        return (
          <div key={state} className="flex gap-3">
            {/* Line + dot */}
            <div className="flex flex-col items-center">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                  isPast ? '' : isCurrent ? 'ring-2 ring-offset-2' : ''
                }`}
                style={{
                  background: isPast ? '#8CC63F' : isCurrent ? style.bg : '#F3F4F6',
                  ringColor: isCurrent ? style.border : undefined,
                }}
              >
                {isPast ? (
                  <Check size={12} className="text-white" />
                ) : isCurrent ? (
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: style.text }} />
                ) : (
                  <div className="w-2 h-2 rounded-full" style={{ background: '#D1D5DB' }} />
                )}
              </div>
              {i < JOB_TIMELINE_STATES.length - 1 && (
                <div
                  className="w-0.5 flex-1 min-h-[24px]"
                  style={{ background: isPast ? '#8CC63F' : '#E5E8E8' }}
                />
              )}
            </div>
            {/* Content */}
            <div className="pb-4">
              <p
                className={`text-sm font-medium ${isFuture ? 'opacity-40' : ''}`}
                style={{ color: isCurrent ? style.text : '#1F2937' }}
              >
                {getStatusLabel(state)}
              </p>
              {entered && (
                <p className="text-[11px]" style={{ color: '#9CA3AF' }}>
                  {formatDateTime(entered)}
                </p>
              )}
            </div>
          </div>
        );
      })}

      {isDisputed && timelineMap['DISPUTED'] && (
        <div className="flex gap-3">
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 ring-2 ring-offset-2" style={{ background: '#FEE2E2', ringColor: '#DC2626' }}>
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#DC2626' }} />
            </div>
          </div>
          <div className="pb-4">
            <p className="text-sm font-medium" style={{ color: '#DC2626' }}>Disputed</p>
            <p className="text-[11px]" style={{ color: '#9CA3AF' }}>
              {formatDateTime(timelineMap['DISPUTED'])}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
