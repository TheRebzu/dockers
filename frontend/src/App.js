import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/users`);
      setUsers(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newUser.name.trim() || !newUser.email.trim()) {
      return;
    }
    
    try {
      await axios.post(`${API_URL}/api/users`, newUser);
      setNewUser({ name: '', email: '' });
      fetchUsers();
    } catch (error) {
      console.error('Erreur lors de la création de l\'utilisateur:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', error);
    }
  };

  return (
    <div className="app-container">
      {/* Header avec titre et description */}
      <header className="app-header">
        <h1 className="app-title">🐳 EcoDeli</h1>
        <p className="app-subtitle">Application Fullstack avec Docker - Gestion des Utilisateurs</p>
      </header>

      {/* Container principal avec deux colonnes */}
      <div className="main-container">
        {/* Section formulaire d'ajout */}
        <div className="form-section">
          <h2 className="section-title">✨ Ajouter un utilisateur</h2>
          <form onSubmit={handleSubmit} className="user-form">
            <div className="form-group">
              <input
                type="text"
                placeholder="💭 Entrez le nom complet"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="📧 Entrez l'adresse email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                required
                className="form-input"
              />
            </div>
            <button type="submit" className="submit-btn">
              🚀 Ajouter l'utilisateur
            </button>
          </form>
        </div>

        {/* Section liste des utilisateurs */}
        <div className="users-section">
          <h2 className="section-title">👥 Liste des utilisateurs</h2>
          
          {loading ? (
            <div className="loading">
              Chargement des utilisateurs...
            </div>
          ) : (
            <div className="users-list">
              {users.length === 0 ? (
                <div className="empty-state">
                  <p>🤷‍♂️ Aucun utilisateur trouvé</p>
                  <p>Commencez par ajouter votre premier utilisateur !</p>
                </div>
              ) : (
                users.map((user) => (
                  <div key={user.id} className="user-card">
                    <div className="user-info">
                      <div className="user-name">
                        👤 {user.name}
                      </div>
                      <div className="user-email">
                        📧 {user.email}
                      </div>
                      <div className="user-date">
                        📅 Ajouté le {new Date(user.created_at).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                    <button 
                      onClick={() => deleteUser(user.id)}
                      className="delete-btn"
                      aria-label={`Supprimer ${user.name}`}
                    >
                      🗑️ Supprimer
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer avec informations techniques */}
      <footer className="app-footer">
        <p>🔧 Backend: Node.js + Express + PostgreSQL | 🎨 Frontend: React | 🐳 Docker: Multi-conteneurs</p>
        <p>Port Frontend: 3000 | Port Backend: 3001 | Port Database: 5432</p>
      </footer>
    </div>
  );
}

export default App;
