import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const getStoredUsers = () => {
  try {
    const data = localStorage.getItem('eventhub_users');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveUsers = (users) => {
  localStorage.setItem('eventhub_users', JSON.stringify(users));
};

const getStoredSession = () => {
  try {
    const data = localStorage.getItem('eventhub_session');
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Restore session on app load
  useEffect(() => {
    const session = getStoredSession();
    if (session) {
      setUser(session);
    }
  }, []);

  // Register new account — returns { success, error }
  const register = (name, email, password, role) => {
    const allUsers = getStoredUsers();
    const exists = allUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    if (exists) {
      return { success: false, error: 'An account with this email already exists. Please log in instead.' };
    }

    const newUser = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: password,
      role: role,
      createdAt: new Date().toISOString(),
    };

    saveUsers([...allUsers, newUser]);

    // Auto-login after register
    const session = { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role };
    localStorage.setItem('eventhub_session', JSON.stringify(session));
    setUser(session);
    return { success: true };
  };

  // Login — returns { success, error }
  const login = (email, password) => {
    const allUsers = getStoredUsers();
    const found = allUsers.find(
      (u) => u.email.toLowerCase() === email.trim().toLowerCase()
    );

    if (!found) {
      return { success: false, error: 'No account found with this email. Please sign up first.' };
    }
    if (found.password !== password) {
      return { success: false, error: 'Incorrect password. Please try again.' };
    }

    const session = { id: found.id, name: found.name, email: found.email, role: found.role };
    localStorage.setItem('eventhub_session', JSON.stringify(session));
    setUser(session);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem('eventhub_session');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
