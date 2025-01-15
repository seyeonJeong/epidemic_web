// lib/agents/inquire.tsx

'use client'

import React from 'react'
import Copilot from '@/components/copilot' // Default Export
import { createStreamableUI, createStreamableValue } from 'ai/rsc'
import { CoreMessage, streamObject } from 'ai'
import { PartialInquiry, inquirySchema } from '@/lib/schema/inquiry'
import { getModel } from '../utils'

export async function inquire(
  uiStream: ReturnType<typeof createStreamableUI>,
  messages: CoreMessage[]
): Promise<PartialInquiry> {
  // 반환 타입 명시
  const objectStream = createStreamableValue<PartialInquiry>()
  uiStream.update(<Copilot inquiry={objectStream.value} />)

  let finalInquiry: PartialInquiry = {}

  try {
    const result = await streamObject({
      model: getModel(),
      system: `As a professional web researcher, your role is to deepen your understanding of the user's input by conducting further inquiries when necessary.
      After receiving an initial response from the user, carefully assess whether additional questions are absolutely essential to provide a comprehensive and accurate answer. Only proceed with further inquiries if the available information is insufficient or ambiguous.

      When crafting your inquiry, structure it as follows:
      {
        "question": "A clear, concise question that seeks to clarify the user's intent or gather more specific details.",
        "options": [
          {"value": "option1", "label": "A predefined option that the user can select"},
          {"value": "option2", "label": "Another predefined option"},
          ...
        ],
        "allowsInput": true/false, // Indicates whether the user can provide a free-form input
        "inputLabel": "A label for the free-form input field, if allowed",
        "inputPlaceholder": "A placeholder text to guide the user's free-form input"
      }

      Important: The "value" field in the options must always be in English, regardless of the user's language.

      For example:
      {
        "question": "What specific information are you seeking about Rivian?",
        "options": [
          {"value": "history", "label": "History"},
          {"value": "products", "label": "Products"},
          {"value": "investors", "label": "Investors"},
          {"value": "partnerships", "label": "Partnerships"},
          {"value": "competitors", "label": "Competitors"}
        ],
        "allowsInput": true,
        "inputLabel": "If other, please specify",
        "inputPlaceholder": "e.g., Specifications"
      }

      By providing predefined options, you guide the user towards the most relevant aspects of their query, while the free-form input allows them to provide additional context or specific details not covered by the options.
      Remember, your goal is to gather the necessary information to deliver a thorough and accurate response.
      Please match the language of the response (question, labels, inputLabel, and inputPlaceholder) to the user's language, but keep the "value" field in English.
      `,
      messages,
      schema: inquirySchema
    })

    for await (const obj of result.partialObjectStream) {
      if (obj) {
        objectStream.update(obj)
        finalInquiry = obj
      }
    }
  } catch (error) {
    console.error('Error during inquire:', error)
    // 필요에 따라 에러 핸들링 로직 추가
  } finally {
    objectStream.done()
  }

  return finalInquiry
}
