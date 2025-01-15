// lib/agents/researcher.tsx

'use client'

import { createStreamableUI, createStreamableValue } from 'ai/rsc'
import { CoreMessage, ToolResultPart, streamText } from 'ai'
import { getTools } from './tools'
import { getModel, transformToolMessages } from '../utils'
import { AnswerSection } from '@/components/answer-section'

export async function researcher(
  uiStream: ReturnType<typeof createStreamableUI>,
  streamableText: ReturnType<typeof createStreamableValue<string>>,
  messages: CoreMessage[]
): Promise<{
  fullResponse: string
  hasError: boolean
  toolResponses: ToolResultPart[]
  finishReason: string
}> {
  let fullResponse = ''
  let hasError = false
  let finishReason = ''

  // Transform the messages if using Ollama provider
  let processedMessages = messages
  const useOllamaProvider = !!(
    process.env.OLLAMA_MODEL && process.env.OLLAMA_BASE_URL
  )
  const useAnthropicProvider = !!process.env.ANTHROPIC_API_KEY
  if (useOllamaProvider) {
    processedMessages = transformToolMessages(messages)
  }
  const includeToolResponses = messages.some(message => message.role === 'tool')
  const useSubModel = useOllamaProvider && includeToolResponses

  const streamableAnswer = createStreamableValue<string>('')
  const answerSection = <AnswerSection result={streamableAnswer.value} />

  const currentDate = new Date().toLocaleString()

  // Initialize toolOutputs to collect tool responses
  let toolOutputs: ToolResultPart[] = []

  try {
    const result = await streamText({
      model: getModel(useSubModel),
      maxTokens: 2500,
      system: `As a professional search expert, you possess the ability to search for any information on the web.
or any information on the web.
For each user query, utilize the search results to their fullest potential to provide additional information and assistance in your response.
If there are any images relevant to your answer, be sure to include them as well.
Aim to directly address the user's question, augmenting your response with insights gleaned from the search results.
Whenever quoting or referencing information from a specific URL, always explicitly cite the source URL using the [[number]](url) format. Multiple citations can be included as needed, e.g., [[number]](url), [[number]](url).
The number must always match the order of the search results.
The retrieve tool can only be used with URLs provided by the user. URLs from search results cannot be used.
If it is a domain instead of a URL, specify it in the include_domains of the search tool.
Please match the language of the response to the user's language. Current date and time: ${currentDate}
      `,
      messages: processedMessages,
      tools: getTools({
        uiStream,
        fullResponse
      }),
      onFinish: async event => {
        finishReason = event.finishReason
        fullResponse = event.text
        streamableAnswer.done()
      }
    })

    // Stream 순회하여 데이터 처리
    for await (const delta of result.fullStream) {
      switch (delta.type) {
        case 'text-delta':
          if (delta.textDelta) {
            fullResponse += delta.textDelta
            if (useAnthropicProvider && !includeToolResponses) {
              streamableText.update(fullResponse)
            } else {
              streamableAnswer.update(fullResponse)
            }
          }
          break
        case 'tool-call':
          // Tool call 처리 로직 추가 (필요 시)
          break
        case 'tool-result':
          if (!delta.result) {
            hasError = true
          }
          toolOutputs.push(delta)
          break
        case 'error':
          console.log('Error: ' + delta.error)
          hasError = true
          fullResponse += `\nError occurred while executing the tool`
          break
      }
    }
  } catch (err) {
    hasError = true
    fullResponse = 'Error: ' + (err as Error).message
    streamableText.update(fullResponse)
    console.error('Error during researcher:', err)
  } finally {
    streamableText.done()
  }

  return { fullResponse, hasError, toolResponses: toolOutputs, finishReason }
}
