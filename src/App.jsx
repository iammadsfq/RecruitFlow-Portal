import React, { useEffect, useState } from 'react';
import P1Jobs from './pages/P1Jobs';
import P2Apply from './pages/P2Apply';
import P3Submitted from './pages/P3Submitted';
import P4Track from './pages/P4Track';
import P5Invitations from './pages/P5Invitations';
import P5Interview from './pages/P5Interview';
import { BottomNav } from './components/UI';
import { MOCK_APPLICATIONS, MOCK_INVITATIONS } from './services/api';

export default function App() {
  const [page, setPage] = useState('p1'); // p1 | p2 | p3 | p4 | p5list | p5
  const [selectedJob, setSelectedJob] = useState(null);
  const [submission, setSubmission] = useState(null);
  const [trackCode, setTrackCode] = useState('APP-2026-X9A7');
  const [invitedApp, setInvitedApp] = useState(MOCK_INVITATIONS[0]);
  const [inviteReturnPage, setInviteReturnPage] = useState('p5list');

  useEffect(() => {
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
    <>
      {page === 'p1' && (
        <P1Jobs
          onSelectJob={(job) => {
            setSelectedJob(job);
            setPage('p2');
          }}
          onOpenTrack={() => setPage('p4')}
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

      {showBottomNav && (
        <BottomNav activePage={page === 'p5list' ? 'p5' : page} onNavigate={handleBottomNav} />
      )}
    </>
  );
}
