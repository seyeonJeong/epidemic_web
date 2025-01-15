// lib/agents/writer.tsx 또는 해당 파일 경로

'use client'

import { createStreamableUI, createStreamableValue } from 'ai/rsc'
import { CoreMessage, streamText } from 'ai'
import { createOpenAI } from '@ai-sdk/openai'
import { AnswerSection } from '@/components/answer-section'
import { AnswerSectionGenerated } from '@/components/answer-section-generated'

export async function writer(
  uiStream: ReturnType<typeof createStreamableUI>,
  messages: CoreMessage[]
): Promise<{ response: string; hasError: boolean }> {
  let fullResponse = ''
  let hasError = false

  // 스트림 가능한 값을 생성하여 UI에 연결
  const streamableAnswer = createStreamableValue<string>('')
  const answerSection = <AnswerSection result={streamableAnswer.value} />
  uiStream.append(answerSection)

  // OpenAI 클라이언트 초기화
  const openai = createOpenAI({
    baseURL: process.env.SPECIFIC_API_BASE,
    apiKey: process.env.SPECIFIC_API_KEY,
    organization: '' // optional organization
  })

  try {
    // streamText 호출 및 스트림 처리
    const result = await streamText({
      model: openai!.chat(process.env.SPECIFIC_API_MODEL || 'llama3-70b-8192'),
      maxTokens: 2500,
      system: `As a professional writer, your job is to generate a comprehensive and informative, yet concise answer of 400 words or less for the given question based solely on the provided search results (URL and content). You must only use information from the provided search results. Use an unbiased and journalistic tone. Combine search results together into a coherent answer. Do not repeat text. If there are any images relevant to your answer, be sure to include them as well. Aim to directly address the user's question, augmenting your response with insights gleaned from the search results. 
      Whenever quoting or referencing information from a specific URL, always cite the source URL explicitly. Please match the language of the response to the user's language.
      Always answer in Markdown format. Links and images must follow the correct format.
      Link format: [link text](url)
      Image format: ![alt text](url)
      `,
      messages,
      onFinish: event => {
        fullResponse = event.text
        streamableAnswer.done(event.text)
      }
    })

    // 스트림 순회하여 데이터 처리
    for await (const text of result.textStream) {
      if (text) {
        fullResponse += text
        streamableAnswer.update(fullResponse)
      }
    }
  } catch (err) {
    hasError = true
    const errorMessage = err instanceof Error ? err.message : 'Unknown error'
    fullResponse = 'Error: ' + errorMessage
    streamableAnswer.update(fullResponse)
    console.error('Error during writer:', err)
  } finally {
    streamableAnswer.done()
  }

  return { response: fullResponse, hasError }
}
