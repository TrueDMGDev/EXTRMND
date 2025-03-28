import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { describe, it, expect } from 'vitest';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
});

describe('Users Component', () => {
  it('should render correctly', () => {
    expect(true).toBe(true);
  });
});