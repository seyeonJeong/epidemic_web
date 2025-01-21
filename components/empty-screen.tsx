import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

const exampleMessages = [
  {
    heading: '마버그열의 유행 상황에 대해 알려줘',
    message: '마버그열의 유행 상황에 대해 알려줘'
  },
  {
    heading: '최근 대한민국의 백일해 사례에 대해 알려줘',
    message: '최근 대한민국의 백일해 사례에 대해 알려줘'
  },
  {
    heading: '코로나 바이러스의 증상에 대해 알려줘',
    message: '코로나 바이러스의 증상에 대해 알려줘'
  },
  {
    heading: '독감 예방법에 대해 알려줘',
    message: '독감 예방법에 대해 알려줘'
  }
]
export function EmptyScreen({
  submitMessage,
  className
}: {
  submitMessage: (message: string) => void
  className?: string
}) {
  return (
    <div className={`mx-auto w-full transition-all ${className}`}>
      <div className="bg-background p-2">
        <div className="mt-4 flex flex-col items-start space-y-2 mb-4">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base"
              name={message.message}
              onClick={async () => {
                submitMessage(message.message)
              }}
            >
              <ArrowRight size={16} className="mr-2 text-muted-foreground" />
              {message.heading}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}
