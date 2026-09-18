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
        username: userData.email.trim(),
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

export const getProfile = async (accessToken) => {
  const response = await fetch(`${BASE_URL}/api/me/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
  });

  if (!response.ok) {
    const error = new Error('Failed to fetch profile');
    error.status = response.status;
    throw error;
  }

  return await response.json();
};

export function decodeToken(token) {
  try {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  } catch (error) {
    console.error('Failed to decode token:', error);
    return null;
  }
}

export const listProfiles = async (accessToken) => {
  const response = await fetch(`${BASE_URL}/profiles/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
  });

  if (!response.ok) {
    const error = new Error('Failed to list profiles');
    error.status = response.status;
    throw error;
  }

  return await response.json(); // array of Profile
};

export const createProfile = async (profileData, accessToken) => {
  const response = await fetch(`${BASE_URL}/profiles/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    body: JSON.stringify(profileData),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error('createProfile validation error:', data);
    const message =
      data && typeof data === 'object'
        ? Object.entries(data)
            .map(([field, msgs]) => `${field}: ${Array.isArray(msgs) ? msgs.join(', ') : msgs}`)
            .join(' | ')
        : 'Failed to create profile';
    const error = new Error(message || 'Failed to create profile');
    error.status = response.status;
    throw error;
  }

  return data;
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
      ...(updateData.image !== undefined ? { image: updateData.image } : {}),
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    console.error('updateProfile validation error:', data);
    const message =
      data && typeof data === 'object'
        ? Object.entries(data)
            .map(([field, msgs]) => `${field}: ${Array.isArray(msgs) ? msgs.join(', ') : msgs}`)
            .join(' | ')
        : 'Failed to update profile';
    const error = new Error(message || 'Failed to update profile');
    error.status = response.status;
    throw error;
  }

  return data;
};
