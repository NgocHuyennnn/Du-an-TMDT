import CreateStore from '@/components/manager/CreateStore';
import EditStore from '@/components/manager/EditStore';
import StoreDetail from '@/components/manager/StoreDetail';
import StoreManagement from '@/components/manager/StoreManagement';
import { useState } from 'react';


export default function StoresPage() {
  const [view, setView] = useState('list');
  const [selected, setSelected] = useState(null);

  function handleBack() { setView('list'); setSelected(null); }

  if (view === 'create') return <CreateStore onBack={handleBack} />;
  if (view === 'edit' && selected) return <EditStore store={selected} onBack={handleBack} />;
  if (view === 'detail' && selected)
    return (
      <StoreDetail
        store={selected}
        onBack={handleBack}
        onEdit={(s) => { setSelected(s); setView('edit'); }}
      />
    );

  return (
    <StoreManagement
      onCreateStore={() => setView('create')}
      onEditStore={(s) => { setSelected(s); setView('edit'); }}
      onViewStore={(s) => { setSelected(s); setView('detail'); }}
    />
  );
}
