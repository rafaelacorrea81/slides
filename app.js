const { useState, useEffect, useCallback } = React;

// Inline SVG Icon Components (Lucide replacements)
const ChevronLeft = ({ size = 24, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const ChevronRight = ({ size = 24, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const Presentation = ({ size = 24, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 3h16" />
    <path d="M4 7h16" />
    <path d="M8 21v-4" />
    <path d="M12 21v-4" />
    <path d="M16 21v-4" />
    <path d="M2 17h20" />
    <path d="M12 7v10" />
  </svg>
);

const Lightbulb = ({ size = 24, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1 .3 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
    <path d="M9 18h6" />
    <path d="M10 22h4" />
  </svg>
);

const RotateCcw = ({ size = 24, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <polyline points="3 3 3 8 8 8" />
  </svg>
);

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? prev : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? prev : prev - 1));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        nextSlide();
      } else if (event.key === 'ArrowLeft') {
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const SlideLayout = ({ title, tip, children }) => (
    <div className="flex flex-col h-full w-full px-12 py-8 bg-white text-slate-800 relative">
      {/* Header Logos */}
      <div className="absolute top-6 right-12 flex items-center space-x-6">
        <img src="logo-ifes.png" alt="Logo IFES" className="h-10 w-auto object-contain" />
        <img src="logo-profept.png" alt="Logo ProfEPT" className="h-10 w-auto object-contain" />
      </div>
      {title && (
        <div className="mb-8 border-b-2 border-green-600 pb-4 pr-56">
          <h2 className="text-4xl font-bold text-slate-900">{title}</h2>
        </div>
      )}
      <div className="flex-grow flex flex-col text-xl leading-relaxed justify-center">
        {children}
      </div>
      {tip && (
        <div className="mt-6 flex items-start bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <Lightbulb className="w-6 h-6 text-yellow-600 mr-3 flex-shrink-0" />
          <p className="text-sm text-yellow-800 italic">
            <strong>Dica de Apresentação:</strong> {tip}
          </p>
        </div>
      )}
    </div>
  );

  const slides = [
    // Slide 1 - Capa
    <div className="flex flex-col items-center justify-between h-full py-8 px-12 bg-white text-center">
      <div className="flex justify-between items-center w-full mb-4">
        <img src="logo-ifes.png" alt="Logo IFES" className="h-14 w-auto object-contain" />
        <img src="logo-profept.png" alt="Logo ProfEPT" className="h-14 w-auto object-contain" />
      </div>
      <div className="flex-grow flex flex-col justify-center items-center space-y-4">
        <div className="inline-block bg-green-100 text-green-800 font-bold px-4 py-1 rounded-full uppercase tracking-widest text-xs">
          IX SEPT / Seminário de Educação Profissional e Tecnológica
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 leading-tight max-w-4xl">
          Ação Extensionista como Espaço Pedagógico Formal para Inclusão e Alfabetização Digital de Pessoas Idosas no Uso Seguro de Tecnologias Móveis na Educação Profissional e Tecnológica
        </h1>
        <div className="w-20 h-1 bg-green-600 rounded-full"></div>
        <div className="space-y-1 text-lg text-slate-700">
          <p><strong className="text-slate-900">Mestranda:</strong> Rafaela Corrêa</p>
          <p><strong className="text-slate-900">Orientadora:</strong> Profa. Dra. Maria José de Resende Ferreira</p>
        </div>
      </div>
      <div className="mt-4 text-sm text-slate-500 font-medium border-t w-full pt-4">
        Instituto Federal do Espírito Santo — Campus Vitória — ProfEPT
      </div>
    </div>,

    // Slide 2 - Introdução
    <SlideLayout title="Introdução" tip="Falar sobre a sua trajetória em TI">
      <ul className="space-y-6 list-disc list-inside marker:text-green-600">
        <li><strong>EPT e Espaços Não Formais:</strong> Extensão como elo entre instituição e comunidade.</li>
        <li><strong>Lócus:</strong> CEET Vasco Coutinho (Vila Velha/ES).</li>
        <li><strong>Público:</strong> Pessoas idosas (60+).</li>
        <li><strong>Foco:</strong> Inclusão, alfabetização digital e uso seguro de dispositivos móveis.</li>
        <li><strong>Perspetiva:</strong> Além do acesso técnico; foco na mediação pedagógica intencional.</li>
      </ul>
    </SlideLayout>,

    // Slide 3 - Problema de Pesquisa
    <SlideLayout title="Problema de Pesquisa" tip="Ler de forma pausada e clara">
      <div className="flex items-center justify-center h-full">
        <blockquote className="text-3xl font-medium text-slate-800 italic text-center border-l-4 border-green-500 pl-8 py-4 bg-slate-50 rounded-r-lg shadow-sm">
          "De que maneira a ação extensionista, compreendida como espaço pedagógico formal da EPT, voltada à inclusão e à alfabetização digital de pessoas idosas, pode contribuir para sua autonomia digital, participação social e formação humana?"
        </blockquote>
      </div>
    </SlideLayout>,

    // Slide 4 - Objetivos
    <SlideLayout title="Objetivos (Geral e Específicos)">
      <div className="grid grid-cols-2 gap-8 h-full items-center">
        <div className="bg-green-50 p-6 rounded-xl border border-green-200">
          <h3 className="text-2xl font-bold text-green-800 mb-4">Geral</h3>
          <p className="text-slate-700">
            Analisar as contribuições da ação extensionista na inclusão e alfabetização digital segura de pessoas idosas, e propor um produto educacional para apoiar docentes e extensionistas nesse processo.
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-slate-800">Específicos</h3>
          <ul className="space-y-2 list-decimal list-inside text-lg text-slate-700">
            <li>Mapear as principais necessidades e barreiras de segurança e usabilidade de pessoas idosas.</li>
            <li>Desenvolver, aplicar e avaliar uma oficina de extensão focada no uso seguro de dispositivos móveis.</li>
            <li>Sistematizar a experiência prática na forma de um Guia Pedagógico de Oficinas.</li>
          </ul>
        </div>
      </div>
    </SlideLayout>,

    // Slide 5 - Referencial Teórico
    <SlideLayout title="Referencial Teórico">
      <div className="grid grid-cols-3 gap-6 text-center">
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col justify-between">
          <div className="text-green-600 font-bold text-lg mb-2">Educação Profissional e Tecnológica (EPT)</div>
          <p className="text-slate-600 text-sm flex-grow">Concepção de formação humana integral e omnilateralidade (Ramos, 2014; Ciavatta, 2014).</p>
        </div>
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col justify-between">
          <div className="text-green-600 font-bold text-lg mb-2">Extensão Dialógica</div>
          <p className="text-slate-600 text-sm flex-grow">A comunicação e a dialogicidade na extensão como processo de troca recíproca de saberes (Freire, 1985).</p>
        </div>
        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 flex flex-col justify-between">
          <div className="text-green-600 font-bold text-lg mb-2">Gerontotecnologia e Inclusão Digital</div>
          <p className="text-slate-600 text-sm flex-grow">Barreiras de usabilidade, letramento digital crítico e cidadania na velhice (Borges et al., 2025).</p>
        </div>
      </div>
    </SlideLayout>,

    // Slide 6 - Metodologia
    <SlideLayout title="Metodologia">
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="border-l-4 border-green-600 pl-4">
            <h3 className="font-bold text-xl text-slate-800">Abordagem e Natureza</h3>
            <p className="text-slate-600 text-base">Qualitativa, do tipo Pesquisa-Ação. Alinha-se à natureza aplicada exigida no ProfEPT.</p>
          </div>
          <div className="border-l-4 border-green-600 pl-4">
            <h3 className="font-bold text-xl text-slate-800">Lócus e Sujeitos</h3>
            <p className="text-slate-600 text-base">Vasco Coutinho (Vila Velha/ES). Cerca de 15 idosos (60+) participantes da comunidade.</p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="border-l-4 border-green-600 pl-4">
            <h3 className="font-bold text-xl text-slate-800">Instrumentos de Coleta</h3>
            <p className="text-slate-600 text-base">Questionários (perfil), observação participante, diário de campo e depoimentos em rodas de conversa.</p>
          </div>
          <div className="border-l-4 border-green-600 pl-4">
            <h3 className="font-bold text-xl text-slate-800">Aspectos Éticos</h3>
            <p className="text-slate-600 text-base">Submissão ao CEP/Conep, assinatura de TCLE por todos os idosos participantes.</p>
          </div>
        </div>
      </div>
    </SlideLayout>,

    // Slide 7 - Método da Pesquisa-Ação
    <SlideLayout title="Método: Ciclos da Pesquisa-Ação">
      <div className="flex space-x-6 items-stretch justify-between h-full">
        <div className="flex-1 bg-green-50 p-6 rounded-xl border border-green-200">
          <h3 className="text-xl font-bold text-green-800 mb-3">Ciclo 1: Diagnóstico e Planeamento</h3>
          <ul className="space-y-2 text-slate-700 text-base">
            <li>Mapeamento inicial de demandas e receios dos idosos por meio de questionário pré-intervenção.</li>
            <li>Desenho pedagógico do roteiro de oficinas.</li>
          </ul>
        </div>
        <div className="flex-1 bg-slate-50 p-6 rounded-xl border border-slate-200">
          <h3 className="text-xl font-bold text-slate-800 mb-3">Ciclo 2: Ação, Avaliação e Reflexão</h3>
          <ul className="space-y-2 text-slate-600 text-base">
            <li>Execução das oficinas mediadas.</li>
            <li><strong>Fase 2 (Qualitativa):</strong> Entrevistas, rodas de conversa, observação, diário de campo, fotografia/vídeo.</li>
            <li><strong>Análise:</strong> Qualitativa de conteúdo (categorias temáticas); falas anonimizadas.</li>
          </ul>
        </div>
      </div>
    </SlideLayout>,

    // Slide 8 - Etapas da Pesquisa
    <SlideLayout title="Etapas da Pesquisa">
      <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-lg items-center">
        {[
          "Revisão de literatura e dados oficiais.",
          "Levantamento de produtos educacionais correlatos.",
          "Planeamento da ação extensionista.",
          "Elaboração dos instrumentos de recolha.",
          "Seleção e convite aos participantes.",
          "Realização da ação prática.",
          "Recolha de dados em campo.",
          "Organização e análise dos dados.",
          "Sistematização do Produto Educacional.",
          "Redação final (Dissertação e Produto)."
        ].map((etapa, index) => (
          <div key={index} className="flex items-center space-x-3 bg-slate-50 p-3 rounded-lg border border-slate-100">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-600 text-white font-bold text-sm flex-shrink-0">
              {index + 1}
            </span>
            <span className="text-slate-700">{etapa}</span>
          </div>
        ))}
      </div>
    </SlideLayout>,

    // Slide 9 - Produto Educacional
    <SlideLayout title="Produto Educacional">
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-green-50 border-l-4 border-green-600 p-5 rounded-r-lg">
            <h3 className="text-xl font-bold text-slate-800 mb-2">O Produto</h3>
            <ul className="space-y-2 text-lg text-slate-700">
              <li><strong>Tipo:</strong> Guia/Caderno Pedagógico de Oficinas.</li>
              <li><strong>Público-alvo:</strong> Pessoas idosas e instituições de EPT.</li>
              <li><strong>Finalidade:</strong> Orientar oficinas para o uso seguro de tecnologias móveis.</li>
              <li><strong>Disponibilização:</strong> Depósito no eduCAPES.</li>
            </ul>
          </div>
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-slate-800 mb-4">Eixos Norteadores</h3>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <strong className="text-green-700 block mb-1">Conceitual:</strong>
            <span className="text-slate-600 text-base">Formação humana integral e extensão dialógica.</span>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <strong className="text-green-700 block mb-1">Comunicacional:</strong>
            <span className="text-slate-600 text-base">Linguagem simples, acessível e dialógica.</span>
          </div>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <strong className="text-green-700 block mb-1">Pedagógico:</strong>
            <span className="text-slate-600 text-base">Foco em demandas, barreiras, segurança e autonomia.</span>
          </div>
        </div>
      </div>
    </SlideLayout>,

    // Slide 10 - Referências
    <SlideLayout title="Referências Bibliográficas">
      <ul className="space-y-4 text-base text-slate-600 list-disc list-inside marker:text-slate-400">
        <li>BORGES, F. L. R. <em>et al</em>. Elaboração de uma cartilha... Revista Contemporânea, 2025.</li>
        <li>CIAVATTA, M. A historicidade das reformas... Cadernos de Pesquisa, 2014.</li>
        <li>FREIRE, P. <em>Extensão ou comunicação?</em> Paz e Terra, 1985.</li>
        <li>GIL, A. C. <em>Como elaborar projetos de pesquisa</em>. Atlas, 2026.</li>
        <li>RAMOS, M. N. <em>História e política da educação profissional</em>. IFPR, 2014.</li>
        <li>SILVA, J. A. (Vieira Pinto <em>apud</em>...).</li>
        <li>SOUZA; COSTA; EPAMINONDAS, 2019; FLAUZINO <em>et al</em>., 2020; IRIGARAY; GONZATTI, 2020.</li>
      </ul>
      <div className="mt-8 text-center text-green-700 font-bold text-2xl">
        Obrigada!
      </div>
    </SlideLayout>
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4 md:p-8 font-sans selection:bg-green-200">
      
      {/* Header com Instruções */}
      <div className="w-full max-w-5xl flex justify-between items-center mb-4 text-slate-500 text-sm">
        <div className="flex items-center space-x-2">
          <Presentation size={18} className="w-[18px] h-[18px]" />
          <span>Slides</span>
        </div>
        <div>Use as setas (← / →) do teclado para navegar</div>
      </div>

      {/* Slide Container (16:9 Aspect Ratio) */}
      <div className="w-full max-w-5xl aspect-video bg-white rounded-xl shadow-2xl overflow-hidden relative transition-all duration-300 ring-1 ring-slate-900/5">
        {slides.map((slide, index) => (
          <div key={index} className={index === currentSlide ? "block h-full" : "hidden"}>
            {slide}
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="w-full max-w-5xl flex items-center justify-between mt-6 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
        <div className="flex items-center space-x-2">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          >
            <ChevronLeft size={20} className="w-5 h-5" />
            <span>Anterior</span>
          </button>

          <button
            onClick={() => setCurrentSlide(0)}
            disabled={currentSlide === 0}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200"
            title="Voltar para o primeiro slide (Capa)"
          >
            <RotateCcw size={18} className="w-[18px] h-[18px]" />
            <span>Início</span>
          </button>
        </div>

        <div className="text-slate-500 font-medium">
          Slide {currentSlide + 1} de {slides.length}
        </div>

        <button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed bg-green-600 text-white hover:bg-green-700 shadow-sm"
        >
          <span>Próximo</span>
          <ChevronRight size={20} className="w-5 h-5" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-5xl h-1 bg-slate-200 rounded-full mt-4 overflow-hidden">
        <div 
          className="h-full bg-green-500 transition-all duration-300 ease-out"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>

      {/* Seção de Comentários (Existem todos no DOM, mas apenas o atual fica visível para o comments.js vincular) */}
      <div className="w-full max-w-5xl mt-6">
        {slides.map((_, index) => {
          const slideId = `slide-${String(index + 1).padStart(2, '0')}`;
          return (
            <div key={slideId} className={index === currentSlide ? "block" : "hidden"}>
              <div className="comentarios-slide bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Comentários sobre este slide ({slideId})
                </h3>

                <form className="comment-form space-y-4" data-slide-id={slideId}>
                  <div className="flex flex-col">
                    <label className="text-sm font-semibold text-slate-700 mb-1">Comentário:</label>
                    <textarea name="comentario" required placeholder="Escreva seu comentário sobre este slide" className="px-4 py-2 border border-slate-300 rounded-lg text-base focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-colors resize-y" rows="3"></textarea>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <button type="submit" className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Enviar comentário</button>
                    <p className="form-message text-sm font-medium mt-2"></p>
                  </div>
                </form>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
