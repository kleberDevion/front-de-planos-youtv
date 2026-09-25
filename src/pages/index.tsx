import React, { useState } from 'react';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Head from '../infra/components/Head';
import PlanTab from '../components/PlanTab';
import TrialTab from '../components/TrialTab';
import { Card, Page, PageHeader } from '../styles/global-styles';

type TabKey = 'teste' | 'plano';

const TABS: { key: TabKey; label: string }[] = [
  { key: 'teste', label: 'Solicitar teste' },
  { key: 'plano', label: 'Plano ativo' },
];

export default function Home() {
  const [tab, setTab] = useState<TabKey>('teste');

  return (
    <>
      <Head title="YouTV - Planos" />
      <Page>
        <PageHeader>
          <img src="/youtv-logo.png" alt="YouTV" />
          <h1>
            Planos YouTV <span>Premium</span>
          </h1>
          <p>Solicite o teste do YouTV Premium ou consulte o plano ativo.</p>
        </PageHeader>

        <Card>
          <Tabs
            value={tab}
            onChange={(_event, value: TabKey) => setTab(value)}
            variant="fullWidth"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            {TABS.map(({ key, label }) => (
              <Tab
                key={key}
                value={key}
                label={label}
                id={`aba-${key}`}
                aria-controls={`painel-${key}`}
              />
            ))}
          </Tabs>

          <div
            role="tabpanel"
            id="painel-teste"
            aria-labelledby="aba-teste"
            hidden={tab !== 'teste'}
          >
            <TrialTab />
          </div>
          <div
            role="tabpanel"
            id="painel-plano"
            aria-labelledby="aba-plano"
            hidden={tab !== 'plano'}
          >
            <PlanTab />
          </div>
        </Card>
      </Page>
    </>
  );
}
