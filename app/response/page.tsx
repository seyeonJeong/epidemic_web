// app/response/page.tsx

import React, { Suspense } from 'react'
import ChatInterface from '@/components/chatinterface'

export default function ResponsePage() {
  return (
    <Suspense fallback={<div>Loading chat...</div>}>
      <ChatInterface />
    </Suspense>
  )
}
