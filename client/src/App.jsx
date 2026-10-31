import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import WorkshopCatalog from './features/workshops/WorkshopCatalog';
import WorkshopDetailModal from './features/workshops/WorkshopDetailModal';
import WorkshopFormModal from './features/workshops/WorkshopFormModal';
import BookingModal from './features/booking/BookingModal';
import MoodPulseModal from './features/mood-pulse/MoodPulseModal';
import DigitalVaultView from './features/vault/DigitalVaultView';
import AnalyticsView from './features/analytics/AnalyticsView';
import AdminDashboardView from './features/admin/AdminDashboardView';
import AuthModal from './features/auth/AuthModal';

export default function App() {
  const [activeTab, setActiveTab] = useState('workshops');
  const [workshops, setWorkshops] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [vaultItems, setVaultItems] = useState([]);

  // Estado de Usuario Autenticado
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('desahogo_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Modales
  const [selectedWorkshopForDetail, setSelectedWorkshopForDetail] = useState(null);
  const [selectedWorkshopForBooking, setSelectedWorkshopForBooking] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login');
  const [isWorkshopFormOpen, setIsWorkshopFormOpen] = useState(false);
  const [workshopToEdit, setWorkshopToEdit] = useState(null);

  const isAdmin = currentUser?.role === 'admin';

  // Carga de datos desde la API
  const loadData = () => {
    fetch('/api/workshops')
      .then((res) => res.json())
      .then((data) => setWorkshops(data))
      .catch((err) => console.error('Error cargando workshops:', err));

    fetch('/api/sessions')
      .then((res) => res.json())
      .then((data) => setSessions(data))
      .catch((err) => console.error('Error cargando sesiones:', err));

    fetch('/api/vault')
      .then((res) => res.json())
      .then((data) => setVaultItems(data))
      .catch((err) => console.error('Error cargando bóveda:', err));
  };

  useEffect(() => {
    loadData();

    // Si hay un token pero no user, o para validar sesión
    const token = localStorage.getItem('desahogo_token');
    if (token) {
      fetch('/api/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then((res) => (res.ok ? res.json() : null))
        .then((user) => {
          if (user) {
            setCurrentUser(user);
            localStorage.setItem('desahogo_user', JSON.stringify(user));
          } else {
            // Token expirado o inválido
            localStorage.removeItem('desahogo_token');
            localStorage.removeItem('desahogo_user');
            setCurrentUser(null);
          }
        })
        .catch(() => {});
    }
  }, []);

  const handleOpenAuth = (mode = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleAuthSuccess = (user, token) => {
    setCurrentUser(user);
    if (user.role === 'admin') {
      setActiveTab('admin');
    }
    loadData();
  };

  const handleLogout = () => {
    localStorage.removeItem('desahogo_token');
    localStorage.removeItem('desahogo_user');
    setCurrentUser(null);
    if (activeTab === 'admin') {
      setActiveTab('workshops');
    }
  };

  const handleOpenCreateWorkshop = () => {
    setWorkshopToEdit(null);
    setIsWorkshopFormOpen(true);
  };

  const handleOpenEditWorkshop = (workshop) => {
    setWorkshopToEdit(workshop);
    setIsWorkshopFormOpen(true);
  };

  const handleDeleteWorkshop = async (workshopId) => {
    if (!window.confirm('¿Estás segura de eliminar este taller vivencial de la portada?')) return;

    const token = localStorage.getItem('desahogo_token');
    try {
      const res = await fetch(`/api/workshops/${workshopId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        loadData();
      }
    } catch (err) {
      console.error('Error eliminando taller:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F0F11] text-[#EAEAEA] flex flex-col font-sans">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {activeTab === 'workshops' && (
          <WorkshopCatalog
            workshops={workshops}
            onSelectWorkshop={(w) => setSelectedWorkshopForDetail(w)}
            onBookWorkshop={(w) => setSelectedWorkshopForBooking(w)}
            isAdmin={isAdmin}
            onOpenCreateWorkshop={handleOpenCreateWorkshop}
            onOpenEditWorkshop={handleOpenEditWorkshop}
          />
        )}

        {activeTab === 'pulse' && (
          <MoodPulseModal
            onPulseSaved={() => {
              loadData();
            }}
          />
        )}

        {activeTab === 'vault' && (
          <DigitalVaultView
            vaultItems={vaultItems}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsView />
        )}

        {activeTab === 'admin' && isAdmin && (
          <AdminDashboardView
            workshops={workshops}
            currentUser={currentUser}
            onOpenCreateWorkshop={handleOpenCreateWorkshop}
            onOpenEditWorkshop={handleOpenEditWorkshop}
            onDeleteWorkshop={handleDeleteWorkshop}
          />
        )}
      </main>

      {/* Footer Introspectivo */}
      <footer className="border-t border-[#27272E] bg-[#0A0A0C] py-8 text-neutral-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>&copy; {new Date().getFullYear()} Desahogo &amp; Éxodo. Plataforma de Catarsis &amp; Acompañamiento Vivencial.</p>
          <div className="flex items-center gap-6">
            <span>Privacidad de Datos Emocionales</span>
            <span>Espacios de Contención</span>
            <span>Contacto: talleres@desahogo.com</span>
          </div>
        </div>
      </footer>

      {/* Modales */}
      {selectedWorkshopForDetail && (
        <WorkshopDetailModal
          workshop={selectedWorkshopForDetail}
          onClose={() => setSelectedWorkshopForDetail(null)}
          onBook={(w) => setSelectedWorkshopForBooking(w)}
        />
      )}

      {selectedWorkshopForBooking && (
        <BookingModal
          workshop={selectedWorkshopForBooking}
          sessions={sessions}
          currentUser={currentUser}
          onOpenAuth={handleOpenAuth}
          onClose={() => setSelectedWorkshopForBooking(null)}
          onBookingSuccess={() => {
            loadData();
          }}
        />
      )}

      <AuthModal
        isOpen={isAuthModalOpen}
        initialMode={authModalMode}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      <WorkshopFormModal
        isOpen={isWorkshopFormOpen}
        workshopToEdit={workshopToEdit}
        onClose={() => setIsWorkshopFormOpen(false)}
        onSaved={() => {
          loadData();
        }}
      />
    </div>
  );
}
