const BASE_URL = 'https://gig-program-apis-production.up.railway.app/api';
export const registerUser = async (userData) => {
  const response = await fetch(`${BASE_URL}/register/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: userData.email.trim(),
      password: userData.password,
      profile_data: {
        project_name: userData.name || 'Exclusive', 
        role: 'landlord',                          
        phone: '+20123456789'
      }
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.email?.[0] || data.detail || 'Registration failed');
  }

  return data;
};
export const loginUser = async (credentials) => {
  const response = await fetch(`${BASE_URL}/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: credentials.email,
      password: credentials.password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || 'Data incorrect');
  }

  if (data.access) {
    localStorage.setItem('accessToken', data.access);
    localStorage.setItem('refreshToken', data.refresh);
  }

  return data;
};
export const updateProfile = async (profileId, updateData) => {
  const token = localStorage.getItem('token');

  const response = await fetch(`${BASE_URL}/api/profiles/${profileId}/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      first_name: updateData.firstName,
      last_name: updateData.lastName,
      email: updateData.email
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || 'Failed to update profile');
  }

  return data;
};

import axios from 'axios';

export async function getProfile() {
  const token = localStorage.getItem('user_token');
  
  const response = await fetch('YOUR_API_BASE_URL/api/profiles/me/', { 
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error('Failed to fetch profile');
  }

  return await response.json();
}