import { ShieldCheck, AlertTriangle, ShieldAlert, HelpCircle } from 'lucide-react';

type RiskLevel = 'low' | 'medium' | 'high' | 'unclear';

export default function RiskBadge({ risk }: { risk: RiskLevel }) {
  const config = {
    low: { 
      color: 'text-emerald-700 dark:text-emerald-300', 
      bg: 'bg-emerald-500/10', 
      border: 'border-emerald-500/30', 
      dot: 'bg-emerald-500',
      icon: ShieldCheck, 
      label: 'Verified Clean Profile' 
    },
    medium: { 
      color: 'text-amber-700 dark:text-amber-300', 
      bg: 'bg-amber-500/10', 
      border: 'border-amber-500/30', 
      dot: 'bg-amber-500',
      icon: AlertTriangle, 
      label: 'Moderate Health Halo Discrepancy' 
    },
    high: { 
      color: 'text-rose-700 dark:text-rose-300', 
      bg: 'bg-rose-500/10', 
      border: 'border-rose-500/30', 
      dot: 'bg-rose-500',
      icon: ShieldAlert, 
      label: 'Severe Deceptive Health Halo' 
    },
    unclear: { 
      color: 'text-neutral-700 dark:text-neutral-300', 
      bg: 'bg-neutral-500/10', 
      border: 'border-neutral-500/30', 
      dot: 'bg-neutral-400',
      icon: HelpCircle, 
      label: 'Under Evaluation' 
    },
  };

  const { color, bg, border, dot, icon: Icon, label } = config[risk] || config.unclear;

  return (
    <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border ${bg} ${border} ${color} shadow-xs`}>
      <span className={`w-2 h-2 rounded-full ${dot} animate-pulse`} />
      <Icon className="w-4 h-4 flex-shrink-0" />
      <span className="text-xs font-bold tracking-wide uppercase font-['var(--font-dm-sans)']">{label}</span>
    </div>
  );
}
