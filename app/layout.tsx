'use client'
import './globals.css';
import React from 'react';
import { Provider } from 'react-redux';
import {store} from '@/redux/store';

const metadata = {
  title: 'Weather Search',
  description: 'Search weather information like Google search',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  )
}
