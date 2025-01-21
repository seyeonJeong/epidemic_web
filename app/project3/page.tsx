'use client'

import React from 'react'
import Image from 'next/image'
import fig1 from '../../components/images/architecture.png'
import fig2 from '../../components/images/experiments.png'
import map from '../../components/images/map.png'

const CovidStatsPage = () => {
  return (
    <div className="p-8 bg-white-100 min-h-screen">
      {/* Header */}
      <h1 className="text-4xl font-bold mb-6 mt-40 text-center text-indigo-600">
        Research on Infectious Disease AI Agent Using Large Language Models
        <br></br>
        :Focusing on Domestic Infectious Disease Data
      </h1>
      <p className="text-center text-gray-600">JICS (under review)</p>
      <p className="text-center text-gray-600">
        Seyeon Jeong<sup>1</sup>, Beakcheol Jang<sup>1*</sup>
      </p>

      {/* Buttons */}
      {/*<div className="flex justify-center space-x-4 mt-8">
        <button className="bg-gray-200 py-2 px-6 rounded-lg hover:bg-gray-300">
          Paper
        </button>
        <button className="bg-gray-200 py-2 px-6 rounded-lg hover:bg-gray-300">
          arXiv
        </button>
        <button className="bg-gray-200 py-2 px-6 rounded-lg hover:bg-gray-300">
          Code
        </button>
      </div>*/}

      {/* Abstract 섹션 */}
      <div className="mt-16 bg-white rounded-lg p-6 mx-auto max-w-5xl">
        <h2 className="text-2xl font-semibold mb-4 text-center">Abstract</h2>
        <p className="text-gray-600">
          코로나19 팬데믹은 전 세계적으로 감염병 및 공중보건의 중요성과 이에
          대한 신속한 대응의 필요성을 깊이 인식하게 했다. 직면 한 문제를
          해결하기 위해, 인공지능 기술이 적극적으로 도입되고 있으나, 기존의
          모델들은 학습된 데이터에 의존하여 새로운 감염병 과 학습되지 않은
          데이터에 효과적인 대응이 불가능하다. 이를 위해, 본 논문은 대규모 언어
          모델을 활용하여 미세 조정 없이 단일 LLM보다 풍부한 감염병 정보 제공과
          최신 감염병 정보에 대한 대응이 가능한 감염병 AI 에이전트를 설계 및
          구축하는 것을 목적으로 한다. 감염병 AI 에이전트는 대규모 언어 모델을
          기반으로 검색 증강 생성 시스템과 웹 검색 API를 기반으로 구성된다. 본
          연구에서는 국내에서 제작된 감염병 데이터를 수집하여 활용하였다.
          질의응답 데이터를 바탕으로 한 실험 결과 BERTScore의 F1 score를
          기준으로 2.99%, 문장 유사도 평가에서는 9.2%의 성능 향상을 기록하였다.
          추가적으로 GPT-4o mini 기반의 환각(hallucination) 점수 평가에서도 기존
          시스템보다 40% 향상된 성능을 보였다. 본 연구는 감염병 AI 에이전트가
          공중보건 위기관리의 중요한 도구가 될 가능성을 시사 하며, 다양한
          분야에서의 활용 가능성을 제시한다.
        </p>
      </div>

      {/* 이미지 섹션 */}
      <div className="mt-16 flex justify-center">
        <div className="text-center">
          <Image
            src={fig1}
            alt="Architecture and Operational Process of the Infectious Disease AI Agent"
            width={800}
            height={500}
            className="rounded-lg"
          />
          <p className="mt-4 text-gray-600">
            Architecture and Operational Process of the Infectious Disease AI
            Agent
          </p>
        </div>
      </div>

      {/* Method 섹션 */}
      <div className="mt-16 bg-white rounded-lg p-6 mx-auto max-w-5xl">
        <h2 className="text-2xl font-semibold mb-4 text-center">Method</h2>
        <p className="text-gray-600">
          본 연구는 Core LLM, RAG, 검색 API를 조합하여 감염병에 특화된 AI
          에이전트 프레임워크를 개발하였다. 해당 구조의 순서는 아래와 같다.
        </p>
        <br></br>
        <ol className="list-decimal pl-6 text-gray-600">
          <li>사용자로부터 감염병 관련 질문을 받는다.</li>
          <li>
            LLM은 해당 질문을 분석하여 RAG와 검색 API 중 사용할 도구와 구체적인
            질의를 선택한다.
          </li>
          <li>선택된 질의로 도구에서 실행된 정보를 획득한다.</li>
          <li>
            LLM이 수집된 정보를 바탕으로 최종 답변을 도출할 수 없을 경우, 2번
            과정으로 돌아간다.
          </li>
          <li>최종 답변을 도출할 수 있다면, 이를 사용자에게 전달한다.</li>
        </ol>
        <br></br>
        <p className="text-gray-600">
          <b>Core LLM</b>
          <br></br>LLM은 LLaMA-3.1-70B[1]와 Qwen 72B[2]를 활용한다. 이는
          오픈소스 모델로서 GPT-4[3]와 Anthropic의 Claude-3.5-Sonnet[4]과 같은
          폐쇄형 모델들과 경쟁력을 갖추며, 비용 면에서 이점을 가진다. 이
          연구에서는 질문에 대한 다변을 생성할 수 있도록 미세 조정된
          LLaMA-3.1-70B-Instruct 모델과 Qwen-2.5-72B-Instruct 모델을 사용하며,
          GPU 자원의 효율적 활용을 위해 양자화 기법인 AWQ를 사용한다[5].
        </p>
        <br></br>
        <p className="text-gray-600">
          <b>검색 API</b>
          <br></br>본 연구에서는 검색 API로 Google Custom Search API[6]를
          활용한다. 이는 Google이 제공하는 사용자 정의 검색 엔진으로, 사용자가
          특정 웹사이트를 대상으로 맞춤화된 검색 기능을 제공할 수 있다. 또한
          '세이프 서치'와 같은 기능을 통해 질 낮은 사이트에 접속하는 것을 방지
          하여 수집되는 문서들의 신뢰성을 보장한다. 또한 검색 API는 기존 LLM의
          한계점인 모델 지식이 학습된 시점에 머물게 되는 문제[7]를 해결한다.
        </p>
        <br></br>
        <p className="text-gray-600">
          <b>검색 증강 생성 (RAG)</b>
          <br></br>RAG 접근법은 외부 지식 소스를 활용하여 LLM의 성능을 강화하는
          기법이다[8]. 사용자 입력을 벡터화하여 벡터 저장소에서 관련성이 높은
          문서나 데이터를 검색한다. 우리는 벡터 저장소로 Facebook AI Similarity
          Search (FAISS)[9]를 선정하였다. 이는 대표적인 오픈 소스 벡터
          데이터베이스 저장소 모델이며, 유사도 검색에서 근접 이웃(K-Nearest
          Neighbor, KNN) 기법을 사용하여 정해진 개수의 문서를 검색할 수 있는
          장점을 가진다. 본 연구에서는 가장 유사한 하나의 문서를 답변 생성에
          활용한다.
        </p>
      </div>

      {/* Dataset 섹션 */}
      <div className="mt-16 bg-white rounded-lg p-6 mx-auto max-w-5xl">
        <h2 className="text-2xl font-semibold mb-4 text-center">Dataset</h2>
        <p className="text-gray-600">
          <b>For RAG</b>
          <br></br>감염병에 전문적인 검색 증강 생성을 위한 벡터 저장 소를
          구축하기 위해서는 감염병 관련 문서들에 대한 수 집을 진행 한다. 이를
          위해 Wikipedia[10] 크롤링을 통해 감 염병 카테고리에 해당되는 데이터들
          중 관련성이 낮은 문서들을 제외한 614개의 문서를 수집한다. 또한, 감염병
          포털[11]의 법정 감염병 문서 131개와 질병관리청[12]의 감 염병 검색 결과
          85개의 문서를 추가로 확보하여, 총 830 개의 감염병 정보가 담긴 문서를
          활용한다.
          <br></br>
          <br></br>
          <b>For Experiments</b>
          <br></br>정량적 평가를 위해 AI Hub[13]의 “초거대 헬스케어 질 의응답
          데이터”의 “감염성 질환”을 활용한다. 해당 데이 터에는 “결핵”, “콜레라”
          와 같은 감염성 질환과 해당 질 병에 대한 “증상”, “약물”, “예방”과 같은
          카테고리로 분 류되는 질의응답 데이터로 구성된다. 하지만, 질문 데이
          터와 응답 데이터의 쌍이 맞지 않는 문제가 발생한다. 우 리는 응답
          데이터의 신뢰성이 더 높다고 판단하였고, GPT-4[3]를 통해, 응답
          데이터에서 질문 데이터를 생성하 여 감염병 질의응답 데이터를 구축한다.
          데이터는 전적으로 국내에서 수집된 데이터를 활용하였다.
        </p>
      </div>

      {/* 이미지 섹션 */}
      <div className="mt-16 flex justify-center">
        <div className="text-center">
          <Image
            src={fig2}
            alt="Graph of BERTScore Results: F1 Score, Precision, and Recall"
            width={800}
            height={500}
            className="rounded-lg"
          />
          <p className="mt-4 text-gray-600">
            Graph of BERTScore Results: F1 Score, Precision, and Recall
          </p>
        </div>
      </div>

      {/* Experiments 섹션 */}
      <div className="mt-16 bg-white rounded-lg p-6 mx-auto max-w-5xl">
        <h2 className="text-2xl font-semibold mb-4 text-center">Experiments</h2>
        <p className="text-gray-600">
          <b>BERTScore</b>
          <br></br>
          BERTScore는 기존의 n-gram 기반의 평가 지표의 한계를 보완하기 위해
          개발된 평가 지표이다. 결과의 분석은 다음과 같다. F1 Score 와
          정밀도에서는 감염병 AI 에이전트가 우세한 성능을 보인다. 특히, F1
          Score에서 최대 2.99%의 성능 향상을 보인다. 하지만, 재현율에서는 비교적
          낮은 점수를 기록하 였는데, 이는 모델이 정확한 정보를 제공하는 반면,
          정답 문장과 관련된 모든 정보를 충분히 포괄하지 못했기 때 문으로
          해석된다.
          <br></br>
          <br></br>
          <b>Sentence Similarity</b>
          <br></br>
          문장 유사도는 BERTScore와 마찬가지로 두 문장의 유사성을 평가하는
          지표이지만, 토큰 단위가 아닌 문장 전 체를 하나의 벡터로 임베딩하여
          유사도를 측정한다는 점 에서 차이가 있다. 이 방식은 문장 내 단어의
          세부적인 매칭보다는 문장의 전체적인 의미를 포착하는 데 초점을
          맞춘다.실험 결과, Qwen 모델을 기반으로 구현한 감염병 AI 에이전트가
          가장 높은 성능을 기록하였으며, 단일 LLaMA 모델과 LLaMA 기반 감염병 AI
          에이전트 간의 점수 차이가 9.2% 향상되며, 가장 크게 나타난다.
          <br></br>
          <br></br>
          <b>Hallucination Score</b>
          <br></br>본 연구에서는 RAG와 검색 API 호출을 결합 한 감염병 AI
          에이전트가 환각 현상의 완화에 도움이 될 수 있는지를 실험한다. 또한,
          감염병 관련 응답에서 발생 하는 환각 현상을 객관적으로 측정할 수 있는
          기존의 평 가 지표가 부족하다는 문제를 해결하기 위해, GPT와 같은 모델을
          심사위원으로 활용한 “LLM as a Judge” 기법 [14]을 적용하였으며, 자체적
          평가 지표인 환각 점수(Hallucination score)를 통한 비교를 진행한다.
          LLaM A-3.1-70B-Instruct 모델과 LLaMA 기반의 감염병 AI 에이 전트를
          비교한 결과, 에이전트 모델이 대체적으로 낮은 환각 점수로 기록된다.
          특히 첫 번째 실험에서는 LLaMA 모델의 환각 점수가 약 0.36로 가장 높게
          나타난 반면, 에이전트 모델에서는 약 0.22로 에이전트 적용이 환각 현상
          을 약 40% 완화시켰음을 보인다. 한편, Qwen-2.5-72B-Inst ruct 모델과
          Qwen 기반의 감염병 AI 에이전트를 비교한 결과, 단일 Qwen 모델 또한 낮은
          환각 점수를 기록하였 지만, 에이전트를 적용한 경우 더욱 일관적으로 낮은
          점 수를 유지한다. 이러한 결과는 RAG와 검색 API 호출을 통해 정확한
          정보를 기반으로 답변을 생성하는 방식이 환각 현상을 완화하는 데
          효과적임을 보여준다.
        </p>
      </div>

      {/* Reference 섹션 */}
      <div className="mt-16 bg-white rounded-lg p-6 mx-auto max-w-5xl">
        <h2 className="text-2xl font-semibold mb-4 text-center">Reference</h2>
        <p className="text-gray-600">
          [1] Dubey, Abhimanyu, et al. "The llama 3 herd of models." arXiv
          preprint arXiv:2407.21783 (2024).<br></br>
          [2] Yang, An, et al. "Qwen2. 5 Technical Report." arXiv preprint
          arXiv:2412.15115 (2024). <br></br>
          [3] Achiam, Josh, et al. "Gpt-4 technical report." arXiv preprint
          arXiv:2303.08774 (2023). <br></br>
          [4] Anthropic. "Claude 3.5 and a Sonnet for the Ages." Anthropic,
          2023. https://www.anthropic.com/news/claude-3-5-sonnet. <br></br>
          [5] Lin, Ji, et al. "AWQ: Activation-aware Weight Quantization for
          On-Device LLM Compression and Acceleration." Proceedings of Machine
          Learning and Systems 6 (2024): 87-100. <br></br>
          [6] Google Custom Search
          https://programmablesearchengine.google.com/about/ <br></br>
          [7] Zhao, Wayne Xin, et al. "A survey of large language models." arXiv
          preprint arXiv:2303.18223 (2023). <br></br>[8] Lewis, Patrick, et al.
          "Retrieval-augmented generation for knowledge-intensive nlp tasks."
          Advances in Neural Information Processing Systems 33 (2020):
          9459-9474. <br></br>[9] Douze, Matthijs, et al. "The faiss library."
          arXiv preprint arXiv:2401.08281 (2024). <br></br>[10] Wikipedia,
          https://www.wikipedia.org/ <br></br>[11] 감염병 포털,
          https://dportal.kdca.go.kr/pot/index.do <br></br>[12] 질병관리청,
          https://www.kdca.go.kr/ <br></br>[13] AI Hub, https://www.aihub.or.kr/{' '}
          <br></br>[14] Zheng, Lianmin, et al. "Judging llm-as-a-judge with
          mt-bench and chatbot arena." Advances in Neural Information Processing
          Systems 36 (2023): 46595-46623.
        </p>
      </div>
    </div>
  )
}

export default CovidStatsPage
