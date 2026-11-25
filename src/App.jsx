import React, { useEffect, useState } from 'react';
import { ReactLenis } from 'lenis/react';
import { AnimatePresence, motion } from 'motion/react';
import Landing from './pages/Landing';
import P1Jobs from './pages/P1Jobs';
import P2Apply from './pages/P2Apply';
import P3Submitted from './pages/P3Submitted';
import P4Track from './pages/P4Track';
import P5Invitations from './pages/P5Invitations';
import P5Interview from './pages/P5Interview';
import { BottomNav } from './components/UI';
import { MOCK_INVITATIONS, fetchInterviewOffer } from './services/api';

export default function App() {
  const [page, setPage] = useState('landing'); // landing | p1 | p2 | p3 | p4 | p5list | p5
  const [selectedJob, setSelectedJob] = useState(null);
  const [submission, setSubmission] = useState(null);
  const [trackCode, setTrackCode] = useState('APP-2026-X9A7');
  const [invitedApp, setInvitedApp] = useState(MOCK_INVITATIONS[0]);
  const [inviteReturnPage, setInviteReturnPage] = useState('p5list');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const statusToken = params.get('token');
    const interviewToken = params.get('interview');
    const path = window.location.pathname;

    if (interviewToken || path.startsWith('/interview/')) {
      const tok = interviewToken || path.replace('/interview/', '').trim();
      if (tok) {
        fetchInterviewOffer(tok).then((offer) => {
          if (offer) setInvitedApp(offer);
          setInviteReturnPage('p1');
          setPage('p5');
        });
      }
    } else if (statusToken || path.startsWith('/track/')) {
      const tok = statusToken || path.replace('/track/', '').trim();
      if (tok) {
        setTrackCode(tok);
        setPage('p4');
      }
    }

    const handler = (e) => {
      if (e.detail) setPage(e.detail);
    };
    window.addEventListener('rf-portal-nav', handler);
    return () => window.removeEventListener('rf-portal-nav', handler);
  }, []);

  const showBottomNav = page === 'p1' || page === 'p4' || page === 'p5list' || page === 'p5';

  const handleBottomNav = (dest) => {
    if (dest === 'p5') setPage('p5list');
    else setPage(dest);
  };

  return (
    <ReactLenis root options={{ duration: 1.05, smoothWheel: true }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {page === 'landing' && (
            <Landing
              onExploreJobs={() => setPage('p1')}
              onTrackStatus={() => setPage('p4')}
            />
          )}

          {page === 'p1' && (
            <P1Jobs
              onSelectJob={(job) => {
                setSelectedJob(job);
                setPage('p2');
              }}
              onOpenTrack={() => setPage('p4')}
              onBackLanding={() => setPage('landing')}
            />
          )}

          {page === 'p2' && (
            <P2Apply
              job={selectedJob}
              onBack={() => setPage('p1')}
              onSubmitted={(sub) => {
                setSubmission(sub);
                setTrackCode(sub.code);
                setPage('p3');
              }}
              onGoTrack={(code) => {
                setTrackCode(code);
                setPage('p4');
              }}
            />
          )}

          {page === 'p3' && (
            <P3Submitted
              submission={submission}
              onTrack={(code) => {
                setTrackCode(code);
                setPage('p4');
              }}
              onBackHome={() => setPage('p1')}
            />
          )}

          {page === 'p4' && (
            <P4Track
              initialCode={trackCode}
              onBack={() => setPage(submission ? 'p3' : 'p1')}
              onOpenInvite={(app) => {
                setInvitedApp(app);
                setInviteReturnPage('p4');
                setPage('p5');
              }}
            />
          )}

          {page === 'p5list' && (
            <P5Invitations
              onSelectInvitation={(inv) => {
                setInvitedApp(inv);
                setInviteReturnPage('p5list');
                setPage('p5');
              }}
            />
          )}

          {page === 'p5' && (
            <P5Interview
              key={invitedApp?.id || invitedApp?.code}
              application={invitedApp}
              onBackToStatus={() => setPage(inviteReturnPage)}
              onBackHome={() => setPage('p1')}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {showBottomNav && (
        <BottomNav activePage={page === 'p5list' ? 'p5' : page} onNavigate={handleBottomNav} />
      )}
    </ReactLenis>
  );
}
