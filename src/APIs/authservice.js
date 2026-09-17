const BASE_URL = 'https://gig-program-apis-production.up.railway.app/api';
export const registerUser = async (userData) => {
  const response = await fetch(`${BASE_URL}/register/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: userData.email.trim(),
      password: userData.password,
      profile_data: {
        name: userData.name || '',
        role: 'customer',
      },
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.email?.[0] || data.password?.[0] || data.detail || 'Registration failed');
  }

  return data;
};

export const loginUser = async (credentials) => {
  const response = await fetch(`${BASE_URL}/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: credentials.email,
      password: credentials.password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || 'Data incorrect');
  }

  return data; // { access, refresh }
};

export const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) throw new Error('No refresh token available');

  const response = await fetch(`${BASE_URL}/token/refresh/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh: refreshToken }),
  });

  const data = await response.json();
  if (!response.ok) throw new Error('Session expired, please log in again');

  return data.access;
};

// بتاخد التوكن كـ argument بدل ما تقراه من localStorage بنفسها
export const getProfile = async (accessToken) => {
  const response = await fetch(`${BASE_URL}/api/me/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch profile');
  }

  return await response.json();
};

export const updateProfile = async (profileId, updateData, accessToken) => {
  const response = await fetch(`${BASE_URL}/profiles/${profileId}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    body: JSON.stringify({
      name: [updateData.firstName, updateData.lastName].filter(Boolean).join(' '),
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || 'Failed to update profile');
  }

  return data;
};