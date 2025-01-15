// lib/agents/query-suggestor.tsx

'use client'

import React from 'react'
import SearchRelated from '@/components/search-related' // Default Export 또는 Named Export에 맞게 조정
import { createStreamableUI, createStreamableValue } from 'ai/rsc'
import { CoreMessage, streamObject } from 'ai'
import { PartialRelated, relatedSchema } from '@/lib/schema/related'
import { getModel } from '../utils'

export async function querySuggestor(
  uiStream: ReturnType<typeof createStreamableUI>,
  messages: CoreMessage[]
): Promise<PartialRelated> {
  // 반환 타입 명시
  const objectStream = createStreamableValue<PartialRelated>()
  uiStream.append(<SearchRelated relatedQueries={objectStream.value} />)

  const lastMessages = messages.slice(-1).map(message => {
    return {
      ...message,
      role: 'user'
    }
  }) as CoreMessage[]

  let finalRelatedQueries: PartialRelated = {}

  try {
    const result = await streamObject({
      model: getModel(),
      system: `As a professional web researcher, your task is to generate a set of three queries that explore the subject matter more deeply, building upon the initial query and the information uncovered in its search results.

For instance, if the original query was "Starship's third test flight key milestones", your output should follow this format:

"{
  "related": [
    "What were the primary objectives achieved during Starship's third test flight?",
    "What factors contributed to the ultimate outcome of Starship's third test flight?",
    "How will the results of the third test flight influence SpaceX's future development plans for Starship?"
  ]
}"

Aim to create queries that progressively delve into more specific aspects, implications, or adjacent topics related to the initial query. The goal is to anticipate the user's potential information needs and guide them towards a more comprehensive understanding of the subject matter.
Please match the language of the response to the user's language.`,
      messages: lastMessages,
      schema: relatedSchema
    })

    // 스트림 순회하여 데이터 처리
    for await (const obj of result.partialObjectStream) {
      if (obj.items) {
        // 'items'가 있는지 확인
        objectStream.update(obj)
        finalRelatedQueries = obj
      }
    }
  } catch (error) {
    console.error('Error during querySuggestor:', error)
    // 필요에 따라 에러 핸들링 로직 추가
  } finally {
    objectStream.done()
  }

  return finalRelatedQueries
}
