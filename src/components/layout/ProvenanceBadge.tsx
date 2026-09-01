import React from 'react';
import { ShieldCheck, ExternalLink, FileText, Database, Lock, Unlock, Calendar, MapPin } from 'lucide-react';
import { ProvenanceInfo } from '../../types/provenance';

interface ProvenanceBadgeProps {
  provenance: ProvenanceInfo;
  compact?: boolean;
  className?: string;
}

export const ProvenanceBadge: React.FC<ProvenanceBadgeProps> = ({ provenance, compact = false, className = '' }) => {
  if (compact) {
    return (
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-polar-900/80 border border-frost-cyan/30 text-frost-cyan shadow-sm backdrop-blur-sm ${className}`}>
        <ShieldCheck className="w-3.5 h-3.5 text-frost-teal" />
        <span className="truncate max-w-[140px]">{provenance.sourceOrgShort}</span>
        {provenance.isVerified && (
          <span className="w-1.5 h-1.5 rounded-full bg-frost-teal" title="Verified Source Provenance" />
        )}
      </div>
    );
  }

  return (
    <div className={`p-4 rounded-xl bg-polar-900/90 border border-polar-700/60 shadow-lg text-xs space-y-2.5 backdrop-blur-md ${className}`}>
      <div className="flex items-center justify-between border-b border-polar-700/50 pb-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-frost-teal" />
          <span className="font-semibold text-slate-200 uppercase tracking-wider text-[11px]">Scientific Provenance & Attribution</span>
        </div>
        {provenance.isVerified ? (
          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
            ✓ Verified Source
          </span>
        ) : (
          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-950/80 text-amber-300 border border-amber-500/40">
            Unverified
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-300">
        <div>
          <span className="text-slate-400 font-medium block">Source Organization:</span>
          <span className="text-slate-100 font-medium">{provenance.sourceOrganization}</span>
        </div>

        {provenance.doi && (
          <div>
            <span className="text-slate-400 font-medium block">Digital Object Identifier (DOI):</span>
            <a
              href={`https://doi.org/${provenance.doi}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-frost-cyan hover:underline font-mono inline-flex items-center gap-1"
            >
              {provenance.doi}
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}

        <div>
          <span className="text-slate-400 font-medium block">License & Access:</span>
          <div className="flex items-center gap-1.5 text-slate-200">
            {provenance.accessStatus === 'Open Access' ? (
              <Unlock className="w-3.5 h-3.5 text-frost-teal" />
            ) : (
              <Lock className="w-3.5 h-3.5 text-amber-400" />
            )}
            <span>{provenance.license} ({provenance.accessStatus})</span>
          </div>
        </div>

        {provenance.dateRetrieved && (
          <div>
            <span className="text-slate-400 font-medium block">Metadata Harvest Date:</span>
            <div className="flex items-center gap-1 text-slate-300">
              <Calendar className="w-3 h-3 text-slate-400" />
              <span>{provenance.dateRetrieved}</span>
            </div>
          </div>
        )}
      </div>

      {provenance.attribution && (
        <div className="text-slate-400 italic text-[11px] bg-polar-950/60 p-2 rounded border border-polar-800">
          <span className="text-slate-300 font-medium not-italic">Official Citation: </span>
          {provenance.attribution}
        </div>
      )}

      <div className="flex items-center justify-between pt-1 text-[11px]">
        <span className="text-slate-400">
          PolarVerse is an interoperability layer. Content remains property of the source organization.
        </span>
        <a
          href={provenance.originalSourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-frost-cyan hover:text-white font-medium hover:underline ml-2"
        >
          View Original Source <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};
