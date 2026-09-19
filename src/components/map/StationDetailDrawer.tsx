import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResearchStation } from '../../types/polar';
import { NavTab } from '../layout/Navbar';
import { StationDetailExperience } from './StationDetailExperience';

interface StationDetailDrawerProps {
  station: ResearchStation | null;
  onClose: () => void;
  onNavigate: (tab: NavTab, detailId?: string) => void;
  onSelectStation?: (station: ResearchStation) => void;
}

export const StationDetailDrawer: React.FC<StationDetailDrawerProps> = ({
  station,
  onClose,
  onNavigate,
  onSelectStation
}) => {
  if (!station) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="fixed inset-0 z-50 bg-polar-950/98 backdrop-blur-2xl overflow-y-auto"
      >
        <StationDetailExperience
          station={station}
          onSelectStation={(s) => {
            if (onSelectStation) {
              onSelectStation(s);
            }
          }}
          onNavigate={onNavigate}
          onClose={onClose}
        />
      </motion.div>
    </AnimatePresence>
  );
};
