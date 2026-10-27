import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import PlaylistsPage from './PlaylistsPage';
import { PlaylistProvider } from './PlaylistContext';

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <MemoryRouter>
      <PlaylistProvider>
        {ui}
      </PlaylistProvider>
    </MemoryRouter>
  );
};

describe('PlaylistsPage', () => {
  it('báo lỗi khi tạo playlist trống và tạo thành công khi nhập tên', async () => {
    const user = userEvent.setup();
    renderWithProviders(<PlaylistsPage />);

    const createBtn = screen.getByRole('button', { name: /tạo/i });
    
    await user.click(createBtn);
    expect(screen.getByText('Tên playlist không được để trống')).toBeInTheDocument();

    const input = screen.getByPlaceholderText('Tên playlist mới...');
    await user.type(input, 'Nhạc Tập Gym');
    await user.click(createBtn);

    expect(screen.getByRole('link', { name: 'Nhạc Tập Gym' })).toBeInTheDocument();
  });
});